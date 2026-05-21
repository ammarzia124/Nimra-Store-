"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenShown) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > 50) {
        setIsOpen(true);
        setHasBeenShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBeenShown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white p-16 overflow-hidden shadow-2xl"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center text-black">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent mb-6 block">
                Exclusive Invitation
              </span>
              <h2 className="text-5xl font-editorial font-bold italic tracking-tighter mb-6 leading-none">
                Join the <br /> Flagship Matrix
              </h2>
              <p className="text-sm text-black/50 mb-12 max-w-xs mx-auto leading-relaxed uppercase tracking-widest">
                Unlock early access to modular system drops and architectural intel.
              </p>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  required
                  className="w-full border-b border-black/20 py-4 text-center text-[10px] uppercase tracking-[0.2em] focus:outline-none focus:border-accent transition-colors bg-transparent text-black"
                />
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all active:scale-95"
                >
                  Authorize Entry
                </button>
              </form>
            </div>
            
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
