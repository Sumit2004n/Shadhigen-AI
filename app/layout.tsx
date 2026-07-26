import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { BudgetProvider } from "@/components/budget-context";
import { ToastProvider } from "@/components/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShaadiGen AI — Reimagining Indian Weddings",
  description:
    "A Generative AI-powered platform for planning Indian weddings: vendor matchmaking, shopping discovery, AI visual studio, custom songs, invites and guest experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <BudgetProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <footer className="border-t border-amber-200/60 bg-[#fdf3e3] py-8">
              <div className="mx-auto max-w-7xl px-4 text-center text-sm text-stone-500 sm:px-6">
                💍 ShaadiGen AI — Reimagining the Indian Wedding Industry with
                Multimodal Generative AI. Prototype build, all data is
                simulated.
              </div>
            </footer>
          </ToastProvider>
        </BudgetProvider>
      </body>
    </html>
  );
}
