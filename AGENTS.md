# AGENTS.md

## Cursor Cloud specific instructions

### Product
Single-product repository: a **Next.js 15 (App Router) + TypeScript** personal portfolio website (Samuel Phan), styled with the EE Portfolio Design System (`app/styles/tokens.css`, `app/styles/bundle.css`, components in `components/ee/`). No Tailwind. Content is data-driven from files under `data/`. Deployed on Vercel (not a static export): `/projects` and `/about` render per request, and `/api/contact` is a route handler.

### Services
There is only one service: the Next.js web app.

| Task | Command | Notes |
|------|---------|-------|
| Dev server | `npm run dev` | http://localhost:3000 |
| Lint | `npm run lint` | See caveat below |
| Build | `npm run build` | Production build in `.next/` |
| Type-check | `npm run type-check` | `tsc --noEmit` |
| Serve prod build | `npm run start` | After `build` |

Dependencies are installed with `npm install` (npm lockfile present). Requires Node 18+ (Node 22 works).

### Non-obvious caveats
- Owner rules: never render an email address or phone number in the site's pages (including meta tags and `mailto:`); the CV PDF behind the download buttons may contain them. No blue, no serif, no skill ratings, no ™. Contact goes through the form plus GitHub/LinkedIn.
- The contact form posts to `app/api/contact/route.ts`, which sends through Resend. It needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`; without them it returns 503 and the form shows an honest "not connected" error.
- Don't export plain values (constants, strings) from a `"use client"` module for use in server components; they arrive as client references. Shared values live in `lib/`.
- Locally the Vercel Analytics script 404s (`/_vercel/insights/script.js`); that's expected off Vercel.
