"use client";

import React from "react";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
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
    <footer className="bg-background text-foreground pt-16 pb-0">
      {/* Structural Container with professional padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        {/* Brand Logo Section */}
        <div className="flex justify-center mb-16">
          <Logo isScrolled={true} theme={isDark ? "dark" : "light"} className="h-14 w-auto opacity-90" />
        </div>

        {/* Clean CSS Grid for perfect 4-column alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: CUSTOMER CARE */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground">Customer Care</h4>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "FAQs", "Delivery Policy", "Exchange Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[12px] text-foreground/60 hover:text-foreground transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Shop All", "Reviews", "Lookbook"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[12px] text-foreground/60 hover:text-foreground transition-colors block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="p-3 border border-border/20 hover:border-foreground/40 hover:bg-foreground/5 rounded-full transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-3 border border-border/20 hover:border-foreground/40 hover:bg-foreground/5 rounded-full transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-3 border border-border/20 hover:border-foreground/40 hover:bg-foreground/5 rounded-full transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-foreground">Newsletter</h4>
            <p className="text-[12px] text-foreground/60 leading-relaxed">
              Sign up for exclusive access to new collections and offers.
            </p>
            {/* Perfectly inline & symmetric height form */}
            <form className="flex mt-2 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full h-12 bg-transparent border border-border/20 border-r-0 px-12 text-[11px] uppercase tracking-widest focus:outline-none focus:border-foreground placeholder:text-foreground/40 transition-colors"
                />
              </div>
              <button className="h-12 bg-foreground text-background px-6 text-[11px] uppercase tracking-widest font-semibold hover:bg-foreground/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar with minimalist subtle background and softened border */}
      <div className="border-t border-border/5 bg-foreground/[0.01]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex space-x-4 text-[10px] text-foreground/50 uppercase tracking-widest">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 text-center">
            © {new Date().getFullYear()} LABEL BY NIMRAH. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center space-x-4 grayscale opacity-50 hover:opacity-100 transition-opacity">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={34} height={22} className="object-contain" />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={34} height={22} className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};
