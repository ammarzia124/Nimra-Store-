"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductsByCategory } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const categories = [
  { id: "all", name: "All Collections" },
  { id: "men", name: "Men" },
  { id: "women", name: "Women" },
  { id: "kids", name: "Kids" },
];

export const CategorySlider = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const products = getProductsByCategory(activeCategory).slice(0, 8);

  return (
    <div id="collections" className="editorial-container py-24">
      {/* Horizontal Tab Slider */}
      <div className="flex justify-center mb-20">
        <div className="inline-flex bg-foreground/5 rounded-full p-2 relative">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative z-10 px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${
                activeCategory === cat.id ? "text-white" : "text-foreground/40 hover:text-foreground"
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-black dark:bg-accent rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cross-Fade Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={`${activeCategory}-${product.id}`} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 text-center">
        <button className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-foreground/20 pb-2 hover:border-accent transition-colors">
          View All Systems
        </button>
      </div>
    </div>
  );
};
