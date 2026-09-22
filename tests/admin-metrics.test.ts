import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import { GET } from "../app/api/admin/test-metrics/route";

const originalEnv = { ...process.env };
beforeEach(() => {
  process.env.ADMIN_API_KEY = "test-admin-token";
  process.env.SUPABASE_URL = "https://database.example.test";
  process.env.SUPABASE_SERVICE_KEY = "test-service-key";
});
afterEach(() => {
  mock.restoreAll();
  for (const key of ["ADMIN_API_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_KEY"]) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function request(authorization?: string, query = "") {
  return new Request(`http://localhost/api/admin/test-metrics${query}`, {
    headers: authorization ? { authorization } : {},
  });
}

for (const authorization of [undefined, "Bearer incorrect", "Basic test-admin-token", "Bearer test-admin-token extra"]) {
  test(`denies ${authorization ?? "missing credentials"} before querying Supabase`, async () => {
    const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
    const response = await GET(request(authorization));
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(fetchMock.mock.callCount(), 0);
  });
}

test("does not accept tokens in the query string", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  assert.equal((await GET(request(undefined, "?token=test-admin-token"))).status, 401);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("fails closed when the admin token is not configured", async () => {
  delete process.env.ADMIN_API_KEY;
  const fetchMock = mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network call"); });
  assert.equal((await GET(request("Bearer test-admin-token"))).status, 503);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("returns metrics only with a valid bearer token", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) => {
    assert.equal(new URL(String(input)).hostname, "database.example.test");
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer test-service-key");
    return Response.json([{ id: "attempt-1", test_id: "1", started_at: "2026-09-01T12:00:00Z", completed_at: "2026-09-01T12:10:00Z", score_percent: 80, answered_questions: 10, skipped_count: 0, duration_seconds: 600 }]);
  });
  const response = await GET(request("Bearer test-admin-token"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal((await response.json()).summary.completed, 1);
  assert.equal(fetchMock.mock.callCount(), 1);
});

test("does not expose provider errors in the response", async () => {
  mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => { throw new Error("private-provider-detail"); });
  const response = await GET(request("Bearer test-admin-token"));
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "Unable to load metrics" });
});
