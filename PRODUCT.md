# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Young social-democratic and socialist activists across Europe, often members of national parties or youth organisations, who hear about EuropeTalks through a friend, an event or social media and want to know what it is.
- Local party branches and committees looking for European partners.
- Returning members checking upcoming events and signing up.
- A small admin team that manages events, signup forms and signups (admin area, out of scope for public design work).

## Product Purpose

EuropeTalks is a grassroots network that connects activists from across Europe to talk, work and organise together on a shared European, social-democratic vision. The public site explains who the network is, shows what it does (workshops, conferences, informal meetups, discussion papers), lists upcoming events with signup, and keeps a photo record of past events.

Success for a first-time visitor (confirmed): they understand who EuropeTalks is and what it stands for. Joining an event or getting in touch follows from that.

## Positioning

A European network that works across national party lines, direct and without intermediaries. It started after the "Europe, we need to talk!" conference in 2018 (Jusos and SPD Hessen-Süd), and the founding manifesto of the same name is the basis for its work. Members come from 14 countries.

## Operating Context

- Events: annual conference in Brussels, "Beer and Roses" meetups (Madrid, Rijeka, Strasbourg), trips (Istanbul, Kyrgyzstan), PES Congress. Events have registration periods and per-event signup forms.
- Workshops end in discussion papers that members carry back to their own organisations.
- Social presence: Facebook, Instagram (quote cards), YouTube, mail@europetalks.eu.

## Capabilities and Constraints

- Next.js App Router, Tailwind CSS v4, shadcn/Radix components, Clerk auth, Prisma/Postgres, deployed on self-hosted Coolify.
- 13 interface languages (en, de, fr, es, it, nl, pt, uk, lv, lt, hr, hu, el); copy lives in `translations/*.json`. Greek and Cyrillic scripts must render. German and Hungarian strings run long.
- Light and dark theme, user-toggleable.
- Shared UI primitives in `components/ui` are also used by the admin area.

## Brand Commitments

Confirmed fixed assets for the redesign:

- Logo: `public/images/etlogo.png` (white, for dark grounds), `squareLogo.png`, `rectLogo.png` and inverted variants. Deep EU blue, white stripes, white stars, condensed bold caps.
- The EU-flag blue of the logo and the yellow highlight used on the Instagram quote cards.
- Hand-painted watercolor textures in four colours: `public/images/aquarelle/{blau,rot,gelb,grün}/1-8.webp`.

## Evidence on Hand

- 26 member quote cards: `public/images/slideshow/quotes1-26.webp` (photo, quote, name and country).
- Event photo galleries: `public/images/Gallery/<event>/`.
- Leadership: Vivien Costanzo, MEP (`public/images/vivien-costanzo.jpeg`).
- Hero photos: `europeByNight.webp`, `europeanunion.webp`; feature photos `flags.webp`, `community.webp`, `learning.webp`.
- No member counts, event counts, press quotes or testimonials beyond the quote cards exist. Do not invent them.

## Product Principles

1. Explain the network before asking for anything. A visitor should know who, what and why within one screen.
2. Show real people and real events. The quote cards and gallery photos are the proof; stock imagery is secondary.
3. Every language is first class. Layouts must hold long German and Hungarian strings and Greek and Cyrillic scripts.
4. Political, warm and European, not corporate and not party-official.

## Accessibility & Inclusion

Multilingual audience with mixed reading levels in English. Target WCAG 2.2 AA contrast, keyboard access and reduced-motion support.
