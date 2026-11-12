# EuropeTalks website

Website and member platform of EuropeTalks, a network of young social-democratic activists across Europe. It runs in production at [europetalks.eu](https://europetalks.eu).

The public side explains the network, lists events with registration forms and shows photo galleries of past events. Admins manage events and registration forms. Sign-in goes through Clerk, and the same Clerk role decides what a person sees on the site and whether the member cloud link appears.

## What each kind of user gets

Visitors can read the pages and sign up for events without an account.

- Home, about, events, past events, gallery, contact, legal notice and privacy policy pages.
- Event cards with a registration status (not started, open, closed) taken from each event's signup window.
- A registration dialog built from the form schema attached to the event.
- A contact form that emails the network and sends the sender a receipt.
- 13 interface languages, chosen from a menu in the header.

Members and admins sign in at `/sign-in` or `/sign-up`. The header shows extra links based on the `role` field in the Clerk user's public metadata.

| Role | Header links |
|------|--------------|
| `admin` | Admin dashboard, cloud link |
| `member` | Cloud link, and a translations link if the user also has a `languages` list |
| none | No extra links |

The cloud link points to `cloud.europetalks.eu`, the members' cloud. `proxy.ts` lists that host, `europetalks.eu` and `localhost:3000` as authorized parties for the Clerk session. The cloud itself is not part of this repository, so the single sign-on setup on that side is not described here.

Admins use `/admin` to:

- create, edit and delete events, with an optional image upload,
- build reusable form schemas (fields and terms) and attach one to each event,
- list registrations per event, delete them, and download them as CSV.

## Stack

Versions come from `package.json`.

- Next.js 16.4 with the App Router, React 19.3 and TypeScript 6. Production builds use webpack (`next build --webpack`).
- Clerk (`@clerk/nextjs` 7.9) for authentication. `proxy.ts` is the Clerk middleware.
- PostgreSQL through Prisma 7.10 with the `pg` driver adapter.
- Tailwind CSS 4.3, Radix UI primitives, `lucide-react` icons and `motion` 14 for animation.
- i18next 27 with react-i18next 18.
- SWR for client-side data fetching, react-hook-form with Zod 4 for forms.
- Nodemailer for the contact and registration emails.
- `sharp` to process uploaded images.
- Bun as package manager and script runner.

## Translations

Thirteen languages ship as JSON files in `translations/`: en, de, fr, es, it, nl, pt, uk, lv, lt, hr, hu and el. Each file has the same 157 keys, grouped into namespaces such as `home`, `events`, `contact`, `header` and `other`.

`translations/initial-translations.ts` bundles only English. `components/i18n-provider.tsx` loads any other language with a dynamic import when the visitor picks it, and caches it for the session. It also reads `navigator.language` and, if the browser language is one of the 13 and not English, shows a small prompt offering to switch. English is the fallback language, and empty strings count as missing.

The database has a `Translation` table with one JSON document per language. `scripts/download-translations.ts` reads that table and overwrites `translations/<language>.json`. Run it with `bun run download:translations` and a working `DATABASE_URL`.

The in-app translation editor pages and API routes were removed in November 2025. The `/admin/translations` link on the dashboard and the `/member/translations` header link for members with a `languages` list still exist, but the routes behind them do not. Corrections to a machine translation therefore currently mean editing a JSON file, or writing to the `Translation` table and running the export script.

## Events and registration

- `/api/events` returns upcoming events (end date in the future, soonest first) and past events (latest first), each with its form schema, fields and terms. The response is cached for 60 seconds with a 5 minute stale window.
- An event has a start and end date, a location, an optional image, a form schema and an optional signup window (`signup_period_json` with `startDate` and `endDate`). Without a window, registration is open until the event starts.
- A form schema is a list of fields plus a list of terms. Field types are `text`, `email`, `tel`, `textarea`, `select`, `checkbox`, `radio` and `date`. Each field can be required and can carry min, max, pattern and custom message rules. `lib/types/event-form.ts` turns a schema into a Zod validator in the browser.
- `POST /api/events/signup` stores the answers in `EventSignup` and sends two emails over SMTP, a confirmation to the registrant and a notice to the network address.
- Event images upload to `/api/admin/upload`. The route accepts JPEG, PNG, WebP and GIF up to 4 MB, checks the file signature, re-encodes everything except GIF to WebP with `sharp` and writes it to `public/uploads/`.
- The gallery reads folders under `public/images/Gallery`, named `Name_Location_Month Year`. `lib/gallery.ts` parses the name, place and date from the folder name.

## Data model

Defined in `prisma/schema.prisma`.

- `Event` has title, description, start and end dates, location, image URL and signup window. It belongs to one `FormSchema` and has many `EventSignup` rows.
- `FormSchema` has many `FormField` and `EventTerm` rows, both ordered by an `order` column and deleted with the schema.
- `EventSignup` has full name, email, optional phone and motivation, and a JSON `formData` column for the answers. It is deleted with its event.
- `Translation` has a unique `language` and a JSON `content`.

The repository has no `prisma/migrations` folder.

## Run it locally

You need Bun and a PostgreSQL database.

```bash
bun install
cp .env.example .env.local   # then fill in the values
bunx prisma generate
bun run dev                  # http://localhost:3000
```

`bun run dev` starts `next dev --turbopack` under Bun. The pages need a reachable database and Clerk keys to render fully. The Prisma schema has to be applied to the database by hand, because the repository carries no migrations.

### Environment variables

Names come from `.env.example`.

| Variable | Used for |
|----------|----------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Clerk keys |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Optional sign-in and sign-up paths |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Optional redirect after sign-in and sign-up |
| `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT` | SMTP server for both mailers |
| `CONTACT_FORM_EMAIL_SERVER_USER`, `CONTACT_FORM_EMAIL_SERVER_PASSWORD` | SMTP login for the contact form |
| `CONTACT_FORM_EMAIL_FROM`, `SEND_TO_EMAIL` | Sender of contact mails, and the inbox that receives contact and registration notices |
| `EVENT_SIGNUP_EMAIL_SERVER_USER`, `EVENT_SIGNUP_EMAIL_SERVER_PASSWORD`, `EVENT_SIGNUP_EMAIL_FROM` | SMTP login and sender for registration mails |

`.env.example` also lists `TRANSLATIONS_EXPORT_API_KEY` and `DEEPL_API_KEY`. No code in the repository reads them.

To make someone an admin, set `{ "role": "admin" }` in the user's public metadata in the Clerk dashboard. Members get `{ "role": "member" }`.

## Scripts

| Command | What it does |
|---------|--------------|
| `bun run dev` | Dev server with Turbopack |
| `bun run build` | `prisma generate`, then `next build --webpack` |
| `bun run start` | `next start` on Node |
| `bun run lint` | ESLint 10 with the `eslint-config-next` core-web-vitals rules |
| `bun run download:translations` | Export the `Translation` table to `translations/*.json` |
| `bun run convert:aquarelle` | Points to `scripts/convert-aquarelle-to-webp.js`, which is not in the repository |

There is no test suite and no `typecheck` script. `bunx tsc --noEmit` passes after `bunx prisma generate`.

## Build and deploy

A build with placeholder values for `DATABASE_URL` and the two Clerk keys succeeds, and `next start` then serves the home, about, events and contact pages with HTTP 200. Pages that read events need a real database, and sign-in needs real Clerk keys.

`bun run start` runs `next start` on Node on purpose. Under `bun --bun`, the compiled Clerk middleware threw `Expected CommonJS module to have a function wrapper` on every request, and the host's health check rolled the deploy back.

The repository holds no Dockerfile or other deploy configuration, so the hosting setup is not documented here. The commit history mentions Coolify health checks on deploy. The only workflow in `.github/workflows` is a Renovate fix workflow, and `renovate.json` configures automatic dependency updates.

## Other documents

- `PRODUCT.md` describes the audience and purpose of the public site.
- `DESIGN.md` and `.impeccable/` record the visual design system.
- `CHANGES.md` is a log of the first documentation cleanup and is out of date.
