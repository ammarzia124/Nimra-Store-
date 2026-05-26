"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HeroSection Component
 * 
 * Senior Systems Architect Refactor
 * Maintains 100% isolation.
 * Logic: Seamless 5-image carousel loop.
 * Aesthetic: 'Labels' minimalist luxury.
 */

const SLIDES = [
  {
    id: 1,
    title: "VANGUARD",
    subtitle: "SYSTEM RELEASE 01",
    image: "/images/hero-1.png",
  },
  {
    id: 2,
    title: "KINETIC",
    subtitle: "MOTION ARCHITECTURE",
    image: "/images/hero-2.png",
  },
  {
    id: 3,
    title: "MODULAR",
    subtitle: "CORE INTEGRITY",
    image: "/images/hero-3.png",
  },
  {
    id: 4,
    title: "ESSENTIAL",
    subtitle: "FOUNDATIONAL FORM",
    image: "/images/hero-4.png",
  },
  {
    id: 5,
    title: "ZENITH",
    subtitle: "PEAK PERFORMANCE",
    image: "/images/hero-5.png",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  // Seamless Loop Logic: 1 -> 2 -> 3 -> 4 -> 5 -> 1
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative z-0 h-screen w-full overflow-hidden bg-black"
      id="hero-section"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          {/* High-Fidelity Image with object-cover to prevent layout shifts */}
          <Image
            src={SLIDES[index].image}
            alt={SLIDES[index].title}
            fill
            priority
            className="object-cover pointer-events-none"
            sizes="100vw"
            quality={90}
          />
          
          {/* Minimalist Overlay for legibility */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-4">
        <motion.div
          key={`content-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-4xl space-y-8"
        >
          <div className="space-y-4">
            <span className="block text-[10px] uppercase tracking-[0.8em] font-light text-white/60">
              {SLIDES[index].subtitle}
            </span>
            <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white">
              {SLIDES[index].title}
            </h1>
          </div>

          <div className="pt-8">
            {/* The 'Labels' Aesthetic Button Refactor */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                group relative
                inline-flex items-center justify-center
                px-12 py-5
                bg-white/10 backdrop-blur-lg
                border-[0.5px] border-white/50
                text-white text-[10px] md:text-xs
                uppercase tracking-[0.5em] font-extralight
                transition-colors duration-500
                hover:bg-white/20
              "
              onClick={() => {
                const nextSection = document.getElementById('collection');
                if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discover Collection
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative h-10 w-2"
          >
            <div 
              className={`
                h-full w-[1px] transition-all duration-500
                ${i === index ? "bg-white h-full" : "bg-white/20 h-4 group-hover:h-6"}
              `} 
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
