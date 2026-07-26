"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Heart,
  Loader2,
  MapPin,
  MessageCircle,
  Mic2,
  Music,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import type { AIInviteCard, CustomSong } from "@/types/wedding";
import { useToast } from "@/components/toast";
import { cn } from "@/lib/utils";

const GENRES = [
  { id: "arijit", name: "Arijit-style Acoustic", emoji: "🎸" },
  { id: "bollypop", name: "Romantic Bolly-Pop", emoji: "🎤" },
  { id: "sufi", name: "Soulful Sufi Fusion", emoji: "🪕" },
];

const SONG_DURATION = 30; // seconds (mock)
const BAR_HEIGHTS = [40, 70, 55, 90, 65, 80, 45, 95, 60, 75, 50, 85, 42, 68, 88, 58, 72, 47, 92, 63];

const THEME_COLORS = [
  { id: "gold", name: "Royal Gold", card: "from-amber-100 via-yellow-50 to-amber-200 border-amber-400", text: "text-amber-900", accent: "text-amber-700" },
  { id: "emerald", name: "Mehendi Emerald", card: "from-emerald-100 via-teal-50 to-emerald-200 border-emerald-400", text: "text-emerald-950", accent: "text-emerald-700" },
  { id: "rose", name: "Gulaab Rose", card: "from-rose-100 via-pink-50 to-rose-200 border-rose-400", text: "text-rose-950", accent: "text-rose-700" },
];

function buildLyrics(names: string, genre: string, story: string): string[] {
  const [a = "Aarav", b = "Meera"] = names.split(/\s*&\s*|\s+and\s+/i);
  const storyLine = story.trim()
    ? `From "${story.trim().slice(0, 42)}${story.trim().length > 42 ? "…" : ""}" to forever`
    : "From strangers to soulmates, written in the stars";
  return [
    `🎵 (Soft ${genre.toLowerCase()} intro…)`,
    `${a.trim()}, the moment I saw you, time stood still,`,
    `${b.trim()}, your smile lit up a thousand diyas…`,
    storyLine + ",",
    "Haath thaam ke chalenge, saat janmon tak,",
    `${a.trim()} & ${b.trim()} — do dil, ek kahaani…`,
    "🎵 (Strings swell… tabla joins… chorus rises)",
    "Teri meri yeh shaadi, likhi thi aasmaanon mein ✨",
  ];
}

