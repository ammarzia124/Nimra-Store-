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
    <footer className="bg-background text-foreground pt-20 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: CUSTOMER CARE */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-border pb-2">Customer Care</h4>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "FAQs", "Delivery Policy", "Exchange Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-border pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Shop All", "Reviews", "Lookbook"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-border pb-2">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 border border-border hover:border-foreground transition-colors"><Instagram className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 border border-border hover:border-foreground transition-colors"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 border border-border hover:border-foreground transition-colors"><Facebook className="w-4 h-4" /></Link>
            </div>
            <p className="text-[10px] text-foreground/40 uppercase tracking-widest leading-relaxed">
              Follow us for the latest drops and styling tips.
            </p>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-border pb-2">Newsletter</h4>
            <p className="text-[11px] text-foreground/60 uppercase tracking-widest leading-relaxed">
              Sign up for exclusive access to new collections and offers.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border border-border px-4 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-foreground placeholder:text-foreground/40"
              />
              <button className="w-full bg-foreground text-background py-3 text-[10px] uppercase tracking-widest font-bold hover:opacity-80 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Brand Logo Section */}
        <div className="flex flex-col items-center py-12 border-t border-border/50">
          <Logo isScrolled={true} theme={isDark ? "dark" : "light"} className="h-16 w-auto mb-4" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40">
            © 2026 NIMRA ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-4 grayscale opacity-50">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={30} height={20} />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={30} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};
