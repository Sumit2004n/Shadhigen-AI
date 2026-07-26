# 💍 ShaadiGen AI

A fully interactive MVP web prototype for a Generative AI-powered platform reimagining the Indian Wedding Industry.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **lucide-react**. All AI behaviour (negotiation, image generation, song composition) is simulated client-side with realistic loaders — no backend or API keys required.

## Modules

| Route | Module |
| --- | --- |
| `/` | Landing dashboard with hero, feature cards & live budget calculator |
| `/vendors` | 🤝 Budget Vendor Matchmaker — budget slider (₹5L–₹1Cr), category tabs, AI negotiation modal |
| `/shopping-hub` | 🛍️ Local Shopping Discovery — Top 10 Chandni Chowk lehenga shops guide with search & budget filters |
| `/ai-studio` | 🎨 AI Visual Studio — virtual try-on + lighting simulator, 4K pre-wedding shoot generator |
| `/media-suite` | 🎵 AI Media Suite — love song generator with mock audio player & live invitation card editor |
| `/guest-hub` | 💒 "Join My Wedding" Guest Portal — multilingual ritual explainers & RSVP form |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `types/wedding.ts` — shared domain interfaces (Vendor, ShoppingGuideItem, PreWeddingShoot, CustomSong, AIInviteCard, EventDetail)
- `lib/mock-data.ts` — seed data: vendors, Chandni Chowk shop guides, wedding events, multilingual ritual explainers
- `components/` — navbar, budget context (shared across pages), toast notification system
- `app/` — one route per module