export default function MediaSuitePage() {
  const toast = useToast();

  // ── Song generator state ──
  const [songNames, setSongNames] = useState("Aarav & Meera");
  const [story, setStory] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [songLoading, setSongLoading] = useState(false);
  const [song, setSong] = useState<CustomSong | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Invite card state ──
  const [inviteNames, setInviteNames] = useState("Aarav & Meera");
  const [inviteDate, setInviteDate] = useState("Sunday, 22 November 2026");
  const [inviteVenue, setInviteVenue] = useState("Lotus Mandap, ITC Maurya, New Delhi");
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= SONG_DURATION) {
            setPlaying(false);
            return 0;
          }
          return p + 0.25;
        });
      }, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  function generateSong() {
    if (!songNames.trim()) {
      toast("Enter the couple's names to compose their song!", "info");
      return;
    }
    setSongLoading(true);
    setSong(null);
    setPlaying(false);
    setProgress(0);
    setTimeout(() => {
      setSongLoading(false);
      setSong({
        id: `song-${Date.now()}`,
        title: `Teri Meri Shaadi (${songNames.trim()}'s Anthem)`,
        coupleNames: songNames.trim(),
        genre: genre.name,
        audioUrl: "mock://shaadigen/love-song.mp3",
        lyrics: buildLyrics(songNames, genre.name, story),
      });
      toast("Song Generated! Press play to preview 🎶", "ai");
    }, 2500);
  }

  const activeLyric = song
    ? Math.min(
        Math.floor((progress / SONG_DURATION) * song.lyrics.length),
        song.lyrics.length - 1,
      )
    : 0;

  const inviteCard: AIInviteCard = {
    id: "invite-1",
    coupleNames: inviteNames || "Your Names",
    eventDate: inviteDate || "Date TBD",
    venue: inviteVenue || "Venue TBD",
    themeColor: themeColor.id,
    personalizedAudioGreeting: "mock://shaadigen/greeting.mp3",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <section className="mt-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
          <Sparkles className="h-3.5 w-3.5" /> Module 04
        </span>
        <h1 className="font-serif mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
          🎵 AI Media Suite
        </h1>
        <p className="mt-2 max-w-2xl text-stone-500">
          Compose a custom love song from your story and design a living
          invitation card — shareable in one tap.
        </p>
      </section>

      {/* ── Love Song Generator ── */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
            <Mic2 className="h-5 w-5 text-rose-500" /> AI Love Song Generator
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="song-names" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Couple Names
              </label>
              <input
                id="song-names"
                type="text"
                value={songNames}
                onChange={(e) => setSongNames(e.target.value)}
                placeholder="e.g. Aarav & Meera"
                className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
              />
            </div>
            <div>
              <label htmlFor="song-story" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Your Love Story (prompt)
              </label>
              <textarea
                id="song-story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={3}
                placeholder="We met over chai at a Delhi book fair, argued about Ghalib, and never stopped talking…"
                className="mt-1.5 w-full resize-none rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Music Genre
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGenre(g)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                      genre.id === g.id
                        ? "bg-rose-600 text-white shadow"
                        : "border border-stone-300 bg-white text-stone-600 hover:border-rose-400",
                    )}
                  >
                    {g.emoji} {g.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={generateSong}
              disabled={songLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 px-4 py-3 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {songLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Composing
                  melody, mixing vocals…
                </>
              ) : (
                <>
                  <Music className="h-4 w-4" /> Generate Our Love Song
                </>
              )}
            </button>
          </div>
        </div>

        {/* Player */}
        <div className="flex flex-col rounded-2xl border border-stone-200 bg-stone-950 p-6 shadow-sm">
          {!song ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="text-5xl">🎧</span>
              <p className="text-sm font-semibold text-stone-300">
                Your custom track will appear here
              </p>
              <p className="max-w-xs text-xs text-stone-500">
                {songLoading
                  ? "AI is arranging strings, tabla and vocals for your story…"
                  : "Fill the form and hit Generate — takes ~3 seconds."}
              </p>
              {songLoading && (
                <Loader2 className="mt-2 h-8 w-8 animate-spin text-rose-400" />
              )}
            </div>
          ) : (
            <div className="animate-fade-up flex flex-1 flex-col">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-3xl shadow-lg">
                  💞
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-white">
                    {song.title}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {song.genre} · Generated for {song.coupleNames}
                  </p>
                </div>
              </div>

              {/* Visualizer */}
              <div className="mt-6 flex h-16 items-end justify-center gap-1">
                {BAR_HEIGHTS.map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-2 rounded-full bg-gradient-to-t from-rose-500 to-amber-400 transition-all duration-300",
                      playing && "eq-bar",
                    )}
                    style={{
                      height: playing ? `${h}%` : "18%",
                      animationDelay: `${i * 0.07}s`,
                    }}
                  />
                ))}
              </div>

              {/* Progress + controls */}
              <div className="mt-5">
                <div className="h-1.5 overflow-hidden rounded-full bg-stone-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all"
                    style={{ width: `${(progress / SONG_DURATION) * 100}%` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] font-medium text-stone-500">
                  <span>
                    0:{String(Math.floor(progress)).padStart(2, "0")}
                  </span>
                  <span>0:{SONG_DURATION}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg transition-all hover:scale-105"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="h-6 w-6 fill-white" />
                  ) : (
                    <Play className="ml-0.5 h-6 w-6 fill-white" />
                  )}
                </button>
              </div>

              {/* Lyrics */}
              <div className="mt-5 max-h-40 space-y-1 overflow-y-auto rounded-xl bg-stone-900 p-4">
                {song.lyrics.map((line, i) => (
                  <p
                    key={i}
                    className={cn(
                      "text-xs leading-relaxed transition-all duration-300",
                      playing && i === activeLyric
                        ? "scale-[1.02] font-bold text-amber-300"
                        : "text-stone-400",
                    )}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Invitation Card Studio ── */}
      <section className="mt-10 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
          <Heart className="h-5 w-5 text-rose-500" /> AI Invitation Card Studio
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          The card updates live as you type. Includes a personalized AI voice
          greeting for every guest.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Editor */}
          <div className="space-y-4">
            <div>
              <label htmlFor="inv-names" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Couple Names
              </label>
              <input
                id="inv-names"
                type="text"
                value={inviteNames}
                onChange={(e) => setInviteNames(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label htmlFor="inv-date" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Event Date
              </label>
              <input
                id="inv-date"
                type="text"
                value={inviteDate}
                onChange={(e) => setInviteDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label htmlFor="inv-venue" className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Venue
              </label>
              <input
                id="inv-venue"
                type="text"
                value={inviteVenue}
                onChange={(e) => setInviteVenue(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Theme Color
              </p>
              <div className="mt-1.5 flex gap-2">
                {THEME_COLORS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeColor(t)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-xs font-semibold transition-all",
                      themeColor.id === t.id
                        ? "bg-stone-900 text-amber-50 shadow"
                        : "border border-stone-300 bg-white text-stone-600 hover:border-amber-400",
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                toast(
                  `Invite for ${inviteCard.coupleNames} exported to WhatsApp with AI voice greeting! 📲`,
                  "success",
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              <MessageCircle className="h-4 w-4" /> Export to WhatsApp
            </button>
          </div>

          {/* Live preview */}
          <div className="flex items-center justify-center">
            <div
              className={`w-full max-w-sm rounded-3xl border-2 bg-gradient-to-br p-8 text-center shadow-xl transition-all duration-500 ${themeColor.card}`}
            >
              <p className={`text-xs uppercase tracking-[0.3em] ${themeColor.accent}`}>
                ॥ शुभ विवाह ॥
              </p>
              <p className="mt-4 text-4xl">💍</p>
              <h3 className={`font-serif mt-3 break-words text-3xl font-bold ${themeColor.text}`}>
                {inviteCard.coupleNames}
              </h3>
              <p className={`mt-2 text-sm font-medium ${themeColor.accent}`}>
                joyfully invite you to their wedding
              </p>
              <div className={`mt-5 space-y-1.5 text-sm font-semibold ${themeColor.text}`}>
                <p className="flex items-center justify-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {inviteCard.eventDate}
                </p>
                <p className="flex items-center justify-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {inviteCard.venue}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  toast("Playing AI voice greeting: “Namaste! You're invited…” 🔊", "ai")
                }
                className={`mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all hover:scale-105 ${themeColor.accent} border-current`}
              >
                <Play className="h-3.5 w-3.5" /> Personalized Audio Greeting
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
