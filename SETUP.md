# Setup guide — GitHub + Cloudflare Pages

This document takes a fresh copy of the template from your computer to a GitHub repository and connects that repository to Cloudflare Pages for automatic production and preview deployments.

## 1. Prepare the project locally

1. Download and extract the template ZIP.
2. Rename the extracted folder to the project name you want to use.
3. Open that folder in your code editor.
4. Install Node.js 22.23.4 or a compatible Node 22 LTS release. The repository includes `.nvmrc` so version managers can select the expected version.
5. Open a terminal at the project root (the folder containing `package.json`) and run:

   ```bash
   npm ci
   npm run dev
   ```

6. Open the local URL printed by Vite, normally `http://localhost:5173`.
7. Replace the example page content and SEO values in `src/pages/` and `src/pages/pageRegistry.tsx`.
8. Test the full production build before publishing:

   ```bash
   SITE_URL=https://www.example.com npm run build
   npm run preview
   ```

   Replace the example domain with the real domain you intend to use. If the domain is not configured yet, you can run `npm run build` without `SITE_URL`; the HTML pages will still prerender, but canonical URLs and sitemap/robots generation will be skipped.

## 2. Create the GitHub repository

1. Sign in to GitHub.
2. Use **New repository** (from the `+` menu or your repositories page).
3. Enter a repository name, for example `client-site-name`.
4. Choose **Private** or **Public** according to the project.
5. For this workflow, leave **Add a README**, `.gitignore`, and licence unchecked. The template already contains a README and `.gitignore`; starting with an empty repository avoids an unrelated first-commit merge.
6. Select **Create repository**. Keep the GitHub page open so you can copy the repository URL.

## 3. Push the local project to GitHub

In the terminal, make sure you are in the project root. Run:

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with the HTTPS URL shown on your new GitHub repository page. If Git asks you to authenticate, complete GitHub's browser/device authentication flow or use your configured Git credential manager. Do not put a personal access token directly into the remote URL.

After the push, refresh the GitHub repository page. You should see the project files and a `main` branch.

### Normal development workflow

For each change:

```bash
git add .
git commit -m "Describe the change"
git push
```

A push to `main` will trigger a production deployment once Cloudflare Pages is connected. A push to another branch normally creates a preview deployment, subject to the branch controls configured in Cloudflare.

## 4. Create the Cloudflare Pages project

1. Sign in to the Cloudflare dashboard and select the correct account.
2. Open **Workers & Pages**.
3. Select **Create application** (or **Create**) and choose **Pages**.
4. Choose **Connect to Git** / **Import an existing Git repository**.
5. If prompted, connect GitHub and authorise the Cloudflare Pages GitHub application. Grant it access to the repository you just created (or the relevant organisation repository).
6. Select the repository and choose **Begin setup**.

> Important: choose Git integration for this project. Cloudflare documents that a Git-integrated Pages project cannot later be switched to Direct Upload. If you need a Direct Upload workflow instead, create a separate project using that deployment method from the outset.

## 5. Enter the Cloudflare build settings

Use these values for this template:

| Cloudflare field | Value |
|---|---|
| Project name | Your chosen project name (this becomes the `*.pages.dev` hostname) |
| Production branch | `main` |
| Framework preset | `React (Vite)` if offered; otherwise `None` / no preset |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory (advanced) → Path | Leave blank when `package.json` is at the repository root |

The framework preset is only a preset for suggested defaults. The authoritative settings for this project are the build command and output directory above. The build includes the typecheck, client build, server-renderer build, and prerender steps. Cloudflare must publish `dist`, not `dist-server`.

If your project is inside a monorepo subfolder rather than at the repository root, set **Root directory (advanced) → Path** to that subfolder. Do not set it for this standalone template layout.

## 6. Add the build environment variables

Before deploying, add the following in the environment-variable section if available during setup, or immediately afterwards under the Pages project's **Settings → Environment variables** / build configuration:

