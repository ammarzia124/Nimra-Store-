"use client";

import React, { useRef } from "react";
import { ProductCard } from "./ProductCard";

import { Product } from "@/lib/products";

const products: Product[] = [
  { id: "1", name: "Classic Trench", price: 320, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", category: "women", stock: 10 },
  { id: "2", name: "Silk Blouse", price: 180, image: "https://images.unsplash.com/photo-1539109132381-31512579f410?q=80&w=800&auto=format&fit=crop", category: "women", stock: 5 },
  { id: "3", name: "Wool Trousers", price: 240, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop", category: "women", stock: 15 },
  { id: "4", name: "Linen Blazer", price: 290, image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=800&auto=format&fit=crop", category: "women", stock: 8 },
  { id: "5", name: "Leather Boots", price: 450, image: "https://images.unsplash.com/photo-1520639889313-7247ff57bb5a?q=80&w=800&auto=format&fit=crop", category: "women", stock: 2 },
];

const ProductCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="editorial-container py-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-bold">New Arrivals</span>
          <h2 className="text-4xl md:text-5xl font-editorial mt-2">The Editorial Series</h2>
        </div>
        <div className="flex items-center space-x-6">
          <button className="hidden md:block text-[10px] uppercase tracking-[0.2em] font-bold border border-brand-charcoal px-8 py-3 hover:bg-brand-charcoal hover:text-brand-white transition-all">
            View Collection
          </button>
          <div className="flex space-x-4">
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
              className="p-3 border border-brand-charcoal/10 hover:border-brand-charcoal transition-colors"
              aria-label="Previous"
            >
              ←
            </button>
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
              className="p-3 border border-brand-charcoal/10 hover:border-brand-charcoal transition-colors"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className="min-w-[83.33%] md:min-w-[calc(33.33%-1rem)] snap-start shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Scroll Indicator for Mobile */}
      <div className="md:hidden w-full h-[1px] bg-brand-charcoal/10 relative">
        <div className="absolute left-0 top-0 h-full bg-brand-red w-1/4"></div>
      </div>
    </section>
  );
};

export default ProductCarousel;
