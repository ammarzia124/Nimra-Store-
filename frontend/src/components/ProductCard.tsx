"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, AlertCircle, Eye } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fallback Placeholder for strict source file fallbacks
  const fallbackPlaceholder = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop";

  // Build array and implement defensive array-bound checks
  const rawImages = [product.image, (product as any).secondaryImage].filter(Boolean);
  const imageArray = rawImages.length > 0 ? rawImages : [fallbackPlaceholder];
  const hasMultipleImages = imageArray.length >= 2 && imageArray[0] !== imageArray[1];

  // Hardcode unified state event mechanism
  const handleMouseEnter = () => {
    if (hasMultipleImages) {
      setActiveImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setActiveImageIndex(0);
  };

  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 5;

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative bg-foreground/5 mb-6 w-full overflow-hidden"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Task 1 & Task 2: State-driven image rendering loop */}
        <div className="absolute inset-0 w-full h-full">
          {imageArray.slice(0, 2).map((src, index) => (
            <Image
              key={`${src}-${index}`}
              src={src}
              alt={`${product.name} - view ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover', display: 'block' }}
              className={`transition-all duration-1000 ease-in-out ${
                activeImageIndex === index 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-105 z-0'
              }`}
              onError={(e) => {
                // Establish Strict Source File Fallbacks on Error
                const target = e.target as HTMLImageElement;
                target.srcset = "";
                target.src = fallbackPlaceholder;
              }}
            />
          ))}
        </div>

        {/* Task 1: Top-left Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tag && (
            <span className="bg-black text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1.5">
              {product.tag}
            </span>
          )}
          {product.discount && (
            <span className="bg-accent text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1.5">
              SAVE {product.discount}%
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-500 text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1.5 flex items-center gap-2">
              <AlertCircle className="w-2 h-2" />
              Low Stock
            </span>
          )}
        </div>

        {/* Quick Actions (Right Rail) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
          <button className="w-10 h-10 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Task 1: CTA Repair (Solid black, white text, magnetic hover scale) */}
        <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black hover:bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("cart-add"));
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-2 mt-1">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-bold tracking-wide text-foreground group-hover:text-accent transition-colors duration-300 truncate">
              {product.name}
            </h3>
            <p className="text-[10px] text-foreground/50 uppercase tracking-wider mt-1">
              {product.category} • Engineered Fit
            </p>
          </div>
          <span className="text-sm font-bold tracking-tight px-2 py-1 bg-foreground/5 rounded-sm group-hover:bg-foreground group-hover:text-background transition-colors duration-300 whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>
        {product.description && (
          <p className="text-xs text-foreground/70 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>
    </Link>
  );
};
