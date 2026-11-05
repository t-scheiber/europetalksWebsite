---
name: EuropeTalks
description: Campaign-poster site for a grassroots network of European social-democratic activists.
colors:
  logo-blue: "#0B4493"
  deep-blue: "#08234F"
  night-band: "#071127"
  navy-ink: "#0A1939"
  blue-mist: "#CBDEF6"
  marker-yellow: "#F5CD47"
  marker-yellow-bright: "#FBD760"
  paper: "#F8F9FC"
  card-white: "#FFFFFF"
  blue-wash: "#E7EEF9"
  blue-wash-ink: "#093472"
  muted-wash: "#E9EEF6"
  slate-ink: "#465472"
  border-blue-grey: "#D2DBE9"
  input-blue-grey: "#BDC8DB"
  ring-blue: "#0E57BE"
  signal-red: "#C72323"
  night: "#070E1C"
  night-card: "#0F172A"
  night-wash: "#1A243D"
  night-muted: "#151E32"
  night-text: "#EDF1F7"
  night-slate: "#A5B1CA"
  night-border: "#222C44"
  night-input: "#2E3A56"
  night-signal-red: "#E14747"
  series-red: "#D83131"
  series-blue: "#2378E7"
  series-green: "#339966"
  status-open-wash: "#DFF6EB"
  status-open-ink: "#165A3A"
  status-soon-wash: "#FDEDB9"
  status-soon-ink: "#62410E"
typography:
  display:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(3rem, 7vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  title-sm:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.005em"
  card-title:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  lede:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  statement:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 400
    lineHeight: 1.55
  date-number:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "2.4rem"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "\"tnum\""
  date-label:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.14em"
  body:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "\"kern\", \"liga\""
  label:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.025em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  card: "14px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  tile-gap: "12px"
  tile-gap-wide: "16px"
  band: "56px"
  band-wide: "80px"
  section: "80px"
  section-wide: "112px"
components:
  button-primary:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-primary-lg:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-primary-dark:
    backgroundColor: "{colors.marker-yellow}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  button-marker:
    backgroundColor: "{colors.marker-yellow}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-marker-hover:
    backgroundColor: "{colors.marker-yellow-bright}"
    textColor: "{colors.navy-ink}"
  button-inverse:
    textColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-inverse-hover:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.logo-blue}"
  button-secondary:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.blue-wash-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.md}"
    padding: "4px 14px"
    height: "44px"
  badge-open:
    backgroundColor: "{colors.status-open-wash}"
    textColor: "{colors.status-open-ink}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  badge-soon:
    backgroundColor: "{colors.status-soon-wash}"
    textColor: "{colors.status-soon-ink}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  badge-closed:
    backgroundColor: "{colors.muted-wash}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  event-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.card}"
    padding: "0 24px 24px"
  date-block:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.md}"
    width: "72px"
  site-header:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.card-white}"
    height: "64px"
  site-footer:
    backgroundColor: "{colors.deep-blue}"
    textColor: "{colors.card-white}"
---

# Design System: EuropeTalks

## Overview

**Creative North Star: "The Campaign Poster"**

The site reads like a campaign poster for a real network. Big condensed caps, a field of logo blue and the faces and words of actual members carry the message. Every brand band (header, home hero, inner page heads, the closing call to action) is one continuous slab of the logo's EU blue, and the header merges into it so the top of each page reads as a single printed sheet. Paper sections between the bands are calm and cool white, set in Sofia Sans at reading size, so the poster moments have room to hit.

The hand-made layer comes from the brand's own materials. Hand-painted watercolor splashes in red, yellow, blue and green sit behind section headings like a marker stroke on a printed flyer. The three white bars from the top of the logo open each blue band. Member quote cards and event photos are the proof; stock imagery stays secondary. Motion is short, warm and physical: buttons press down to 0.97, cards lift 2px, photos zoom 4 percent, the home hero assembles in about 850ms, watercolor splashes spread like paint as they come into view, and the quote deck fans and shuffles.

