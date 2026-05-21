"use client";

import React, { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  // Mock secondary image for swap effect
  const secondaryImage = product.image; // In a real app, this would be product.images[1]

  const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock < 5;

  return (
    <div 
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-foreground/5 mb-6">
        {/* Task 1: Image Swap on Hover */}
        <div className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isHovered ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate`}
            fill
            className={`object-cover transition-transform duration-1000 scale-110 group-hover:scale-100 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
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
        <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to System
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xs uppercase tracking-widest font-bold text-foreground/80">
            {product.name}
          </h3>
          <span className="text-xs font-bold tracking-tight">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-[10px] text-foreground/40 uppercase tracking-widest">
          {product.category} • Engineered Fit
        </p>
      </div>
    </div>
  );
};
