"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- Premium Carousel Images (Optimized Limit: 8) ---
const carouselImages = [
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.17 AM.jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.21 AM (1).jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.22 AM (2).jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.23 AM.jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.26 AM (1).jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.27 AM.jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.28 AM.jpeg",
  "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.29 AM.jpeg",
];

export const Hero3D = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      {/* 
          Full-Bleed Immersive Carousel 
          Eliminating all black dead space as per Vibe Engineering Directive.
      */}
      <div className="absolute inset-0 z-0">
        <div key={index} className="absolute inset-0">
          <Image
            src={carouselImages[index]}
            alt={`Collection Image ${index + 1}`}
            fill
            className="object-cover object-[center_top]"
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Subtle vignette for depth without obscuring full-bleed impact */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>
      </div>

      {/* Standardized 'Explore Collection' CTA Button */}
      <div className="relative z-20 h-full flex flex-col items-center justify-end pb-32 md:pb-40 px-6">
        <div className="flex flex-col items-center mt-[50px]">
          <motion.button
            whileHover={{ scale: 1.02, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const nextSection = document.getElementById('collections');
              if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-14 py-6 overflow-visible"
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
          >
            {/* Tech-Sash Asymmetrical Boundary Box */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-12 h-[1px] bg-white/60 group-hover:bg-white group-hover:w-full transition-all duration-500" />
              <div className="absolute top-0 left-0 h-12 w-[1px] bg-white/60 group-hover:bg-white group-hover:h-full transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-white/60 group-hover:bg-white group-hover:w-full transition-all duration-500" />
              <div className="absolute bottom-0 right-0 h-12 w-[1px] bg-white/60 group-hover:bg-white group-hover:h-full transition-all duration-500" />
              <div 
                className="absolute inset-0 bg-white/5 backdrop-blur-sm -z-10 group-hover:bg-white/10 transition-colors duration-500" 
                style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
              />
            </div>

            <span className="relative z-10 text-[11px] font-medium uppercase tracking-[0.6em] text-white overflow-hidden block">
              Explore Collection
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Slide Index Indicators (Bottom Right Corner) */}
      <div className="absolute bottom-10 right-10 flex items-center space-x-2 z-30">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group p-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div 
              className={`h-1 transition-all duration-300 rounded-full ${
                index === i 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`} 
            />
          </button>
        ))}
      </div>
    </section>
  );
};
