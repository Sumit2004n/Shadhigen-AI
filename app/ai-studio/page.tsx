"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Check,
  Download,
  Loader2,
  Shirt,
  Sparkles,
  Sun,
  Wand2,
} from "lucide-react";
import type { PreWeddingShoot } from "@/types/wedding";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const OUTFITS = [
  {
    id: "lehenga",
    name: "Red Velvet Sabyasachi Lehenga",
    emoji: "👰",
    swatch: "from-red-600 via-rose-500 to-red-800",
    note: "Hand-embroidered zardozi, 9m flare",
  },
  {
    id: "jewelry",
    name: "Temple Jewelry Set",
    emoji: "💎",
    swatch: "from-amber-400 via-yellow-300 to-amber-600",
    note: "Antique gold, Nakshi kasu haram",
  },
  {
    id: "sherwani",
    name: "Royal Ivory Sherwani",
    emoji: "🤵",
    swatch: "from-stone-200 via-amber-100 to-stone-300",
    note: "Chikankari with emerald brooch",
  },
];

const LIGHTING = [
  {
    id: "sunset",
    name: "Sunset Golden Hour",
    icon: "🌅",
    overlay: "bg-gradient-to-t from-orange-500/50 via-amber-300/25 to-transparent",
    ambience: "from-amber-200 to-orange-100",
  },
  {
    id: "stage",
    name: "Stage Spotlights",
    icon: "🎤",
    overlay: "bg-gradient-to-b from-fuchsia-500/40 via-transparent to-blue-500/30",
    ambience: "from-purple-200 to-fuchsia-100",
  },
  {
    id: "mandap",
    name: "Night Mandap",
    icon: "🪔",
    overlay: "bg-gradient-to-t from-indigo-900/60 via-amber-500/20 to-indigo-950/40",
    ambience: "from-indigo-200 to-slate-200",
  },
];

const THEMES = [
  {
    id: "udaipur",
    name: "Udaipur Palace",
    emoji: "🏰",
    palette: ["from-amber-300 to-rose-400", "from-orange-300 to-amber-500", "from-rose-300 to-red-400", "from-yellow-200 to-orange-400"],
    captions: ["Lake Pichola dusk", "Jharokha silhouettes", "Marble courtyard twirl", "Royal chhatri frame"],
  },
  {
    id: "alps",
    name: "Swiss Alps",
    emoji: "🏔️",
    palette: ["from-sky-300 to-blue-500", "from-slate-200 to-sky-400", "from-cyan-200 to-blue-400", "from-blue-300 to-indigo-400"],
    captions: ["Snowfield embrace", "Alpine meadow run", "Cable-car window kiss", "Glacier golden light"],
  },
  {
    id: "santorini",
    name: "Santorini Sunset",
    emoji: "🌊",
    palette: ["from-blue-400 to-indigo-500", "from-rose-300 to-orange-400", "from-sky-300 to-blue-600", "from-amber-200 to-rose-400"],
    captions: ["Blue-dome backdrop", "Caldera cliff walk", "Oia sunset silhouette", "Whitewashed stairway"],
  },
];

const GENERATION_STEPS = [
  "Extracting facial landmarks…",
  "Matching couple pose library…",
  "Rendering lighting & atmosphere…",
  "Upscaling to 4K & color grading…",
];

