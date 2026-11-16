# React Static Framework Template

A minimal React + Vite foundation based on the supplied RE Design project. It retains the framework layer: central page registry, React Router, browser/SSR entry points, route SEO, static prerendering, sitemap/robots generation, and optional RE-Codebase runtime integration. It intentionally contains no site components or brand system.

## Requirements

- Node.js 22.23.4 (or a compatible Node 22 LTS release)
- npm

## Local setup

```bash
npm ci
npm run dev
```

Build and inspect the static output:

```bash
SITE_URL=https://www.example.com npm run build
npm run preview
```

The build type-checks, builds the browser bundle, builds the server renderer, and prerenders every route in `src/pages/pageRegistry.tsx` into `dist/`. Cloudflare Pages publishes `dist/` only. `dist-server/` is an intermediate build artifact.

## Add a page

1. Create a React page component under `src/pages/`.
2. Import it in `src/pages/pageRegistry.tsx`.
3. Add a registry entry with `path`, `component`, `label`, and `seo.title` / `seo.description`.
4. Set `seo.noIndex: true` for pages that should not be indexed or included in the sitemap.

The page registry is the single source of truth for client routing, prerender paths and SEO metadata. The wildcard route renders the shared 404 component; the build also creates a root-level `404.html` for Cloudflare Pages.

## External runtime

`src/framework/modules/runtime/runtime-loader.ts` imports the RE-Codebase entry at `https://re-codebase.pages.dev/entry.js`. Keep that URL pointed at the deployed bootstrap. The app checks for both `window.__RE_TRANSITIONS__` and `window.__CONFIG__`. If either is missing or the import fails, the framework falls back to ordinary React Router rendering; the site remains usable without the external animation/transition runtime.

The optional `barbaReact.tsx` bridge exposes `window.__REACT_BARBA__.mount()` and `.unmount()` for an external Barba lifecycle. It is not automatically registered because the external runtime should own when that bridge is enabled.

## SEO and canonical URL

Edit SEO metadata in the page registry. Set `SITE_URL` to the final public origin (scheme + host, no trailing slash), e.g. `https://www.example.com`. With `SITE_URL` set, prerendering emits canonical and Open Graph URLs, `sitemap.xml`, and `robots.txt`. Do not use the temporary `pages.dev` hostname as canonical if a custom domain will be the public site.

For local builds without `SITE_URL`, route HTML and metadata are still prerendered, but absolute canonical URLs and the sitemap/robots files are skipped.

## Cloudflare Pages

See [`SETUP.md`](./SETUP.md) for the complete GitHub and Cloudflare Pages setup, including the exact build settings and environment variables.
