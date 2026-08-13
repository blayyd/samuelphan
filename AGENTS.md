# AGENTS.md

## Cursor Cloud specific instructions

### Product
Single-product repository: a static **Next.js 15 (App Router) + TypeScript** personal portfolio website (Samuel Phan). Content is data-driven from files under `data/`. There is no backend, database, or environment variables — it is a fully client-rendered/static-export site (`output: 'export'` in `next.config.js`).

### Services
There is only one service: the Next.js web app.

| Task | Command | Notes |
|------|---------|-------|
| Dev server | `npm run dev` | http://localhost:3000 |
| Lint | `npm run lint` | See caveat below |
| Build | `npm run build` | Static export to `out/` |
| Serve prod build | `npm run start` | After `build` |

Dependencies are installed with `npm install` (npm lockfile present). Requires Node 18+ (Node 22 works).

### Non-obvious caveats
- `npm run lint` currently reports pre-existing `react/no-unescaped-entities` errors in `components/home/about-preview.tsx` and `components/home/hero-section.tsx`. These are unrelated to environment setup; the lint tooling itself works.
- `npm run dev` prints harmless `Invalid next.config.js options detected` warnings (deprecated `devIndicators`/`experimental` keys). The server still starts and serves normally.
- The README mentions `npm run type-check`, but no such script exists in `package.json` (only `dev`, `build`, `start`, `lint`).
- The Contact form (`app/contact/page.tsx`) has no backend — on submit it opens a `mailto:` link and clears the fields. In a headless/VM browser this triggers an OS "choose mail application" dialog rather than sending mail; that is expected behavior, not a bug.