export default function AIStudioPage() {
  const toast = useToast();

  // Virtual try-on state
  const [outfit, setOutfit] = useState(OUTFITS[0]);
  const [lighting, setLighting] = useState(LIGHTING[0]);

  // Pre-wedding shoot state
  const [coupleNames, setCoupleNames] = useState("Aarav & Meera");
  const [theme, setTheme] = useState(THEMES[0]);
  const [generating, setGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [shoot, setShoot] = useState<PreWeddingShoot | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function generateShoot() {
    if (!coupleNames.trim()) {
      toast("Please enter the couple's names first!", "info");
      return;
    }
    setGenerating(true);
    setShoot(null);
    setStepIndex(0);

    let step = 0;
    timerRef.current = setInterval(() => {
      step += 1;
      if (step < GENERATION_STEPS.length) {
        setStepIndex(step);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setGenerating(false);
        setShoot({
          id: `shoot-${Date.now()}`,
          coupleNames: coupleNames.trim(),
          theme: theme.name,
          generatedImages: theme.captions,
        });
        toast("4K Pre-Wedding Photoshoot generated! 🎉", "ai");
      }
    }, 750);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <section className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" /> Module 03
        </span>
        <h1 className="font-serif mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
          🎨 AI Visual Studio
        </h1>
        <p className="mt-2 max-w-2xl text-stone-500">
          Try on couture virtually under real event lighting, then generate a
          full destination pre-wedding photoshoot — no travel required.
        </p>
      </section>

      {/* ── Virtual Try-On ─────────────────────────────── */}
      <section className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Shirt className="h-5 w-5 text-rose-500" /> Virtual Try-On &
            Lighting Simulator
          </h2>

          {/* Avatar preview */}
          <div
            className={`relative mt-4 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b transition-all duration-500 ${lighting.ambience}`}
          >
            {/* Outfit layer */}
            <div
              className={`flex h-52 w-40 flex-col items-center justify-center rounded-t-full bg-gradient-to-b shadow-2xl transition-all duration-500 sm:h-64 sm:w-48 ${outfit.swatch}`}
            >
              <span className="text-6xl drop-shadow-lg">{outfit.emoji}</span>
              <span className="mt-3 max-w-[85%] text-center text-xs font-bold text-white drop-shadow">
                {outfit.name}
              </span>
            </div>
            {/* Lighting overlay */}
            <div
              className={`pointer-events-none absolute inset-0 transition-all duration-700 ${lighting.overlay}`}
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {lighting.icon} {lighting.name}
            </span>
            <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-700">
              Live Preview
            </span>
          </div>
          <p className="mt-3 text-xs text-stone-500">✨ {outfit.note}</p>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">
              Select Outfit Style
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {OUTFITS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setOutfit(o);
                    toast(`Draped: ${o.name}`, "info");
                  }}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-all hover:-translate-y-0.5",
                    outfit.id === o.id
                      ? "border-rose-500 bg-rose-50 shadow-md"
                      : "border-stone-200 bg-white hover:border-rose-300",
                  )}
                >
                  <div
                    className={`h-10 w-full rounded-lg bg-gradient-to-r ${o.swatch}`}
                  />
                  <p className="mt-2 text-xs font-bold text-stone-800">
                    {o.emoji} {o.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-500">
              <Sun className="h-4 w-4" /> Lighting Mode
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {LIGHTING.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLighting(l)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5",
                    lighting.id === l.id
                      ? "border-amber-500 bg-amber-50 text-stone-900 shadow-md"
                      : "border-stone-200 bg-white text-stone-600 hover:border-amber-300",
                  )}
                >
                  <span className="text-xl">{l.icon}</span> {l.name}
                  {lighting.id === l.id && (
                    <Check className="ml-auto h-4 w-4 text-amber-600" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-stone-50 p-3 text-xs leading-relaxed text-stone-500">
              💡 The simulator re-lights the fabric in real time so you can see
              how your outfit photographs at each event — golden-hour haldi,
              spotlight sangeet or a diya-lit night mandap.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pre-Wedding Shoot Generator ────────────────── */}
      <section className="mt-10 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
          <Camera className="h-5 w-5 text-emerald-600" /> AI Pre-Wedding Shoot
          Generator
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Upload two selfies (simulated) and teleport to a dream destination.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <label
              htmlFor="couple-names"
              className="text-xs font-bold uppercase tracking-wider text-stone-500"
            >
              Couple Names
            </label>
            <input
              id="couple-names"
              type="text"
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              placeholder="e.g. Aarav & Meera"
              className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="button"
              onClick={generateShoot}
              disabled={generating}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-3 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="h-4 w-4" />
              )}
              {generating ? "Generating…" : "Generate 4K Pre-Wedding Photoshoot"}
            </button>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Theme
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-all hover:-translate-y-0.5",
                    theme.id === t.id
                      ? "border-emerald-500 bg-white shadow-md"
                      : "border-stone-200 bg-white/60 hover:border-emerald-300",
                  )}
                >
                  <div
                    className={`flex h-14 items-center justify-center rounded-lg bg-gradient-to-br text-2xl ${t.palette[0]}`}
                  >
                    {t.emoji}
                  </div>
                  <p className="mt-2 text-xs font-bold text-stone-800">
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loader */}
        {generating && (
          <div className="animate-fade-up mt-6 rounded-2xl border border-emerald-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              <p className="text-sm font-bold text-stone-800">
                {GENERATION_STEPS[stepIndex]}
              </p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-700"
                style={{
                  width: `${((stepIndex + 1) / GENERATION_STEPS.length) * 100}%`,
                }}
              />
            </div>
            <ul className="mt-4 space-y-1.5">
              {GENERATION_STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    i < stepIndex
                      ? "text-emerald-700"
                      : i === stepIndex
                        ? "font-semibold text-stone-800"
                        : "text-stone-400",
                  )}
                >
                  {i < stepIndex ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <span className="inline-block h-3.5 w-3.5 rounded-full border border-stone-300" />
                  )}
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Generated gallery */}
        {shoot && !generating && (
          <div className="animate-fade-up mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-stone-900">
                📸 {shoot.coupleNames} · {shoot.theme} — 4 Concept Portraits
              </h3>
              <button
                type="button"
                onClick={() => toast("4K album exported to your gallery!", "success")}
                className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-stone-700 transition-all hover:border-emerald-400 hover:text-emerald-700"
              >
                <Download className="h-3.5 w-3.5" /> Export 4K Album
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {theme.palette.map((grad, i) => (
                <figure
                  key={grad + i}
                  className="animate-fade-up group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div
                    className={`relative flex aspect-[3/4] items-center justify-center bg-gradient-to-br ${grad}`}
                  >
                    <span className="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {theme.emoji}
                    </span>
                    <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      4K · AI
                    </span>
                    <div className="animate-shimmer pointer-events-none absolute inset-0" />
                  </div>
                  <figcaption className="p-3 text-xs font-semibold text-stone-700">
                    {theme.captions[i]}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
