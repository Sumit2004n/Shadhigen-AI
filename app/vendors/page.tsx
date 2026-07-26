"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Bot,
  Gift,
  Loader2,
  MapPin,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { VENDORS } from "@/lib/mock-data";
import type { Vendor, VendorCategory } from "@/types/wedding";
import { useBudget } from "@/components/budget-context";
import { useToast } from "@/components/toast";
import { cn, formatINR } from "@/lib/utils";

const CATEGORIES: VendorCategory[] = [
  "Photographer",
  "Decorator",
  "Caterer",
  "Makeup Artist",
];

const CATEGORY_LABELS: Record<string, string> = {
  Photographer: "📸 Photographers",
  Decorator: "🌸 Decorators",
  Caterer: "🍽️ Caterers",
  "Makeup Artist": "💄 Makeup Artists",
};

/* Share of the total budget typically allocated to each category —
   used to decide which vendors are affordable at the current budget. */
const CATEGORY_BUDGET_SHARE: Record<string, number> = {
  Photographer: 0.1,
  Decorator: 0.15,
  Caterer: 0.25,
  "Makeup Artist": 0.05,
};

const GRADIENTS: Record<string, string> = {
  "gradient:amber": "from-amber-400 via-orange-300 to-yellow-200",
  "gradient:rose": "from-rose-400 via-pink-300 to-rose-200",
  "gradient:emerald": "from-emerald-500 via-teal-300 to-emerald-200",
  "gradient:gold": "from-yellow-500 via-amber-300 to-orange-200",
};

function vendorAllocation(vendor: Vendor, budget: number): number {
  // Caterers price per plate; assume 300 guests when comparing.
  const alloc = budget * (CATEGORY_BUDGET_SHARE[vendor.category] ?? 0.1);
  return vendor.category === "Caterer" ? alloc / 300 : alloc;
}

export default function VendorsPage() {
  const { budget, setBudget } = useBudget();
  const toast = useToast();
  const [category, setCategory] = useState<VendorCategory>("Photographer");
  const [negotiating, setNegotiating] = useState<Vendor | null>(null);
  const [negotiationDone, setNegotiationDone] = useState(false);

  const filtered = useMemo(
    () =>
      VENDORS.filter(
        (v) =>
          v.category === category &&
          v.priceRange.min <= vendorAllocation(v, budget),
      ),
    [category, budget],
  );

  function startNegotiation(vendor: Vendor) {
    setNegotiating(vendor);
    setNegotiationDone(false);
    setTimeout(() => {
      setNegotiationDone(true);
      toast(`AI RFP sent to ${vendor.name} — deal locked in!`, "ai");
    }, 2200);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <section className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
          <Sparkles className="h-3.5 w-3.5" /> Module 01
        </span>
        <h1 className="font-serif mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
          🤝 Budget Vendor Matchmaker
        </h1>
        <p className="mt-2 max-w-2xl text-stone-500">
          Move the slider — our AI instantly re-matches verified vendors that
          fit your allocation, complete with pre-negotiated perks.
        </p>
      </section>

      {/* Budget slider */}
      <section className="mt-8 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="budget-slider"
            className="text-sm font-semibold text-stone-700"
          >
            Total Wedding Budget
          </label>
          <span className="rounded-full bg-stone-900 px-4 py-1.5 text-lg font-bold text-amber-300">
            {formatINR(budget)}
          </span>
        </div>
        <input
          id="budget-slider"
          type="range"
          min={500000}
          max={10000000}
          step={100000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="gold-slider mt-4 w-full"
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-stone-400">
          <span>₹5 Lakhs</span>
          <span>₹50L</span>
          <span>₹1 Crore</span>
        </div>
        <p className="mt-3 text-xs text-stone-500">
          {CATEGORY_LABELS[category]} allocation at this budget:{" "}
          <strong className="text-emerald-700">
            {formatINR(budget * (CATEGORY_BUDGET_SHARE[category] ?? 0.1))}
          </strong>
          {category === "Caterer" && " (≈300 guests, per-plate pricing)"}
        </p>
      </section>

      {/* Category tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-all",
              category === c
                ? "bg-stone-900 text-amber-50 shadow-md"
                : "border border-stone-300 bg-white text-stone-600 hover:border-amber-400 hover:text-stone-900",
            )}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Vendor cards */}
      <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v, i) => (
          <article
            key={v.id}
            className="animate-fade-up group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              className={`relative flex h-36 items-end bg-gradient-to-br p-4 ${GRADIENTS[v.imageUrl] ?? GRADIENTS["gradient:amber"]}`}
            >
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified Pricing
              </span>
              <h3 className="text-xl font-bold text-white drop-shadow-md">
                {v.name}
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-stone-500">
                  <MapPin className="h-4 w-4" /> {v.location}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-800">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {v.rating}{" "}
                  <span className="font-normal text-amber-700/70">
                    ({v.reviewsCount})
                  </span>
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-stone-800">
                {formatINR(v.priceRange.min)} – {formatINR(v.priceRange.max)}
                {v.category === "Caterer" && (
                  <span className="font-normal text-stone-500"> / plate</span>
                )}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                <Gift className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong>AI-Negotiated Perk:</strong> {v.negotiatedDeal}
                </span>
              </div>
              <button
                type="button"
                onClick={() => startNegotiation(v)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2.5 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Bot className="h-4 w-4" /> Negotiate Quote via AI
              </button>
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-4xl">🪔</p>
          <p className="mt-3 font-semibold text-stone-700">
            No {CATEGORY_LABELS[category].replace(/^\S+\s/, "")} match this
            allocation yet.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Try raising the budget slider — premium vendors unlock at higher
            allocations.
          </p>
        </div>
      )}

      {/* Negotiation modal */}
      {negotiating && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm"
          onClick={() => setNegotiating(null)}
        >
          <div
            className="animate-fade-up w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-stone-900">
                {negotiationDone ? "✅ Deal Secured!" : "🤖 AI Negotiating…"}
              </h3>
              <button
                type="button"
                onClick={() => setNegotiating(null)}
                className="rounded-lg p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!negotiationDone ? (
              <div className="mt-5 flex flex-col items-center gap-4 py-6">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="text-center text-sm text-stone-600">
                  Sending AI-crafted RFP to{" "}
                  <strong>{negotiating.name}</strong>, benchmarking against 42
                  similar quotes in {negotiating.location.split(",")[1]?.trim() ?? "your city"}
                  …
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">
                    {negotiating.name} accepted your AI counter-offer:
                  </p>
                  <p className="mt-1 text-sm text-emerald-800">
                    🎁 {negotiating.negotiatedDeal}
                  </p>
                  <p className="mt-2 text-xs text-emerald-700">
                    Estimated savings vs. walk-in quote:{" "}
                    <strong>
                      {formatINR(
                        Math.round(negotiating.priceRange.min * 0.12),
                      )}
                    </strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNegotiating(null)}
                  className="w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-bold text-amber-50 transition-all hover:bg-stone-700"
                >
                  Add to My Shortlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
