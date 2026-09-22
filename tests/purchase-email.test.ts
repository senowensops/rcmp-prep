import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import Stripe from "stripe";
import { NextRequest } from "next/server";
import { POST } from "../app/api/webhooks/stripe/route";
import { sendConfirmationEmail } from "../lib/server/purchaseEmail";

const originalEnv = { ...process.env };
const webhookSecret = "whsec_test_only";
const stripe = new Stripe("sk_test_placeholder");
beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";
  process.env.STRIPE_WEBHOOK_SECRET = webhookSecret;
  process.env.RESEND_API_KEY = "test-email-key";
  mock.method(console, "error", () => {});
  mock.method(console, "log", () => {});
  mock.method(console, "warn", () => {});
});
afterEach(() => {
  mock.restoreAll();
  for (const key of ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RESEND_API_KEY"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function payload(type = "checkout.session.completed") {
  return JSON.stringify({ id: "evt_test", object: "event", type, data: { object: {
    id: "cs_test", customer_email: "buyer@example.test", customer_details: { name: "Buyer" },
    metadata: { product: "rcmp-prep-full-access", plan: "full" }, payment_status: "paid",
  } } });
}
function request(body: string, signature: string) {
  return new NextRequest("http://localhost/api/webhooks/stripe", {
    method: "POST", headers: { "stripe-signature": signature }, body,
  });
}
function sign(body: string) {
  return stripe.webhooks.generateTestHeaderString({ payload: body, secret: webhookSecret });
}

test("rejects unsigned and tampered webhooks without sending email or writing purchases", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  const body = payload();
  assert.equal((await POST(request(body, ""))).status, 400);
  assert.equal((await POST(request(body.replace("Buyer", "Attacker"), sign(body)))).status, 400);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("a signed purchase still stores access and sends confirmation directly through Resend", async () => {
  const destinations: string[] = [];
  mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    destinations.push(url);
    assert.equal(init?.method, "POST");
    const data = JSON.parse(String(init?.body));
    if (url === "https://api.resend.com/emails") {
      assert.deepEqual(data.to, ["buyer@example.test"]);
      assert.match(data.subject, /Full Access/);
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-email-key");
      return Response.json({ id: "email_test" });
    }
    assert.equal(new URL(url).pathname, "/rest/v1/purchases");
    assert.equal(data.stripe_session_id, "cs_test");
    return new Response(null, { status: 201 });
  });
  const body = payload();
  assert.equal((await POST(request(body, sign(body)))).status, 200);
  assert.equal(destinations.length, 2);
  assert.ok(destinations.every(url => !url.includes("/api/send-confirmation")));
});

test("unrelated signed events have no fulfillment side effects", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  const body = payload("customer.created");
  assert.equal((await POST(request(body, sign(body)))).status, 200);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("escapes customer-controlled HTML in purchase emails", async () => {
  mock.method(globalThis, "fetch", async (_input: string | URL | Request, init?: RequestInit) => {
    const data = JSON.parse(String(init?.body));
    assert.ok(data.html.includes("&lt;img&gt;"));
    assert.ok(!data.html.includes("<img>"));
    assert.ok(data.html.includes("a&amp;b@example.test"));
    assert.ok(data.html.includes("&lt;svg&gt;"));
    return Response.json({ id: "email_test" });
  });
  await sendConfirmationEmail("a&b@example.test", "<img>", "section", "<svg>");
});

test("missing email configuration does not call the provider", async () => {
  delete process.env.RESEND_API_KEY;
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  assert.deepEqual(await sendConfirmationEmail("buyer@example.test", "Buyer", "full", ""), { skipped: true });
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("provider errors surface to the webhook caller without provider response details", async () => {
  mock.method(globalThis, "fetch", async () => new Response("private-provider-detail", { status: 503 }));
  await assert.rejects(sendConfirmationEmail("buyer@example.test", "Buyer", "full", ""), { message: "Purchase email failed: 503" });
});
