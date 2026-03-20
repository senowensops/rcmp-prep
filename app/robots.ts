export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/access", "/success", "/test/", "/results/"] },
    sitemap: "https://rcmpprep.ca/sitemap.xml",
  };
}
