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

export const Footer = () => {
  return (
    <footer className="bg-white text-black pt-20 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: CUSTOMER CARE */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-gray-100 pb-2">Customer Care</h4>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "FAQs", "Delivery Policy", "Exchange Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-gray-100 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Shop All", "Reviews", "Lookbook"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: CONNECT */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-gray-100 pb-2">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 border border-gray-100 hover:border-black transition-colors"><Instagram className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 border border-gray-100 hover:border-black transition-colors"><Twitter className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 border border-gray-100 hover:border-black transition-colors"><Facebook className="w-4 h-4" /></Link>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
              Follow us for the latest drops and styling tips.
            </p>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold border-b border-gray-100 pb-2">Newsletter</h4>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed">
              Sign up for exclusive access to new collections and offers.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border border-gray-200 px-4 py-3 text-[10px] uppercase tracking-widest focus:outline-none focus:border-black"
              />
              <button className="w-full bg-black text-white py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Brand Logo Section */}
        <div className="flex flex-col items-center py-12 border-t border-gray-50">
          <h2 className="text-6xl md:text-8xl font-editorial tracking-tighter mb-4 italic">Zane</h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Premium Clothing Collective</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
            © 2026 ZANE ALL RIGHTS RESERVED.
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
