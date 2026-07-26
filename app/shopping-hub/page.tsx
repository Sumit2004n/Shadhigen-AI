"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Navigation,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { SHOPPING_GUIDE } from "@/lib/mock-data";
import type { PriceBucket } from "@/types/wedding";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const BUCKETS: { key: PriceBucket | "All"; label: string }[] = [
  { key: "All", label: "All Budgets" },
  { key: "Budget (₹20k-50k)", label: "Budget (₹20k–50k)" },
  { key: "Mid-Range (₹50k-1.5L)", label: "Mid-Range (₹50k–1.5L)" },
  { key: "Luxury (₹1.5L+)", label: "Luxury (₹1.5L+)" },
];

const GRADIENTS: Record<string, string> = {
  "gradient:amber": "from-amber-400 via-orange-300 to-yellow-200",
  "gradient:rose": "from-rose-400 via-pink-300 to-rose-200",
  "gradient:emerald": "from-emerald-500 via-teal-300 to-emerald-200",
  "gradient:gold": "from-yellow-500 via-amber-300 to-orange-200",
};

export default function ShoppingHubPage() {
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [bucket, setBucket] = useState<PriceBucket | "All">("All");
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOPPING_GUIDE.filter((s) => {
      const bucketOk = bucket === "All" || s.priceBucket === bucket;
      const queryOk =
        !q ||
        s.shopName.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q) ||
        s.hubLocation.toLowerCase().includes(q);
      return bucketOk && queryOk;
    });
  }, [query, bucket]);

  function bookEscort(id: string, shopName: string) {
    setBookedIds((prev) => [...prev, id]);
    toast(
      `Store escort booked for ${shopName}! Your local shopping guide will WhatsApp you shortly.`,
      "success",
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <section className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-800">
          <Sparkles className="h-3.5 w-3.5" /> Module 02
        </span>
        <h1 className="font-serif mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
          🛍️ Local Shopping Discovery
        </h1>
        <p className="mt-2 max-w-2xl text-stone-500">
          AI-curated hyperlocal shopping trails with verified addresses, honest
          price buckets and on-ground store escorts.
        </p>
      </section>

      {/* Featured guide banner */}
      <section className="mt-8 overflow-hidden rounded-3xl border border-rose-200 bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Newspaper className="h-6 w-6 text-rose-600" />
          <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Featured Guide
          </span>
        </div>
        <h2 className="font-serif mt-3 text-2xl font-bold text-stone-900 sm:text-3xl">
          Top 10 Chandni Chowk Lehenga Shops
          <span className="text-rose-600"> (2026 Discovery Guide)</span>
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-600">
          Old Delhi&apos;s legendary bridal bazaar, decoded by AI — from
          century-old Banarasi silk houses in Kucha Mahajani to
          Instagram-famous pastel organza ateliers in Katra Babel. Every shop
          below is geo-verified with real addresses, crowd-sourced ratings and
          bargaining intel.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-600">
          <span className="rounded-full bg-white px-3 py-1 shadow-sm">
            📍 Dariba Kalan
          </span>
          <span className="rounded-full bg-white px-3 py-1 shadow-sm">
            📍 Kinari Bazar
          </span>
          <span className="rounded-full bg-white px-3 py-1 shadow-sm">
            📍 Katra Neel
          </span>
          <span className="rounded-full bg-white px-3 py-1 shadow-sm">
            📍 Kucha Mahajani
          </span>
        </div>
      </section>

      {/* Search + filters */}
      <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shops, specialties (e.g. Zardozi, Organza)…"
            className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-800 shadow-sm outline-none transition-all placeholder:text-stone-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {BUCKETS.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setBucket(b.key)}
              className={cn(
                "rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                bucket === b.key
                  ? "bg-stone-900 text-amber-50 shadow"
                  : "border border-stone-300 bg-white text-stone-600 hover:border-rose-400",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {/* Shop cards */}
      <section className="mt-6 grid gap-5 md:grid-cols-2">
        {filtered.map((s, i) => {
          const booked = bookedIds.includes(s.id);
          return (
            <article
              key={s.id}
              className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:flex-row"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className={`flex min-h-32 items-center justify-center bg-gradient-to-br text-5xl sm:w-36 sm:shrink-0 ${GRADIENTS[s.image] ?? GRADIENTS["gradient:rose"]}`}
              >
                👗
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {s.shopName}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-stone-500">
                      <MapPin className="h-3.5 w-3.5" /> {s.hubLocation}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    {s.rating}
                  </span>
                </div>
                <span className="mt-2 w-fit rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  {s.priceBucket}
                </span>
                <p className="mt-2 text-sm font-medium text-stone-700">
                  ✨ {s.specialty}
                </p>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-500">
                  &ldquo;{s.featuredArticleSnippet}&rdquo;
                </p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-stone-500">
                  <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                  {s.address}
                </p>
                <button
                  type="button"
                  disabled={booked}
                  onClick={() => bookEscort(s.id, s.shopName)}
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all",
                    booked
                      ? "cursor-default bg-emerald-100 text-emerald-800"
                      : "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  <ShieldCheck className="h-4 w-4" />
                  {booked ? "Escort Booked ✓" : "Book Store Escort"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-4xl">🔎</p>
          <p className="mt-3 font-semibold text-stone-700">
            No shops match your search.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Try &ldquo;Zardozi&rdquo;, &ldquo;Organza&rdquo; or clear the
            budget filter.
          </p>
        </div>
      )}
    </div>
  );
}
