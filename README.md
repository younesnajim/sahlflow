# Sahl Flow — marketing site

Next.js 15 (App Router) · TypeScript · Tailwind v4 (CSS-first, no config file).

## Routes

| Route  | Notes                                              |
| ------ | -------------------------------------------------- |
| `/`    | 307 redirect to `/ar`                              |
| `/ar`  | Arabic, RTL, primary. Its own page and own copy.   |
| `/en`  | English, LTR. Its own page and own copy.           |
| `/api/demo` | Live demo endpoint — **currently a stub**.    |

`/ar` and `/en` are separate root layouts (route groups `(ar)` and `(en)`), so each
owns its `<html lang>` and `dir`. They are two pages, not one page with a toggle.
`hreflang` tags link the pair, with `x-default` pointing at `/ar`.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## Environment

| Variable              | Required | Purpose                                       |
| --------------------- | -------- | --------------------------------------------- |
| `OPENAI_API_KEY`      | yes\*    | Live demo widget. \*Not read by the stub yet. |
| `NEXT_PUBLIC_SITE_URL`| no       | Absolute origin for hreflang/OG. Defaults to `https://sahlflow.com`. |

Copy `.env.example` to `.env.local` to work locally.

## Deployment (EasyPanel)

The `Dockerfile` builds a standalone Next.js server. Point EasyPanel at the repo,
use the Dockerfile builder, expose port `3000`, and set `OPENAI_API_KEY` and
`NEXT_PUBLIC_SITE_URL` in the service environment.

## Things a person still owns

- **`src/lib/prompts.ts`** — both demo system prompts are placeholders.
- **`src/lib/meta-rates.ts`** — every rate figure is an unverified placeholder;
  check each against Meta's official pricing page. Each row carries `verified: false`.
- **`src/app/api/demo/route.ts`** — returns canned replies. Session handling and
  the rate limits around it are final; only reply generation is fake.
- **Video** — `VideoBlock` renders a 16:9 placeholder awaiting the real file.

## Where things live

```
src/
  app/
    (ar)/            Arabic root layout + /ar + the / redirect
    (en)/            English root layout + /en
    api/demo/        Demo endpoint (stub)
    globals.css      Brand tokens, type scale, self-hosted Tajawal
  components/        Logo, Nav, sections, DemoWidget, UI primitives
  content/           ar.ts / en.ts — all copy, one file per locale
  lib/               whatsapp, meta-rates, prompts, demo-limits, format, site
scripts/             Dev-only CDP helpers (screenshots, demo lifecycle tests)
```

### Conventions

- **No hardcoded hex in components.** Colour lives in `@theme` in `globals.css`.
  The one exception is `BRAND_PRIMARY_HEX` in `src/lib/site.ts`, because
  `themeColor` metadata cannot read CSS custom properties.
- **Logical properties only** — `ps/pe`, `ms/me`, `border-s/border-e`,
  `text-start/text-end`. No `left`/`right`.
- **Type scale** — body never below 15px, secondary labels 13px. Use the
  `text-body` / `text-label` / `text-h1…h3` utilities rather than raw sizes.

### Verification helpers

```bash
# Chrome with remote debugging on 9222, then:
node scripts/screenshot.cjs http://localhost:3000/ar 390 out.png
node scripts/demo-test.cjs  http://localhost:3000/ar 1280 ./shots
node scripts/demo-error-test.cjs http://localhost:3000/ar reject
```

These force an exact viewport through CDP — a plain `chrome --screenshot` cannot
render below Windows' minimum window width and will silently crop an RTL page.
