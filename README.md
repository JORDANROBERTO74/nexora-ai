# Nexora — Operational Intelligence Landing

The business-aware engine for your AI agents. A bilingual product site for Nexora: a central intelligence layer, an operational knowledge graph and governance for cross-functional automation.

![Nexora Preview](docs/screenshot.webp)

## Overview

Nexora is a B2B landing page for an AI automation platform. It pairs a navy-and-signal-blue marketing surface with three product mockups (Command Center, Operational Automation, governance logs) and four interactive demos that replay a real support thread end to end: signal → orchestration → risk assessment → approval → governed reply → audit trail.

The layout, sections and copy intent come from the source template; this build migrates them to a typed design system, adds bilingual routing and removes the third-party material the original shipped.

## Key Features

- **Four interactive demos:** `churn`, `migration`, `expansion` and `consolidation` scenes, each with its own channel thread, orchestration steps, risk panel and evidence. They start when they enter the viewport, pause when they leave, and settle on their final state under `prefers-reduced-motion`.
- **Bilingual routing (`en` / `es`):** Typed dictionaries, `/[locale]` segments, `Accept-Language` negotiation and a `nexora.locale` cookie that keeps the visitor's choice.
- **Product-accurate mockups:** The hero Command Center and the automation dashboard are hand-built in HTML/CSS, not screenshots, so they stay sharp and translatable.
- **Animated constellation:** A canvas node graph in the hero with device-pixel-ratio handling.
- **Metadata per locale:** Canonical URLs, `hreflang` with `x-default`, per-locale OpenGraph tags and a multilingual sitemap.
- **Localised 404:** A `[locale]/[...rest]` catch-all routes unknown paths into the styled not-found page.
- **Zero photography:** Every visual is CSS, inline SVG or a Lucide icon.

## Tech Stack

- **Framework:** Next.js 16.4.3 (App Router, Turbopack)
- **Library:** React 19.2.4
- **Language:** TypeScript 5.7.3 (strict)
- **Styling:** Tailwind CSS 4.3.3 with a CSS-first `@theme` palette
- **Motion:** Framer Motion 14 for the demo panels; CSS keyframes for the marketing surface
- **Icons:** Lucide React
- **Analytics:** `@vercel/analytics`
- **Package Manager:** pnpm 11.17

## Architecture

```
nexora-ai/
├── docs/
│   ├── provenance.md               # Compliance ledger and transformation history
│   └── screenshot.webp             # Visual preview artifact
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── [...rest]/page.tsx  # Catch-all that renders the 404
│   │   │   ├── layout.tsx          # Locale shell, font, analytics
│   │   │   ├── not-found.tsx       # Styled 404
│   │   │   ├── opengraph-image.tsx # 1200x630 social card
│   │   │   └── page.tsx            # Composed landing route
│   │   ├── globals.css             # Tokens, kh-* design layer, demo styles
│   │   ├── icon.svg                # Node-graph brand mark
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── site/                   # Header, hero, systems, service, solutions,
│   │   │                           # control, leverage, governance, demos, pilot, footer
│   │   ├── demos/                  # Scene engine + four scenario bundles
│   │   ├── ui/                     # Badge, button, input used by the demos
│   │   ├── constellation-background.tsx
│   │   └── icons/channel.tsx
│   ├── config/site.ts
│   ├── i18n/                       # Locale config, dictionary loader, en/es copy
│   ├── lib/{seo,utils}.ts
│   └── proxy.ts                    # Locale detection and persistence
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js >= 20.9.0
- pnpm >= 10.0.0

### Installation

```bash
git clone https://github.com/JORDANROBERTO74/nexora-ai.git
cd nexora-ai
pnpm install
```

### Development

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000). The root redirects to `/en` or `/es` based on the request.

### Quality Checks

```bash
pnpm typecheck   # TypeScript, no emit
pnpm lint        # ESLint flat config
pnpm build       # Production build
```

## Deployment

The site is deployed on Vercel with the default Next.js preset. Import the repository, or run:

```bash
vercel deploy --prod
```

Set `NEXT_PUBLIC_SITE_URL` when serving from a custom domain; otherwise the canonical URL falls back to `https://nexora-ai.vercel.app`.

## Performance & SEO

- `/en` and `/es` are statically generated; the locale redirect runs in edge middleware.
- The four demos only start when they intersect the viewport and pause when they leave, so a long page does not decode four scene timelines at once.
- The constellation canvas pauses its animation loop when the hero scrolls out of view and honours `prefers-reduced-motion`.
- `sitemap.xml` and `robots.txt` follow the locale configuration; OpenGraph cards are generated from the same dictionaries as the page.
- Inter is self-hosted through `next/font` with automatic size-adjust metrics, so there is no font-driven layout shift.

## Accessibility

- Semantic landmarks and a single `h1`; each section is headed in order.
- Mobile navigation exposes `aria-expanded` / `aria-controls`, closes on `Escape`, and marks the active locale with `aria-current`.
- Every demo panel has a labelled region; decorative canvas and glyphs are `aria-hidden`.
- Reduced motion is honoured at three levels: CSS keyframes, the canvas loop and the scene engine.
- Text meets WCAG AA on the navy and paper surfaces.

## Compliance & Licensing

This project was rebuilt under clean-room principles:

- No third-party trademarks, logos, stock photography or celebrity likenesses. The Slack mark, its palette and the Zendesk/Snowflake references were removed.
- All copy and the Spanish translation are original to this project.
- No photography is used at all: every visual is CSS, SVG or an icon.
- The full audit trail lives in [`docs/provenance.md`](docs/provenance.md).

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