| Variable | Value | Scope |
|---|---|---|
| `SITE_URL` | `https://www.yourdomain.com` | Production |
| `NODE_VERSION` | `22.23.4` | Production and Preview |

Replace `https://www.yourdomain.com` with the exact public origin you intend to use. Do not include a trailing slash. If the custom domain is not ready, you can omit `SITE_URL` for the first deploy and add it once the domain is active; without it, canonical URLs and sitemap/robots generation are intentionally skipped.

The project also includes `.nvmrc` with `22.23.4`. Cloudflare Pages' build image supports selecting Node via `NODE_VERSION` or `.nvmrc`; setting the dashboard variable makes the chosen version explicit in the Pages build configuration.

Add `SITE_URL` to the **Production** environment. For **Preview**, either leave it unset (prevents preview builds from advertising the production canonical URL) or set a separate staging origin if you deliberately want preview/staging pages to emit canonical metadata. Avoid setting the production domain as the canonical URL on temporary branch previews unless that is intentional.

No API token, Cloudflare account ID, zone ID, or secret is required for this Git-integrated Pages deployment. The GitHub authorisation is handled through the Cloudflare Git integration.

## 7. Deploy

1. Review the repository, production branch, build command, output directory and environment variables.
2. Select **Save and Deploy**.
3. Open the deployment to view the build log. The build should run `npm run build` and publish the `dist` directory.
4. When complete, open the generated `https://PROJECT-NAME.pages.dev` URL.
5. Test the homepage, `/about`, `/work`, and a deliberately unknown URL. The registered pages should load their prerendered HTML; the unknown URL should show the 404 document.

## 8. Add a custom domain (when ready)

1. Open the Pages project in Cloudflare.
2. Go to **Custom domains**.
3. Select **Set up a custom domain** and enter the domain or subdomain you want to use.
4. Follow Cloudflare's DNS instructions. For a domain already managed by Cloudflare, the dashboard can generally create the required record. For an external DNS provider, add the record Cloudflare specifies.
5. Wait for Cloudflare to verify and activate the domain and for DNS/TLS provisioning to complete.
6. Update the production `SITE_URL` environment variable to the final canonical origin, for example `https://www.example.com`.
7. Trigger a new production deployment (a new commit or **Retry deployment**) so the prerendered canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt` use the final domain.

Do not set the production canonical URL to the `pages.dev` hostname if the custom domain is intended to be the public website.

## 9. Verify SEO output

After the production deployment, check:

- `https://www.example.com/` — homepage HTML includes its title and description.
- `https://www.example.com/about` — route HTML includes the About title and description.
- `https://www.example.com/sitemap.xml` — lists all registry routes except those with `seo.noIndex: true`.
- `https://www.example.com/robots.txt` — allows crawling and points to the sitemap.
- View page source (not only the browser Elements panel) to confirm route content and metadata are present in the initial HTML response.

To exclude a page from indexing, set `noIndex: true` in its page registry SEO object. This adds `noindex,follow` to the prerendered page and excludes it from the generated sitemap.

## 10. How deployments work after setup

- Pushes to `main` create production deployments.
- Pushes to configured non-production branches create preview deployments.
- Pull requests can receive preview URLs and deployment status checks, depending on the repository integration and branch controls.
- Cloudflare Pages settings can be changed later under the project build/deployment settings. If you change the build command or output directory, keep them aligned with this template's build pipeline.

## Official references checked

- Cloudflare Pages — Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Cloudflare Pages — Build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Cloudflare Pages — Build image and Node version selection: https://developers.cloudflare.com/pages/configuration/build-image/
- Cloudflare Pages — GitHub integration: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Vite — Static deployment / Cloudflare Pages: https://vite.dev/guide/static-deploy

Cloudflare changes dashboard labels periodically. If the wording differs slightly, use the corresponding Pages Git integration and build configuration fields described in the official documentation above; the exact build values for this project remain `npm run build` and `dist`.
