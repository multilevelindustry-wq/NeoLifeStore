// generate-sitemap.js
// Auto Sitemap Generator for neolifestore.com (GitHub Pages compatible)

import fs from "fs";
import fetch from "node-fetch";

const SITE_URL = "https://neolifestore.com";

// Optional JSON sources for your dynamic products or posts (if you have them)
const PRODUCT_FEED = `${SITE_URL}/products.json`;
const BLOG_FEED = `${SITE_URL}/blog.json`;

const today = new Date().toISOString().split("T")[0];

async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No data");
    return await res.json();
  } catch {
    return [];
  }
}

async function buildSitemap() {
  // Default site pages
  const baseUrls = [
    "/",
    "/women",
    "/men",
    "/supplements",
    "/accessories",
    "/about",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  // Fetch dynamic data
  const products = await getData(PRODUCT_FEED);
  const blogs = await getData(BLOG_FEED);

  // Build full URL list
  const productUrls = products.map((p) => `/product/${p.slug}`);
  const blogUrls = blogs.map((b) => `/blog/${b.slug}`);
  const allUrls = [...baseUrls, ...productUrls, ...blogUrls];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>${SITE_URL}${url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === "/" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("")}
  </urlset>`;

  fs.writeFileSync("sitemap.xml", sitemap);
  console.log("✅ Sitemap generated successfully");

  // Notify Google automatically
  try {
    await fetch(
      `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`
    );
    console.log("📢 Notified Google of sitemap update");
  } catch (e) {
    console.log("⚠️ Google ping failed:", e.message);
  }
}

buildSitemap();
