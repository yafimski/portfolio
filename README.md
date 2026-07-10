## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

To preview the production build locally:

```bash
npm run build
npm run preview
```

## Publish updates to GitHub Pages

The site is deployed with the [`gh-pages`](https://github.com/tschaub/gh-pages) package. Publishing builds the app and pushes the output to the `gh-pages` branch, which GitHub Pages serves.

1. Make and commit your changes on `main` (or your working branch).
2. From the project root, run:

```bash
npm run deploy
```

This runs `npm run build` automatically, then publishes the `dist` folder to `gh-pages`.

3. Wait a minute or two for GitHub Pages to rebuild, then hard-refresh the live site.

### GitHub Pages settings

In the repo on GitHub: **Settings → Pages → Build and deployment**, the source should be:

- **Branch:** `gh-pages`
- **Folder:** `/ (root)

If those settings change, `npm run deploy` may still push files, but the site will not update correctly.

### Notes

- The production base path is `/` (custom domain via `public/CNAME`). Asset URLs use `src/shared/config.ts` (`assetBaseUrl`).
- `npm run deploy` requires push access to this repository and will update the remote `gh-pages` branch directly.