The world was set against one specific look: a darkened stock-photo hero with centred typewriter text above three identical image cards. Nothing in this system should drift back toward it.

**Key Characteristics:**
- Logo blue fields for header, hero, page heads and the call-to-action band; deep blue for the footer.
- Sofia Sans Extra Condensed at weight 900, in caps, for every display line; Sofia Sans for everything you read.
- Marker yellow is the action colour on blue and in dark mode; logo blue is the action colour on paper.
- Watercolor strokes behind headings, chosen only from splashes whose paint clears the image edge.
- The three logo stripes as the structural mark.
- Navy-tinted shadows and 14px corners on photos and cards.

## Colors

A two-colour brand (logo blue and marker yellow) over cool blue-tinted neutrals, with the four watercolor hues reserved for strokes and event series coding. Tokens live in `app/globals.css` as HSL triples consumed through `hsl(var(--x))`; the hex values above are exact conversions of those triples.

### Primary
- **Logo Blue** (`--brand`): the EU blue of the logo. Fills the header, home hero, every `PageHero`, the closing call-to-action band and primary buttons on paper. Display headings on paper are set in it. It does not change between themes.
- **Marker Yellow** (`--marker`): the highlight yellow of the Instagram quote cards. Primary action fill on blue fields and in dark mode, the word "EuropeTalks" in the hero headline, link underlines, the active nav bar, selection, and focus outlines on blue and dark grounds. On logo blue it measures 6.06:1; navy ink on it measures 11.32:1.
- **Marker Yellow Bright**: hover state for marker buttons only.

### Secondary
- **Deep Blue** (`--brand-deep`): the footer and the backing behind quote cards and photo tiles while they load. In dark mode it shifts to **Night Band**.
- **Blue Mist** (`--brand-mist`): lede and body text on blue fields (6.77:1 on logo blue). Use it instead of white at reduced opacity for paragraphs on blue.

### Tertiary
- **Series Red / Series Blue / Series Green**, plus marker yellow: the event series dots, matched to the watercolor of the same series (see The Series Colour Rule).
- **Status washes** (open green, soon yellow): registration badges on event cards and in the event details dialog. Closed reuses Muted Wash with Slate Ink.

### Neutral
- **Paper** (`--background`): page background in light mode, a blue-tinted white.
- **Card White** (`--card`): event cards, the contact form panel, date blocks.
- **Navy Ink** (`--brand-ink`): all body text on paper, and the text colour on marker fills.
- **Slate Ink** (`--muted-foreground`): secondary text, meta lines, captions (7.20:1 on paper).
- **Blue Wash / Blue Wash Ink** (`--secondary`): secondary buttons, ghost hover, and the upcoming-events band on home (at 60 percent).
- **Muted Wash** (`--muted`): notice boxes, skeletons, closed badges.
- **Border / Input Blue-Grey**: hairlines between sections and list rows; input strokes.
- **Ring Blue** (`--ring` in light mode): input focus border and glow on paper.
- **Signal Red**: destructive actions and form errors.
- **Night family** (dark mode): Night background, Night Card, Night Wash, Night Muted, Night Text, Night Slate, Night Border, Night Input, Night Signal Red. Dark mode keeps the brand blue bands unchanged and moves only the paper surfaces to navy.

### Named Rules
**The Two Primaries Rule.** On paper, the primary action is logo blue with white text. On blue fields and anywhere in dark mode, the primary action is marker yellow with navy ink. A yellow fill on paper white has no edge (1.46:1), so it never appears there. `--primary` swaps to `--marker` in `.dark`; on blue bands in light mode use the `marker` button variant explicitly.

**The Blue Field Rule.** Logo blue is a field, not an accent. It fills whole bands edge to edge (header, hero, page head, call-to-action band) and the header has no border or shadow that separates it from the band below. On paper, blue appears only as type, links, buttons and the date block's month strip.

