// generate-sitemap.js
// 🔥 Smart Sitemap Generator for neolifestore.com (GitHub Pages compatible)
// Crawls your live website, builds a sitemap, and pings Google automatically.

import fs from "fs";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const SITE_URL = "https://neolifestore.com";
const today = new Date().toISOString().split("T")[0];

// 🧠 Pages to crawl for discovering more links
const START_PAGES = [
  "/",
  "/women",
  "/men",
  "/supplements",
  "/accessories",
  "/blog",
];

// Crawl settings
const MAX_DEPTH = 2; // crawl up to 2 levels deep
const visited = new Set();
const urls = new Set();

// Fetch and parse a page
async function crawlPage(path, depth = 0) {
  if (depth > MAX_DEPTH || visited.has(path)) return;
  visited.add(path);

  try {
    const res = await fetch(`${SITE_URL}${path}`);
    if (!res.ok) return;
    const html = await res.text();
    const $ = cheerio.load(html);

    urls.add(path);

    $("a[href]").each((_, el) => {
      let href = $(el).attr("href");
      if (!href) return;
      if (href.startsWith(SITE_URL)) href = href.replace(SITE_URL, "");
      if (
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.includes(".jpg") &&
        !href.includes(".png") &&
        !href.includes(".jpeg") &&
        !href.includes(".svg") &&
        !href.includes(".pdf")
      ) {
        urls.add(href.split("?")[0]);
        crawlPage(href, depth + 1);
      }
    });
  } catch (e) {
    console.log("❌ Error crawling:", path, e.message);
  }
}

async function generateSitemap() {
  console.log("🔍 Crawling site for links...");
  for (const start of START_PAGES) {
    await crawlPage(start);
  }

  const urlArray = Array.from(urls).sort();

  console.log(`✅ Found ${urlArray.length} pages.`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlArray
    .map(
      (path) => `
    <url>
      <loc>${SITE_URL}${path}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === "/" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("")}
  </urlset>`;

  fs.writeFileSync("sitemap.xml", xml);
  console.log("📄 Sitemap.xml created successfully!");

  // Ping Google
  try {
    await fetch(`https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`);
    console.log("📢 Google notified of sitemap update!");
  } catch (e) {
    console.log("⚠️ Could not ping Google:", e.message);
  }
}

generateSitemap();
    
