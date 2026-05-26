"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export default function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = use(params);
  
  const validCategories = ["men", "women", "kids", "beauty", "accessories", "all"];
  if (!validCategories.includes(category.toLowerCase())) {
    notFound();
  }

  // For now, we'll just filter by the main category since our data doesn't have subcategories yet
  // But we'll label it correctly in the UI
  const products = getProductsByCategory(category.toLowerCase());

  return (
    <div className="min-h-screen pt-48 pb-20 bg-background px-6">
      {/* Category Header */}
      <header className="relative h-[25vh] flex items-center bg-foreground/5 mb-20 overflow-hidden">
        <div className="editorial-container z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent mb-4 block"
          >
            {category.toUpperCase()} / {subcategory.toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-editorial font-bold italic tracking-tighter"
          >
            {subcategory.toUpperCase()}<span className="text-accent">.</span>
          </motion.h1>
        </div>
        
        {/* Background Decor */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-accent/5 -skew-x-12 transform translate-x-1/2" />
      </header>

      {/* Product Grid */}
      <main className="editorial-container">
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-foreground/5">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">
            Showing {products.length} Results for {subcategory}
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
            <button className="hover:text-accent transition-colors">Filter</button>
            <button className="hover:text-accent transition-colors">Sort</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
