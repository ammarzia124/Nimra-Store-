"use client";

import React from "react";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const Footer = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (resolvedTheme || theme) : "light";
  const isDark = currentTheme === "dark";

  return (
    <footer className="bg-background text-foreground pt-16 pb-6 px-6 md:px-12 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Column 1: CUSTOMER CARE (Span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-border/50 pb-3">Customer Care</h4>
            <ul className="space-y-2.5">
              {["About Us", "Contact Us", "FAQs", "Delivery Policy", "Exchange Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: QUICK LINKS (Span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-border/50 pb-3">Quick Links</h4>
            <ul className="space-y-2.5">
              {["New Arrivals", "Best Sellers", "Shop All", "Reviews", "Lookbook"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT (Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-border/50 pb-3">Connect</h4>
            <div className="flex space-x-3">
              <Link href="#" className="p-2.5 border border-border/50 hover:border-foreground hover:bg-foreground/5 transition-colors"><Instagram className="w-3.5 h-3.5" /></Link>
              <Link href="#" className="p-2.5 border border-border/50 hover:border-foreground hover:bg-foreground/5 transition-colors"><Twitter className="w-3.5 h-3.5" /></Link>
              <Link href="#" className="p-2.5 border border-border/50 hover:border-foreground hover:bg-foreground/5 transition-colors"><Facebook className="w-3.5 h-3.5" /></Link>
            </div>
            <p className="text-[10px] text-foreground/50 uppercase tracking-widest leading-relaxed mt-4">
              Join the Vanguard
            </p>
          </div>

          {/* Column 4: NEWSLETTER (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-border/50 pb-3">Newsletter</h4>
            <p className="text-[11px] text-foreground/60 uppercase tracking-widest leading-relaxed">
              Sign up for exclusive access to new collections and offers.
            </p>
            <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1 group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent border-y border-l border-border/50 px-10 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-foreground placeholder:text-foreground/30 transition-colors"
                />
              </div>
              <button className="bg-foreground text-background px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Brand Logo Section */}
        <div className="flex flex-col items-center py-10 border-t border-border/20">
          <Logo isScrolled={true} theme={isDark ? "dark" : "light"} className="h-12 w-auto opacity-80" />
        </div>

        {/* Bottom Bar inside structured grid */}
        <div className="pt-6 border-t border-border/30 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="hidden md:block">
             {/* Empty spacer for alignment */}
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 text-center">
            © {new Date().getFullYear()} NIMRA ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center justify-center md:justify-end space-x-3 grayscale opacity-60 hover:opacity-100 transition-opacity">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={34} height={22} className="object-contain" />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={34} height={22} className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};