**The Highlight Rule.** Marker yellow on paper is a line, never a fill or text colour: link underlines (2 to 3px, offset 6px), the nav indicator and selection. As text, yellow appears only on blue or navy grounds.

**The Series Colour Rule.** Event series carry a fixed colour from `lib/event-series.ts`: Beer and Roses is red, conferences and congresses are blue, trips ("goes to", "visits") are green, everything else is yellow. The colour shows as an 8 to 10px dot before location and date on gallery tiles, gallery chips and gallery section heads. New series surfaces use `seriesColor()` and `seriesDot`, never a hand-picked hue.

## Typography

**Display Font:** Sofia Sans Extra Condensed, weights 700 to 900 (with Sofia Sans, then ui-sans-serif)
**Body Font:** Sofia Sans (with ui-sans-serif, system-ui)

**Character:** The condensed caps echo the logo lettering and give headings the weight of a protest placard; Sofia Sans from the same family keeps body text friendly and readable across 13 languages. Both load latin, latin-ext, greek, cyrillic and cyrillic-ext subsets through `next/font`.

### Hierarchy
- **Display** (900, clamp(3.5rem, 9vw, 7.5rem), 0.9, caps): the home hero headline only.
- **Headline** (900, clamp(3rem, 7vw, 5.5rem), 0.9, caps): inner page heads (`PageHero`) and the closing call-to-action band.
- **Title** (900, clamp(2.75rem, 5.5vw, 4.5rem), 0.9, caps): section headings on paper. About section heads run slightly smaller (clamp(2.5rem, 4.5vw, 3.75rem)); gallery event heads clamp(2.25rem, 4.5vw, 3.5rem).
- **Title Small** (900, 2.75rem, 0.9, caps): watercolor pillar headings, the leadership name (3rem), the mobile menu links (3rem) and footer nav links (1.875rem).
- **Card Title** (Sofia Sans 700, 1.5rem, 1.25): event card titles and upcoming-event rows (1.25 to 1.5rem). Event titles are sentence case, not display caps.
- **Lede** (400, 1.25rem rising to 1.5rem at md, 1.625): the first sentence under a hero and the first paragraph of each about section (1.4rem at md).
- **Statement** (400, 1.4rem, 1.55): the mission paragraph on home and the first paragraph of each about section at md and up.
- **Date Number / Date Label** (900 condensed 2.4rem tabular; 700 at 11px, 0.14em tracking): the day and the month/year on the calendar-leaf date block. Used nowhere else.
- **Body** (400, 1.125rem, 1.7): long reading, capped at 68ch with `.measure`. Kerning and ligatures on; `text-wrap: pretty` on paragraphs.
- **Label** (600, 0.9375rem, letter-spacing 0.025em): header nav links. Buttons use 600 at 0.875rem (1rem for large).

### Named Rules
**The Poster Caps Rule.** Every heading that announces a section is the `.display` class: Sofia Sans Extra Condensed, weight 900, uppercase, line-height 0.9, letter-spacing -0.005em, `text-wrap: balance`. Paragraphs, meta lines and form text are never set in the condensed face.

**The Long Word Rule.** Display headings must survive German, Hungarian and Greek. Use fluid clamp sizes, let `text-wrap: balance` work, and add `hyphens: auto` on the largest sizes, as the hero does. Never fix a heading's width to its English length.

## Layout

One centred container (max 1280px) with 20px side gutters, 32px from the `sm` breakpoint. Wide layouts sit on a 12-column grid at `lg` (1024px): the home hero splits 7 and 5 (text, quote deck), the mission block splits 6 and 5 with the pillar list starting at column 8, about sections put a sticky heading in 4 columns and text in 7 starting at column 6, and the contact page splits 4 and 7. Below `lg` everything stacks in reading order.

