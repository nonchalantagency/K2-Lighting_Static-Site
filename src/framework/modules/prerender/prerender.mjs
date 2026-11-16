import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const distDir = path.join(projectDir, "dist");
const serverEntry = path.join(projectDir, "dist-server", "entry-server.js");
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const { render, getPageSeo, prerenderPaths } = await import(pathToFileURL(serverEntry).href);
const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function absoluteUrl(route) {
  if (!siteUrl) return "";
  return `${siteUrl}${route === "/" ? "/" : route}`;
}
function buildHead(seo, route) {
  const canonical = siteUrl && route !== "/__not-found__"
    ? `<link rel="canonical" href="${escapeHtml(absoluteUrl(route))}" />` : "";
  const ogUrl = siteUrl && route !== "/__not-found__"
    ? `<meta property="og:url" content="${escapeHtml(absoluteUrl(route))}" />` : "";
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    canonical,
    seo.noIndex ? '<meta name="robots" content="noindex,follow" />' : "",
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ogUrl,
  ].filter(Boolean).join("\n    ");
}
function renderDocument(route) {
  const root = `<div id="root">${render(route)}</div>`;
  const rootPattern = /<div id="root">\s*<\/div>/;
  if (!rootPattern.test(template)) throw new Error("Could not find empty #root in dist/index.html");
  return template.replace(rootPattern, root).replace(/<title>.*?<\/title>/s, buildHead(getPageSeo(route), route));
}

for (const route of prerenderPaths) {
  const html = renderDocument(route);
  const output = route === "/" ? path.join(distDir, "index.html") : path.join(distDir, route.slice(1), "index.html");
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html, "utf8");
  console.log(`[prerender] ${route} -> ${path.relative(projectDir, output)}`);
}
await writeFile(path.join(distDir, "404.html"), renderDocument("/__not-found__"), "utf8");
console.log("[prerender] /404 -> dist/404.html");

if (siteUrl) {
  const urls = prerenderPaths.filter((route) => !getPageSeo(route).noIndex)
    .map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route))}</loc></url>`).join("\n");
  await writeFile(path.join(distDir, "sitemap.xml"), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', urls, '</urlset>', ''
  ].join("\n"), "utf8");
  await writeFile(path.join(distDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, "utf8");
  console.log("[prerender] sitemap.xml and robots.txt generated");
} else {
  console.warn("[prerender] SITE_URL is unset; canonical URLs and sitemap.xml were skipped.");
}
