# Achintya Srivastava — Portfolio

Personal portfolio built with React 19 and Vite. Published to GitHub Pages at
[custom domain](https://achinty.me) from the `Tech-Achintya.github.io` repository.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deployment

Deployment is automated by `.github/workflows/deploy.yml`:

1. Push to `main` (or run the workflow manually).
2. GitHub Actions installs dependencies with `npm ci`, builds with `npm run build`,
   and publishes the generated `dist/` directory with the official GitHub Pages
   actions.

Vite copies `public/CNAME` into `dist/CNAME` during the build, so the custom
domain is part of every deployed artifact.

### One-time repository setup

In **Settings → Pages → Build and deployment**, set **Source** to
**GitHub Actions**. The custom domain is `achinty.me` (see `CNAME`).

The site is a single-page app with in-page anchors only; it does not use
client-side routing, so no `404.html` fallback is required.
