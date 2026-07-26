"use client";

import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  Heart,
  Music,
  Palette,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { BUDGET_ALLOCATION } from "@/lib/mock-data";
import { useBudget } from "@/components/budget-context";
import { formatINR } from "@/lib/utils";

const FEATURES = [
  {
    href: "/vendors",
    emoji: "🤝",
    icon: Handshake,
    title: "Budget Vendor Matchmaker",
    desc: "Slide your budget and let AI shortlist verified photographers, caterers, decorators & MUAs — with pre-negotiated deals.",
    accent: "from-amber-100 to-amber-50 border-amber-200 hover:border-amber-400",
    iconColor: "text-amber-600",
  },
  {
    href: "/shopping-hub",
    emoji: "🛍️",
    icon: ShoppingBag,
    title: "Local Shopping Discovery",
    desc: "Curated Chandni Chowk lehenga guide — Asiana Couture, Om Prakash Jawahar Lal & hidden gems, filtered by your budget.",
    accent: "from-rose-100 to-rose-50 border-rose-200 hover:border-rose-400",
    iconColor: "text-rose-600",
  },
  {
    href: "/ai-studio",
    emoji: "🎨",
    icon: Palette,
    title: "AI Visual Studio",
    desc: "Virtual outfit try-on with lighting simulation, plus a 4K pre-wedding photoshoot generator in dream destinations.",
    accent:
      "from-emerald-100 to-emerald-50 border-emerald-200 hover:border-emerald-400",
    iconColor: "text-emerald-600",
  },
  {
    href: "/media-suite",
    emoji: "🎵",
    icon: Music,
    title: "AI Media Suite",
    desc: "Generate a custom love song from your story and design animated invitation cards — export straight to WhatsApp.",
    accent: "from-amber-100 to-rose-50 border-amber-200 hover:border-rose-400",
    iconColor: "text-amber-700",
  },
  {
    href: "/guest-hub",
    emoji: "💒",
    icon: Users,
    title: '"Join My Wedding" Guest Portal',
    desc: "A shareable guest hub with event schedules, multicultural ritual explainers in 4 languages, and one-tap RSVP.",
    accent:
      "from-emerald-100 to-amber-50 border-emerald-200 hover:border-emerald-400",
    iconColor: "text-emerald-700",
  },
];

export default function DashboardPage() {
  const { budget, setBudget } = useBudget();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      {/* Hero */}
      <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 px-6 py-14 text-center shadow-xl sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
            <Sparkles className="h-3.5 w-3.5" /> Multimodal GenAI · Weddings
          </span>
          <h1 className="font-serif mt-6 text-4xl font-bold leading-tight text-amber-50 sm:text-6xl">
            Reimagining Indian Weddings
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300 bg-clip-text text-transparent">
              with Multimodal AI
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-stone-300 sm:text-lg">
            From budget-matched vendors and Chandni Chowk shopping trails to
            AI-generated pre-wedding shoots, custom love songs and multilingual
            guest experiences — plan your entire shaadi in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/vendors"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-stone-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-amber-400/40"
            >
              Start Planning{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-studio"
              className="inline-flex items-center gap-2 rounded-full border border-stone-500 px-6 py-3 text-sm font-semibold text-stone-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-200"
            >
              <Heart className="h-4 w-4 text-rose-400" /> Try the AI Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mt-14">
        <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
          Five AI modules. One dream wedding.
        </h2>
        <p className="mt-1 text-stone-500">
          Jump into any module — everything stays in sync with your budget.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Link
              key={f.href}
              href={f.href}
              className={`animate-fade-up group rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${f.accent}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{f.emoji}</span>
                <f.icon className={`h-6 w-6 ${f.iconColor}`} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {f.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-800">
                Open module{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          {/* Budget calculator widget */}
          <div className="animate-fade-up rounded-2xl border border-stone-300 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                💰 Live Budget Calculator
              </h3>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                {formatINR(budget)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={100000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="gold-slider mt-4 w-full"
              aria-label="Total wedding budget"
            />
            <div className="mt-1 flex justify-between text-xs text-stone-400">
              <span>₹5L</span>
              <span>₹1 Cr</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {BUDGET_ALLOCATION.map((row) => (
                <li key={row.label}>
                  <div className="flex items-center justify-between text-xs font-medium text-stone-600">
                    <span>
                      {row.emoji} {row.label}
                    </span>
                    <span className="font-bold text-stone-800">
                      {formatINR((budget * row.pct) / 100)}{" "}
                      <span className="font-normal text-stone-400">
                        ({row.pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-300"
                      style={{ width: `${row.pct * 3}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
