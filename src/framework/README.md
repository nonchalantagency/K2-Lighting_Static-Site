# Framework layer

- `modules/routing/Router.tsx` — browser/static router composition and route mounting.
- `modules/seo/PageMetadata.tsx` — client-side metadata updates during client navigation.
- `modules/prerender/prerender.mjs` — server-rendered route HTML, 404, canonical/Open Graph metadata, sitemap and robots generation. `scripts/prerender.mjs` is the npm entry point.
- `modules/runtime/` — optional external RE-Codebase loader and Barba/React bridge. Runtime/transition implementation remains external.

`src/pages/pageRegistry.tsx` is deliberately outside the framework modules: it is the project-level registry that supplies route components and SEO data to these modules.
