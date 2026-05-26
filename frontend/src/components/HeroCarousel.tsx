"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "RHEA",
    subtitle: "UNSTITCHED LAWN",
    description: "System Release 2026.01. Precise textile architecture.",
    image: "/images/hero-1.png",
  },
  {
    id: 2,
    title: "MARA",
    subtitle: "READY TO WEAR",
    description: "The modular vanguard of contemporary fashion.",
    image: "/images/hero-2.png",
  },
  {
    id: 3,
    title: "KINETIC",
    subtitle: "PERFORMANCE WEAR",
    description: "Pattern making that moves with the human body.",
    image: "/images/hero-3.png",
  },
  {
    id: 4,
    title: "MODULAR",
    subtitle: "SYSTEM INTEGRITY",
    description: "High-contrast engineering for the modern wardrobe.",
    image: "/images/hero-4.png",
  },
  {
    id: 5,
    title: "ESSENTIALS",
    subtitle: "CORE ARCHITECTURE",
    description: "Foundational pieces redefined through precision.",
    image: "/images/hero-5.png",
  },
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority
            />
            {/* Task 1: Black-to-Transparent Gradient Overlay (Bottom 40%) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Centered Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="space-y-6"
            >
              <p className="text-[10px] md:text-sm uppercase tracking-[0.5em] font-bold text-white/70">
                {slides[current].subtitle}
              </p>
              <h1 className="text-7xl md:text-[10rem] font-editorial font-bold italic tracking-tighter text-white leading-none">
                {slides[current].title}
              </h1>
              <p className="text-sm md:text-lg text-white/50 max-w-lg mx-auto leading-relaxed">
                {slides[current].description}
              </p>
              
              <div className="pt-12">
                <button
                  onClick={() => {
                    const nextSection = document.getElementById('product-grid');
                    if (nextSection) {
                      nextSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/all';
                    }
                  }}
                  className="inline-block bg-white text-black px-16 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 shadow-lg"
                >
                  Shop Collection
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Task 2: Sahara-Style Dot Indicators (Expanding/Filling) @ bottom-10 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-6 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group relative p-2"
          >
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-white/20 rounded-full" />
              <motion.div
                initial={false}
                animate={{ 
                  scale: current === i ? 2.5 : 1,
                  backgroundColor: current === i ? "var(--accent)" : "rgba(255,255,255,0)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 rounded-full"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
