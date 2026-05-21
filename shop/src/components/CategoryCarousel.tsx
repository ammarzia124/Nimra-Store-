"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Slide {
  id: number;
  image: string;
  label: string;
  subLabel?: string;
  description: string;
  links: { name: string; href: string }[];
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1920&auto=format&fit=crop",
    label: "WOMEN",
    subLabel: "WOMEN",
    description: "Discover elegance in every stitch. Our women's collection blends traditional craftsmanship with contemporary design for the perfect silhouette.",
    links: [
      { name: "Stitched", href: "/women/stitched" },
      { name: "Unstitched", href: "/women/unstitched" }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1920&auto=format&fit=crop",
    label: "MEN",
    subLabel: "MEN",
    description: "Refined styles for the modern man. From classic heritage to modern essentials, explore a collection designed for versatility and impact.",
    links: [
      { name: "Stitched", href: "/men/stitched" },
      { name: "Unstitched", href: "/men/unstitched" }
    ]
  },
  {
    id: 3,
    image: "/images/kids-hero.png",
    label: "KIDS",
    subLabel: "KIDS",
    description: "Vibrant colors and comfortable fabrics for the little ones. Dress them in styles that celebrate joy and playful elegance.",
    links: [
      { name: "Collection", href: "/kids" }
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1920&auto=format&fit=crop",
    label: "ACCESSORIES",
    subLabel: "BEAUTY",
    description: "Enhance your natural grace with our curated beauty essentials and accessories. The perfect finishing touch to your signature look.",
    links: [
      { name: "Stitched", href: "/beauty/stitched" },
      { name: "Unstitched", href: "/beauty/unstitched" }
    ]
  }
];

export const CategoryCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section className="relative w-full h-[450px] md:h-[550px] bg-white overflow-hidden border-y border-gray-100">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col md:flex-row"
        >
          {/* Left Side: Image */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={slides[current].image}
              alt={slides[current].label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Right Side: Content */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full flex flex-col items-center justify-center text-center px-8 md:px-16 bg-[#fafafa]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-md"
            >
              <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tighter mb-1 text-black">
                {slides[current].label}
              </h2>
              <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tighter mb-4 text-gray-300 uppercase italic">
                {slides[current].subLabel}
              </h2>
              
              <p className="text-xs md:text-sm text-gray-500 font-sans tracking-wide leading-relaxed mb-8 max-w-sm mx-auto">
                {slides[current].description}
              </p>

              <div className="flex items-center justify-center space-x-8">
                {slides[current].links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative text-xs uppercase tracking-[0.3em] font-bold text-black pb-1 overflow-hidden"
                  >
                    <span>{link.name}</span>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vertical Pagination Dots */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="group relative flex items-center justify-center w-4 h-8 focus:outline-none"
          >
            <motion.div
              animate={{
                height: current === idx ? "24px" : "8px",
                backgroundColor: current === idx ? "#000" : "#d1d5db"
              }}
              className="w-[2px] rounded-full transition-all duration-300 group-hover:bg-black"
            />
          </button>
        ))}
      </div>

      {/* Progress Bar (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-100">
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-black/20"
        />
      </div>
    </section>
  );
};
