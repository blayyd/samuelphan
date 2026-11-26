# samuel phan

Portfolio site for Samuel Phan, an electrical engineering student at UC Irvine. Live at [samuelphan.vercel.app](https://samuelphan.vercel.app).

The site uses the EE Portfolio Design System: a white "paper" page (with a dark "chassis" theme), 1px rules, uppercase ruled headlines and red LED segment readouts.

## Stack

- Next.js 15 (App Router), React, TypeScript
- Plain CSS: design tokens and component styles, no Tailwind
- Self-hosted fonts: Archivo, IBM Plex Mono, DSEG7 and DSEG14
- Vercel for hosting and Web Analytics; Resend for the contact form

## Running it

Requires Node 18 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript, no output |

## Pages

| Route | Content |
|---|---|
| `/` | Ruled hero, "about me" strip, photo and a short spec table |
| `/projects` | Project grid with a category filter; `?cat=robotics` links to one category |
| `/projects/[slug]` | Case study: stats, images, specs, feature list, next project |
| `/about` | Experience, education, skills and certificates tabs; `?tab=education` links to one tab |
| `/contact` | Contact form plus GitHub and LinkedIn |

The old `/experience`, `/education`, `/skills` and `/certificates` URLs redirect to the matching About tab (see `next.config.js`). The site also serves `sitemap.xml` and `robots.txt`.

## Editing content

All content lives in `data/`:

| File | Holds |
|---|---|
| `data/projects.ts` | Projects: title, category, dates, intro, feature points, LED stats, tags, images and links |
| `data/experience.ts` | Jobs and programs, with bullets and tags |
| `data/education.ts` | Schools, GPA and highlights |
| `data/skills.ts` | Skills as plain tags, grouped by category |
| `data/certificates.ts` | Certificates, linked to PDFs in `public/` |
| `data/site-config.ts` | Name, site URL, photo, CV path, GitHub and LinkedIn links |

Images and PDFs go in `public/`. The CV buttons download whatever `siteConfig.cv` points to (currently `/resume.pdf`); set it to `null` to hide them. `resume.tex` is the LaTeX source for `public/resume.pdf`.

If a project title is too long for the heading on its page, set `headingLines` in `data/projects.ts` to choose where it breaks.

## Code layout

```
app/                 routes, layout, metadata, sitemap and robots
app/api/contact/     contact form route handler
app/styles/          tokens.css, bundle.css (design system) and site.css (page layout)
components/ee/       design-system components (Button, LedDisplay, RuledHeading, Tabs, ...)
components/site/     site pieces (header, footer, grids, tabs, contact form, theme switch, toasts)
data/                content
lib/                 shared helpers and constants
public/              images, fonts, PDFs
```

Don't export plain values (strings, arrays) from a `"use client"` file for use in server components: they arrive as references, not values. Put shared values in `lib/`.

## Contact form

The form posts to `/api/contact`, which sends the message through [Resend](https://resend.com). It rejects submissions that fill a hidden honeypot field or arrive less than 3 seconds after the page loads, and it limits each visitor to 5 messages per 10 minutes. That limit is per server instance, so treat it as best effort.

Set these in Vercel under Settings → Environment Variables:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives messages; a comma-separated list works |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | Optional canonical origin; defaults to the Vercel production domain |

Without the first three, the form tells visitors it isn't connected and that nothing was sent. It only shows "Message sent" after Resend accepts the message.

## Site rules

- No email address or phone number anywhere in the pages, meta tags or links. Contact goes through the form, GitHub and LinkedIn. The downloadable CV may contain them.
- No skill ratings or proficiency bars.
- No blue, no serif type, no ™.
- No project grid on the home page.

## Deploying

Vercel builds every push. Pull requests get a preview deployment, and merging to `main` deploys to production.

## Credits

Icons are a subset of [Lucide](https://lucide.dev) (ISC licence). Archivo, IBM Plex Mono and DSEG are under the SIL Open Font License.
