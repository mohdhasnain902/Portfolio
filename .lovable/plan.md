# Website Upgrade Rollout Plan

I'll ship this in 5 batches. Batches 1–3 need no accounts/keys and go in immediately. Batches 4–5 need your choices (marked ⚠).

---

## Batch 1 — Content & Trust (no keys)
- **Testimonials section** — new component with 3 placeholder quotes you can edit inline (or send me the real ones after).
- **Case studies / featured projects** — new section on home with 3 project cards (problem → solution → outcome). Placeholder data you replace with real projects.
- **Availability status pill** in hero ("Available for Q3 2026" or similar) — editable one-liner.
- **Certifications with verifiable issuer links** — add `verifyUrl` field to each cert card.
- **GitHub live activity** — embed via `github-readme-stats` (no key needed).

## Batch 2 — Blog UX & SEO (no keys)
- **Reading time** on every post + list.
- **Table of contents** (auto-generated from H2/H3) sticky sidebar on desktop.
- **Related posts** (tag-based, 3 per post) at bottom.
- **RSS feed** at `/rss.xml`, auto-generated from blog data.
- **Auto-generated sitemap** — replace hand-maintained XML with `scripts/generate-sitemap.ts` reading `blogPosts.ts`.

## Batch 3 — Polish & Perf (no keys)
- **Open Graph image** — I'll generate a branded 1200×630 card and wire it in.
- **404 page redesign** matching site aesthetic.
- **Image optimization** — explicit width/height on all `<img>` + `loading="lazy"` + `decoding="async"` audit.
- **PWA manifest** — installable home-screen support (no offline SW, keeps things simple).
- **WhatsApp float button** — bottom-right, links to your number.

## Batch 4 — Integrations ⚠ needs your choice
- **Analytics** — pick one:
  - **Plausible** (privacy-first, paid ~$9/mo, no cookie banner)
  - **GA4** (free, needs cookie consent banner)
  - **Umami cloud** (privacy-first, free tier)
- **Contact form email alerts** via **Resend** connector — I'll connect it; you approve. Auto-emails you on new submissions.
- **Spam protection** — **Cloudflare Turnstile** (free, invisible). You create a site → paste site key + secret.
- **Booking link** — **Cal.com** (free) embedded in hero + services. You share your Cal username.

## Batch 5 — Growth ⚠ needs your choice
- **Newsletter capture** below blog posts + footer. Provider:
  - **Resend Audiences** (simplest if we already have Resend)
  - **Beehiiv** (better if you want to publish a newsletter)
- **i18n** English + Urdu scaffolding (react-i18next). ~4h of translation work you do yourself in JSON files.

---

## Technical notes
- No new heavy deps except `react-i18next` (Batch 5) and possibly `rss` (Batch 2).
- All new sections follow existing glassmorphism + `text-gradient` heading rules.
- All new tables/data use existing Cloud backend.
- Sitemap generator adds `predev`/`prebuild` scripts.
- PWA is manifest-only (no service worker) to avoid preview breakage.

---

## Order of execution
1. Say **"go batch 1"** (or just "go") — I'll ship Batches 1–3 in sequence with no further questions.
2. For Batch 4, answer the 4 choices (analytics / booking username / Turnstile yes-no / Resend yes-no).
3. For Batch 5, answer newsletter provider + i18n yes-no.

Approve to start.