Vertical rhythm comes in two sizes. Persuasive and reading sections on home and about use 80px vertical padding, 112px from `md`. Operational pages (events, past events, gallery, contact) use 56px, 80px from `md`. Blue page heads run 40 to 56px on top and 48 to 64px below. Sections on paper are separated by a 1px border line rather than background changes, except the home upcoming-events band, which uses Blue Wash at 60 percent.

Photo mosaics use a two-column grid on mobile and four columns from `md`, with the first tile spanning 2 by 2. Row heights are fixed (13 to 15rem on home, 9 to 13rem in the gallery) and gaps are 12 to 16px (8 to 12px in the gallery). Event cards use a 1, 2, 3 column grid with 32px gaps.

### Named Rules
**The Stripes Rule.** The three bars from the top of the logo (three 3px bars, 5px apart, current colour) are the structural mark. They open every blue band above the heading at 56 to 64px wide and white at 70 percent, close the mobile menu, mark the empty event image and sign off the footer at small size. Use the `Stripes` component; it replaces decorative dividers and labels.

## Elevation & Depth

A hybrid system. Brand bands are flat; depth on paper comes from navy-tinted shadows on objects you can pick up (cards, date blocks, the printed portrait, quote cards). Shadows are long and soft with a negative spread so they pool under the object rather than haloing it. In dark mode the same shadows stay but objects add a hairline white ring (5 percent on cards, 15 percent on date blocks and quote cards) so their edges hold against navy.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 2px hsl(var(--brand-ink) / 0.06), 0 10px 30px -14px hsl(var(--brand-ink) / 0.28)`): event cards at rest.
- **Card lift** (`box-shadow: 0 2px 4px hsl(var(--brand-ink) / 0.08), 0 22px 44px -18px hsl(var(--brand-ink) / 0.4)`): event card hover and focus-within, paired with a 2px upward move.
- **Panel** (`box-shadow: 0 1px 2px hsl(var(--brand-ink) / 0.06), 0 16px 40px -20px hsl(var(--brand-ink) / 0.35)`): the contact form panel.
- **Leaf** (`box-shadow: 0 6px 20px -8px hsl(var(--brand-ink) / 0.45)`): the date block, which overlaps the card image.
- **Print** (`box-shadow: 0 2px 4px hsl(var(--brand-ink) / 0.08), 0 18px 40px -16px hsl(var(--brand-ink) / 0.45)`): the framed leadership portrait.
- **Deck** (`box-shadow: 0 24px 60px -20px rgba(3, 10, 35, 0.65)`): quote cards sitting on a blue field.
- **Marker glow** (`box-shadow: 0 2px 10px -2px hsl(var(--marker) / 0.5)`): marker buttons only.

### Named Rules
**The Ink Shadow Rule.** Shadows are tinted with navy ink, never neutral black or grey, and they belong to physical objects. Bands, sections and nav never cast shadows.

**The Clean Edge Rule.** A watercolor stroke behind a heading uses only splashes whose paint stays clear of the image edge: blau 1, 7, 8; rot 1, 5, 6; gelb 1, 6, 8; grün 4, 5, 6, 7. Any other variant shows a straight cut line. Large field bleeds on blue bands (hero blau 4, call-to-action gelb 6) may use other variants because the band's `overflow: hidden` crops the cut edge off-canvas.

**The Paper Yellow Rule.** Watercolor strokes blend with `multiply` at 60 percent on paper and `screen` at 25 percent in dark mode. Yellow strokes are hidden in dark mode, because yellow screened onto navy turns olive.

## Shapes

Gently rounded and object-like. Buttons, inputs and the date block use 10px corners; cards, photo tiles on home and quote cards use 14px; gallery photo tiles use 12px; thumbnails 8px. Chips, badges and every circular icon button (44px quote-deck controls, 48px gallery arrow, 40px social icons) are full pills. The leadership portrait is the one square object: a white print mat (10px padding, 36px at the bottom) tilted -2 degrees that straightens on hover. Quote cards rest fanned at -2.5, 4 and -7 degrees. Borders are 1px hairlines; on blue fields they are white at 25 to 40 percent and turn solid white on hover. Photos always fill their tile with `object-cover`.

## Components

### Buttons
Firm, poster-flat buttons with one bright exception.
- **Shape:** 10px corners; 40px tall by default, 48px for hero and band actions, 32px small.
- **Primary (paper):** logo blue fill, white text, 600 weight. In dark mode the same variant becomes marker yellow with navy ink.
- **Marker:** marker yellow fill, navy ink, marker glow; hover brightens to Marker Yellow Bright. The default action on every blue field, usually with a trailing arrow icon.
- **Inverse:** transparent with a 1px white border at 70 percent and white text; hover fills white with logo blue text. Always paired as the second action next to a marker button on blue.
- **Secondary / Outline / Ghost:** Blue Wash fill, or a 1px input border on paper; hover moves to Blue Wash. Disabled event signups fall back to secondary.
- **States:** 160ms colour transition (`--dur-fast`, `--ease-out`), press scales to 0.97 over 160ms ease-out, 50 percent opacity when disabled. Focus is a 3px ring with 2px offset: Ring Blue on paper, marker yellow inside blue fields (`.bg-brand`, `.bg-brand-deep` remap `--ring`) and in dark mode.
- **Text links as actions:** bold logo blue (white in dark) with a 3px marker underline at 6px offset and an arrow that nudges 4px right on hover.

### Chips
- **Status badges:** pill, 0.75rem semibold, 2px by 10px. Open is green wash with dark green ink, soon is yellow wash with brown ink, closed is muted wash with slate ink; each has a dark-mode pair. They sit top-right on the event image.
- **Gallery jump chips:** pills on the blue page head, 1px white border at 30 percent, series dot, event name in semibold and location at 70 percent opacity; hover fills white with logo blue text.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Card White (Night Card in dark).
- **Shadow Strategy:** Card rest and Card lift (see Elevation & Depth).
- **Border:** none in light; 5 percent white ring in dark.
- **Internal Padding:** 24px sides and bottom. The image header is 192px tall, or a 112px logo blue strip with the stripes mark when the event has no image. The date block overlaps the image by 40px. The whole card is clickable through the title button's stretched hit area; the title turns logo blue (marker in dark) on hover.

### Inputs / Fields
- **Style:** 44px tall, 10px corners, 1px Input Blue-Grey stroke on the page background, 14px side padding, 1rem text (0.875rem from `md`). The caret is logo blue on paper and marker yellow in dark.
- **Focus:** the border turns Ring Blue and a 3px Ring Blue glow at 25 percent appears. In dark mode the ring is marker yellow.
- **Error / Disabled:** errors use Signal Red text below the field; disabled fields drop to 50 percent opacity.

### Navigation
- **Header:** sticky, 64px, logo blue, logo image at full header height on the left. Desktop links are Sofia Sans semibold 15px with slight tracking, white at 75 percent; the active and hovered link turns white and grows a 3px marker bar along the bottom edge (scale-x from the left, 220ms, `--ease-out`). The active link's bar is a real element named `nav-indicator`, so on navigation it slides to the new link inside the route view transition.
- **Mobile:** a logo blue sheet from the right. Links are display caps at 3rem, white, marker yellow when active or hovered. The stripes mark closes the sheet at the bottom.
- **Footer:** deep blue. Logo, the tagline in Blue Mist and the email link with a 2px marker underline on the left; footer nav as display caps at 1.875rem; social links with 40px circular icon frames that fill marker yellow on hover. A small stripes mark and the copyright sit above a 15 percent white hairline.

### Quote Deck (signature)
The site's signature interaction. Three member quote cards stack on a blue field, fanned at -2.5, 4 and -7 degrees, offset 5 percent and scaled 1, 0.95, 0.9. The top card throws off to the left (rotate -16, x -55 percent) and the next card settles into place over 700ms with ease-out-expo, every 6 seconds. Autoplay pauses on hover and focus, arrow keys step through the deck, and three 44px circular controls (previous, pause, next) with a tabular counter sit below. Under reduced motion it never autoplays and changes cards with a 200ms fade.

### Date Block
A calendar leaf: 72px wide, 10px corners, Card White with the Leaf shadow. A logo blue strip carries the localised short month in 11px bold caps with 0.14em tracking, then the day in display numerals at 2.4rem, then the year in 11px semibold slate. It anchors event cards and upcoming-event rows.

### Page Hero
The inner-page head. A logo blue band that continues the header, with the stripes mark, a Headline in display caps, an optional Blue Mist lede and optional actions or a chip row below.

### Splash Heading
A display heading with one watercolor stroke painted behind the words, overhanging 0.5em left, 0.9em right, 0.9em above and 0.5em below. Follows The Clean Edge Rule and The Paper Yellow Rule.

### Photo Tile
Event photos as full-bleed 14px tiles on a deep blue backing. A navy scrim rises from the bottom (from 92 percent to transparent) under the event name in display caps and a series-dot meta line. Hover zooms the photo to 104 percent over 700ms.

## Do's and Don'ts

### Do:
- **Do** use marker yellow with navy ink for the main action on any blue field or in dark mode, and logo blue with white for the main action on paper.
- **Do** pair a marker button with an inverse (white outline) button when a blue band offers two actions.
- **Do** set every section heading with the `.display` class, at a fluid clamp size, and test it in German, Hungarian and Greek.
- **Do** open each blue band with the `Stripes` mark above its heading.
- **Do** pick heading watercolor strokes only from blau 1/7/8, rot 1/5/6, gelb 1/6/8 and grün 4-7.
- **Do** colour-code event series through `seriesColor()` and `seriesDot` from `lib/event-series.ts`.
- **Do** tint shadows with navy ink (`--brand-ink`) and add a hairline white ring to cards in dark mode.
- **Do** use the motion tokens in `app/globals.css`: `--dur-fast` 160ms, `--dur-base` 220ms, `--dur-slow` 360ms, `--dur-hero` 640ms, `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)) for entrances and state changes, and `--ease-spring` (about 9 percent overshoot) only for the nav indicator slide, where the distance is large enough for the overshoot to show. Hover motion uses the project's `hover:` variant, which requires `(hover: hover) and (pointer: fine)`. Radix overlays scale from their trigger with `origin-(--radix-…-transform-origin)`. Never animate on keyboard focus. Under `prefers-reduced-motion` the distance tokens drop to zero, so motion becomes short fades rather than nothing.
- **Do** format dates with `lib/format-date.ts` (Intl in the active i18n language). date-fns `format` without a locale always prints English.
- **Do** link internally with `@/components/TransitionLink` (or `PrefetchLink`). It tags navigations with the `nav` type, which is the only thing the page `<ViewTransition>` in `app/layout.tsx` crossfades.
- **Don't** put scroll-driven reveals (`.reveal`, `.reveal-scale`, `.reveal-settle`, `.bloom-scroll`) inside an `overflow: hidden` ancestor. That makes the ancestor the scroll container and the reveal never plays; use `overflow-clip` instead.
- **Do** use Ring Blue for focus indicators on paper surfaces, as inputs already do.

### Don't:
- **Don't** fill a button or a surface with marker yellow on paper white.
- **Don't** set marker yellow text on paper; yellow text belongs on blue or navy only.
- **Don't** show a yellow watercolor stroke in dark mode.
- **Don't** set paragraphs, meta lines or form text in Sofia Sans Extra Condensed.
- **Don't** build a darkened stock-photo hero with centred typewriter text, or a row of three identical image cards.
- **Don't** put small tracked-caps labels or eyebrows above headings, and don't use gradient text.
- **Don't** add new hard-coded `hsl()` or `rgba()` colours in components; add a token to `app/globals.css` first.
