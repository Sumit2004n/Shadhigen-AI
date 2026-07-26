"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Languages,
  MapPin,
  PartyPopper,
  Play,
  Shirt,
  Sparkles,
  Users,
  Volume2,
} from "lucide-react";
import { EVENTS, RITUAL_EXPLAINERS, type ExplainerLanguage } from "@/lib/mock-data";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const LANGUAGES: ExplainerLanguage[] = ["English", "हिन्दी", "Español", "Français"];

const EVENT_STYLES: Record<string, { emoji: string; accent: string }> = {
  Haldi: { emoji: "💛", accent: "from-yellow-100 to-amber-50 border-amber-300" },
  Mehendi: { emoji: "🌿", accent: "from-emerald-100 to-teal-50 border-emerald-300" },
  Sangeet: { emoji: "💃", accent: "from-rose-100 to-pink-50 border-rose-300" },
  Pheras: { emoji: "🔥", accent: "from-amber-100 to-orange-50 border-orange-300" },
};

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Jain (no onion/garlic)",
  "Vegan",
  "Non-Vegetarian",
  "Gluten-Free",
];

export default function GuestHubPage() {
  const toast = useToast();
  const [language, setLanguage] = useState<ExplainerLanguage>("English");
  const [openExplainers, setOpenExplainers] = useState<string[]>([]);
  const [greetingPlaying, setGreetingPlaying] = useState(false);

  // RSVP state
  const [attending, setAttending] = useState<"yes" | "no" | "maybe" | null>(null);
  const [dietary, setDietary] = useState(DIETARY_OPTIONS[0]);
  const [guestCount, setGuestCount] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  function toggleExplainer(name: string) {
    setOpenExplainers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  }

  function playGreeting() {
    if (greetingPlaying) return;
    setGreetingPlaying(true);
    toast("Playing: “Namaste! Aarav & Meera can't wait to celebrate with you…” 🔊", "ai");
    setTimeout(() => setGreetingPlaying(false), 4000);
  }

  function submitRsvp(e: React.FormEvent) {
    e.preventDefault();
    if (!attending) {
      toast("Please select your attending status first!", "info");
      return;
    }
    setSubmitted(true);
    toast(
      attending === "yes"
        ? `RSVP confirmed for ${guestCount} guest${guestCount > 1 ? "s" : ""}! See you at the shaadi 🎉`
        : "RSVP recorded — you'll be missed! 💌",
      "success",
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <section className="mt-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" /> Module 05 · Guest Portal
        </span>
        <h1 className="font-serif mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
          💒 Join My Wedding
        </h1>
      </section>

      {/* Welcome card */}
      <section className="mt-8 overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-rose-50 to-emerald-50 p-8 text-center shadow-sm">
        <p className="text-5xl">🙏</p>
        <h2 className="font-serif mt-4 text-2xl font-bold text-stone-900 sm:text-3xl">
          Namaste! You&apos;re invited to
          <br />
          <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">
            Aarav & Meera&apos;s Wedding
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-stone-600">
          20–22 November 2026 · New Delhi, India. Three days of colour, music
          and rituals — this portal explains everything, in your language.
        </p>
        <button
          type="button"
          onClick={playGreeting}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-bold text-amber-50 shadow transition-all hover:-translate-y-0.5 hover:bg-stone-700"
        >
          {greetingPlaying ? (
            <>
              <Volume2 className="h-4 w-4 animate-pulse text-amber-300" />
              Playing greeting…
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Play Audio Greeting from the Couple
            </>
          )}
        </button>
        {greetingPlaying && (
          <div className="mt-4 flex h-8 items-end justify-center gap-1">
            {[60, 90, 45, 80, 55, 95, 70, 85, 50, 75].map((h, i) => (
              <span
                key={i}
                className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-amber-500 to-rose-400"
                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Language selector */}
      <section className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-bold text-stone-900 sm:text-2xl">
          📅 Event Schedule & Ritual Guide
        </h2>
        <label className="flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm">
          <Languages className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-stone-500">
            Explainer language:
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as ExplainerLanguage)}
            className="bg-transparent text-sm font-bold text-stone-800 outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* Event cards */}
      <section className="mt-5 space-y-4">
        {EVENTS.map((ev, i) => {
          const style = EVENT_STYLES[ev.name] ?? EVENT_STYLES.Haldi;
          const open = openExplainers.includes(ev.name);
          return (
            <article
              key={ev.id}
              className={`animate-fade-up rounded-2xl border bg-gradient-to-r p-5 shadow-sm transition-all hover:shadow-md sm:p-6 ${style.accent}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{style.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {ev.name}
                    </h3>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {ev.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {ev.time}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleExplainer(ev.name)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-all",
                    open
                      ? "bg-stone-900 text-amber-50 shadow"
                      : "border border-stone-400/50 bg-white/70 text-stone-700 hover:bg-white",
                  )}
                  aria-expanded={open}
                >
                  <Languages className="h-3.5 w-3.5" />
                  Multicultural Explainer
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
                  />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {ev.venue}
                </span>
                <span className="flex items-center gap-1">
                  <Shirt className="h-3.5 w-3.5" /> Dress code: {ev.dressCode}
                </span>
              </div>

              {open && (
                <div className="animate-fade-up mt-4 rounded-xl border border-white/80 bg-white/80 p-4 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {language} · Ritual Meaning
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                    {RITUAL_EXPLAINERS[ev.name]?.[language] ?? ev.culturalMeaning}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* RSVP */}
      <section className="mt-10 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900 sm:text-2xl">
          <PartyPopper className="h-6 w-6 text-rose-500" /> RSVP
        </h2>
        {submitted ? (
          <div className="animate-fade-up mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center">
            <p className="text-5xl">🎊</p>
            <h3 className="mt-3 text-lg font-bold text-emerald-900">
              Shukriya! Your RSVP is in.
            </h3>
            <p className="mt-1 text-sm text-emerald-800">
              {attending === "yes"
                ? `${guestCount} guest${guestCount > 1 ? "s" : ""} · ${dietary} meals reserved. Watch WhatsApp for your personalized itinerary!`
                : "We've let the couple know. You'll still receive the highlights album!"}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 rounded-full border border-emerald-400 px-4 py-2 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100"
            >
              Edit my RSVP
            </button>
          </div>
        ) : (
          <form onSubmit={submitRsvp} className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Will you be attending?
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {(
                  [
                    { key: "yes", label: "🎉 Joyfully Accept", ring: "border-emerald-500 bg-emerald-50 text-emerald-900" },
                    { key: "maybe", label: "🤔 Might Attend", ring: "border-amber-500 bg-amber-50 text-amber-900" },
                    { key: "no", label: "💌 Regretfully Decline", ring: "border-rose-500 bg-rose-50 text-rose-900" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setAttending(opt.key)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5",
                      attending === opt.key
                        ? `${opt.ring} shadow-md`
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-400",
                    )}
                  >
                    {opt.label}
                    {attending === opt.key && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dietary" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Dietary Preference
                </label>
                <select
                  id="dietary"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                >
                  {DIETARY_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="guest-count" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Number of Guests
                </label>
                <div className="mt-1.5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                    className="h-10 w-10 rounded-xl border border-stone-300 text-lg font-bold text-stone-700 transition-all hover:border-emerald-400 hover:bg-emerald-50"
                    aria-label="Decrease guest count"
                  >
                    −
                  </button>
                  <span
                    id="guest-count"
                    className="flex h-10 min-w-16 items-center justify-center rounded-xl bg-stone-100 px-4 text-sm font-bold text-stone-900"
                  >
                    <Users className="mr-1.5 h-4 w-4 text-stone-500" />
                    {guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((c) => Math.min(10, c + 1))}
                    className="h-10 w-10 rounded-xl border border-stone-300 text-lg font-bold text-stone-700 transition-all hover:border-emerald-400 hover:bg-emerald-50"
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-500 px-4 py-3 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <PartyPopper className="h-4 w-4" /> Submit RSVP
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
