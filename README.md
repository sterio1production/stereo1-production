# Stereo 1 Production — website

Marketing site for **Stereo 1 Production**: professional sound, stage lighting,
staging and live-stream audio for concerts, weddings, conferences and corporate
events in Kampala, Uganda.

Dark "stage" theme with chrome lettering on electric blue, built around the
supplied logo artwork.

## What's in here

| Path | What it is |
|---|---|
| `src/` | Next.js 16 app (App Router, React 19, Tailwind v4, shadcn/ui) |
| `docs/index.html` | The whole site as one self-contained HTML file (fonts + images inlined). GitHub Pages serves this folder. |
| `prisma/schema.prisma` | SQLite model for quote requests |

## Live site

GitHub Pages publishes this repository's `docs/` folder (Settings → Pages →
Deploy from a branch → `main` / `/docs`):

```
https://<your-user>.github.io/stereo1-production/
```

It is fully interactive (quote builder, WhatsApp handoff, gallery, FAQ) and
works from disk as well. Every push to `main` that touches `docs/` republishes
the site within a minute or two.

## Run the Next.js app

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev          # http://localhost:3000
```

Quote requests are stored in SQLite at `db/custom.db` and can be inspected with
`sqlite3 db/custom.db 'select * from QuoteRequest'`.

## Deploy the app (full stack)

The Next.js app needs a Node host because of `/api/quote` and Prisma. Vercel or
Netlify work without changes:

```bash
npm i -g vercel && vercel        # or connect the repo in the Vercel dashboard
```

GitHub Pages cannot run the API, which is why the static `docs/` build routes
quote submissions straight into WhatsApp.

## Design and content

- All copy (services, phones, location) comes from the client brief; no invented
  facts or testimonials.
- The palette, typography, structure and asset list are documented in
  [DESIGN-NOTES.md](DESIGN-NOTES.md).
- Photos in `public/images/` are AI-generated atmosphere shots, labelled as
  illustrative on the page. Replace them with real event photography when
  available; keep the same filenames and nothing else needs to change.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build (standalone output)
npm run lint     # eslint
npm run db:push  # create/update the SQLite schema
```
