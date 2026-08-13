import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ContactFooter } from "@/components/contact-footer";
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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <BudgetProvider>
          <ToastProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <ContactFooter />
          </ToastProvider>
        </BudgetProvider>
      </body>
    </html>
  );
}
