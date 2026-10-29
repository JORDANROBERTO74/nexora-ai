# Nexora — Provenance & Compliance Ledger

This ledger records the origin, brand transformation and asset provenance for **Nexora**.

## 1. Project Background & Transformation

- **Original Working Directory:** `E:\Projects\landing\next\keyonehub-marketing-site-bluetheme`
- **Rebuilt Project Name:** `nexora-ai`
- **Final Repository:** `https://github.com/JORDANROBERTO74/nexora-ai`
- **Live Production URL:** `https://nexora-ai-hq.vercel.app`
- **Mode:** Change pass over the existing layout. The section structure, copy intent and the interactive demo engine were reused; only the blocking items were rewritten.

The source template was mid-rebrand: the hero and metadata already said **NEXORA** while the product mockups, footer and demo copy still said **K1HUB** (and `k1hub.com`). This build completes that rebrand to a single name.

## 2. Brand & Identity

- **Brand:** Nexora
- **Sector:** Business-aware automation layer for AI agents — orchestration, knowledge graph and governance.
- **Visual system:** Navy (`#07182e`), accent orange (`#c2410c`), light orange (`#fdba74`), signal red (`#e30613`), ink (`#111827`), soft ink (`#5f6673`), line (`#d7dbe3`), paper (`#f7f8fb`).
- **Typography:** Inter, self-hosted via `next/font/google`.
- **Locale strategy:** Typed bilingual copy (`en`, `es`) on `/[locale]` routes, negotiated from `Accept-Language` and persisted in the `nexora.locale` cookie.

## 3. Asset & Visual Provenance

- **No photography.** Every visual on the page is CSS, inline SVG or Lucide icons: the constellation canvas, the product mockups and the demo panels. No stock images, no faces, no third-party photography.
- **Brand mark:** Custom SVG (`src/app/icon.svg`) — three connected nodes on a navy square.
- **Social card:** Generated at request time with `next/og` from the same dictionary as the page.
- **Runtime dependencies:** Zero remote font networks, image hosts or CDNs.

### Removed third-party material

The template referenced and reproduced third-party products. None of it ships:

- **Slack logo.** `components/icons/slack.tsx` reproduced the official four-colour Slack mark; it was replaced by a neutral channel glyph (`components/icons/channel.tsx`).
- **Slack in copy.** "Slack thread", "Slack reply", `slack.message.received`, `integrations.slack`, "View Slack thread" and the `K1hub Agent` author were rewritten to channel-neutral wording.
- **Integration strip.** The original listed Zendesk, Snowflake and Slack as customers/integrations; it now lists capability categories (support desk, data warehouse, OpenAPI, CRM, billing, chat).
- **Product copy.** References to Zendesk and Snowflake inside the control-panel panels, governance text and mockups were replaced with generic system names.

## 4. Copy & Localisation

- English marketing copy is the template's own, re-scoped to the Nexora brand. The Spanish version is an original adaptation.
- Product interfaces (Command Center, Operational Automation, the four demo scenarios) are intentionally kept in English, as software UI, and the demos section states it.
- No real company, client or case study is represented. Metrics are illustrative.

## 5. Architectural Verification

- Next.js 16.4.3 App Router with Turbopack; React 19.2.4; strict TypeScript.
- Tailwind CSS v4: the template shipped v3 directives with the v4 PostCSS plugin, so no utility class was being generated. The stylesheet now imports `tailwindcss` and maps the palette plus a shadcn token bridge in `@theme`.
- `/en` and `/es` are statically generated; `/` returns `307` to the negotiated locale.
- `pnpm typecheck`, `pnpm lint` and `pnpm build` complete without errors.
- `robots.txt`, multilingual `sitemap.xml`, `hreflang` alternates and a generated 1200x630 OpenGraph card are in place.
- The four interactive demos pause when out of the viewport and render their final state under `prefers-reduced-motion`.
