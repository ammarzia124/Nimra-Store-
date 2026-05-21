import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CurrencyProvider } from "@/context/CurrencyContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "High-Performa | The High-End Fashion Platform",
  description: "High-Performa is a premium e-commerce platform focused on high-end fashion, technical apparel, and architectural design.",
  icons: {
    icon: "/images/logo-clean.png",
    apple: "/images/logo-clean.png",
  },
};

import { StickyHeader } from "@/components/StickyHeader";
import { Footer } from "@/components/Footer";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { LuxuryLoader } from "@/components/LuxuryLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased relative selection:bg-accent selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CurrencyProvider>
            <LuxuryLoader />
            <div className="flex flex-col min-h-screen">
              <StickyHeader />
              <NewsletterPopup />

              <main className="flex-grow">
                {children}
              </main>

              <Footer />
            </div>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

