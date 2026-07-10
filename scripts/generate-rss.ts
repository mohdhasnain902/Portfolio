// Runs before `vite dev` and `vite build`; writes public/rss.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blogPosts";

// TODO: replace with your project URL once a custom domain is set.
const BASE_URL = "";
const SITE_TITLE = "Muhammad Ul Hasnain — Blog";
const SITE_DESCRIPTION =
  "Articles on cryptocurrency trading bots, AI automation, API development, web scraping, and modern full-stack development.";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const items = [...blogPosts]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .map(
    (p) => `  <item>
    <title>${escape(p.title)}</title>
    <link>${BASE_URL}/blog/${p.slug}</link>
    <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
    <category>${escape(p.category)}</category>
    <description>${escape(p.metaDescription || p.excerpt)}</description>
  </item>`,
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escape(SITE_TITLE)}</title>
  <link>${BASE_URL}/blog</link>
  <description>${escape(SITE_DESCRIPTION)}</description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

writeFileSync(resolve("public/rss.xml"), rss);
console.log(`rss.xml written (${blogPosts.length} items)`);
