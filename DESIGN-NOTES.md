# Design notes

Reference record for the Stereo 1 Production site: palette, type, structure and
assets. Everything below matches `src/app/globals.css` and the standalone
`docs/index.html`.

## Concept

Chrome and electric blue on charcoal, taken from the logo artwork: metallic
"STEREO 1" lettering, a blue S swirl with sound-wave bars, and a carbon checker
backdrop. The site keeps that material language: dark surfaces, a single blue
accent, chrome wordmark moments, and photos graded to sit in the same light.

## Palette

Values are authored as hex/rgba in `src/app/globals.css`, taken from the brand
reference file; the hex values below are the source of truth.

| Token | Value | Use |
|---|---|---|
| `--background` | `#060b16` | page base (deep navy) |
| `--card` | `#0b1220` | cards, panels |
| `--secondary` | `#131d31` | subtle fills |
| `--foreground` | `#e7edf7` | body text |
| `--muted-foreground` | `#94a3b8` | secondary text |
| `--brand` | `#38bdf8` | accent text, icons, EQ tips |
| `--brand-strong` / `--primary` | `#2563eb` | buttons, deep accents |
| `--brand-soft` | `#7dd3fc` | highlights |
| accent gradient | `100deg, #2563eb → #38bdf8` | headline words, buttons, underline, EQ |
| photo grade | `#1d4ed8` at 30%, `mix-blend-mode: color` | unifies imagery |

A fixed body overlay carries the brand atmosphere: three radial glows (royal
blue 16% top-right, sky 7% left, blue 10% bottom) over the navy base.

Logo gradient stops used in the mark/favicon: `#c9ecff` → `#4da6e0` → `#1b5f9e`.
Chrome gradient for the wordmark: `#f8fafc` → `#dbe3ea` → `#9aa7b4` → `#f1f5f9`
→ `#7e8b98`.

Buttons end their gradient on `#1d4ed8` rather than sky so white labels keep AA
contrast; the sky end of the gradient is reserved for text, icons and glows.

## Typography

- Display: **Archivo** variable (500–900), tight tracking, used for headings,
  buttons and numbers.
- Body: **Inter** variable (100–900).
- Both are self-hosted: `next/font` for the app, base64-embedded woff2 in the
  single-file build.

## Structure

1. Hero: stage backdrop (blue-graded), cursor spotlight, interactive equalizer,
   event-type strip.
2. Services: six expandable cards with an "add to quote" action.
3. Events: selector with a recommended-setup panel per event type.
4. Gallery: six-tile bento of the rig, illustrative imagery note.
5. How it works: three-step stepper.
6. Why Stereo 1: three reasons.
7. FAQ: six grounded questions.
8. Contact: live summary + three-step quote wizard (event, gear, details) that
   hands off to WhatsApp.
9. Chrome: scroll progress, scrollspy nav, back to top, WhatsApp FAB.

## Assets

- `public/images/logo.png` — official artwork with the checkerboard removed,
  640x174, used in header, mobile menu and footer.
- `public/images/logo-lockup.png` — untrimmed master of the same artwork.
- `public/favicon.svg`, `public/logo.svg` — blue wave-bar marks on a chrome plate.
- `public/images/gallery-*.jpg`, `hero-stage-3e10.jpg` — AI-generated stage
  photography, 2848x1600, graded on the page with `mix-blend-mode: color` at 30%.

## Interaction and accessibility

- Motion respects `prefers-reduced-motion` (equalizer, spotlight, pulses, reveal).
- All controls are buttons/links with visible focus, labels and pressed states.
- Quote wizard validates per field, keeps the summary in sync across sections and
  composes the WhatsApp message from the same state.
- Layout checked at 1440, 900 and 390 px: no horizontal overflow, touch targets
  at 40 px or more.
