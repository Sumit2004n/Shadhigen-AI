import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/mock-data";

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-amber-200/60 bg-[#fdf3e3]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
            <Sparkles className="h-3.5 w-3.5" /> Get in touch
          </span>
          <h2 className="font-serif mt-4 text-2xl font-bold text-stone-900 sm:text-3xl">
            Contact the ShaadiGen team
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-stone-500">
            Reach a teammate directly for vendor deals, AI studio help, or guest
            portal questions.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <li
              key={member.id}
              className="rounded-2xl border border-amber-200/80 bg-white/70 p-5 shadow-sm"
            >
              <p className="text-base font-bold text-stone-900">{member.name}</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                {member.role}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                <li>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-start gap-2 transition-colors hover:text-stone-900"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <span>{member.email}</span>
                  </a>
                </li>
                <li className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>{member.address}</span>
                </li>
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-stone-500">
          💍 ShaadiGen AI — Reimagining the Indian Wedding Industry with
          Multimodal Generative AI. Prototype build, all data is simulated.
        </p>
      </div>
    </footer>
  );
}
