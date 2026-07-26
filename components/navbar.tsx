"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Wallet, X } from "lucide-react";
import { useBudget } from "@/components/budget-context";
import { cn, formatINR } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/vendors", label: "Vendors" },
  { href: "/shopping-hub", label: "Shopping Hub" },
  { href: "/ai-studio", label: "AI Studio" },
  { href: "/media-suite", label: "Media Suite" },
  { href: "/guest-hub", label: "Guest Hub" },
];

export function Navbar() {
  const pathname = usePathname();
  const { budget } = useBudget();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/60 bg-[#fffaf3]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-900"
        >
          <span className="text-2xl" aria-hidden>
            💍
          </span>
          <span>
            ShaadiGen{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-stone-900 text-amber-50"
                  : "text-stone-600 hover:bg-amber-100 hover:text-stone-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800"
            title="Your working wedding budget"
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Budget:</span>
            <span>{formatINR(budget)}</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-stone-700 transition-colors hover:bg-amber-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-amber-200/60 bg-[#fffaf3] px-4 pb-4 pt-2 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-stone-900 text-amber-50"
                  : "text-stone-700 hover:bg-amber-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
