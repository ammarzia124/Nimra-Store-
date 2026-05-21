"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  // Empty state simulation for now
  const [wishlistItems, setWishlistItems] = useState([]);

  return (
    <div className="min-h-screen pt-48 pb-20 bg-background px-6">
      <div className="editorial-container max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-editorial font-bold italic tracking-tighter leading-none">
              Your Wishlist
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">
              Curated Selection & Future Acquisitions
            </p>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-foreground/10 pb-2">
            {wishlistItems.length} ITEMS SAVED
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 space-y-8 border-t border-foreground/5"
          >
            <div className="relative">
              <Heart className="w-16 h-16 opacity-5 stroke-[1px]" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Heart className="w-4 h-4 text-accent fill-accent" />
              </motion.div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-[12px] uppercase tracking-[0.4em] font-bold">Your wishlist is empty</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 max-w-xs mx-auto leading-relaxed">
                Start adding items to your wishlist to keep track of your favorites.
              </p>
            </div>

            <Link 
              href="/"
              className="bg-foreground text-background px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] group hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-12 md:gap-y-20">
            {/* Logic for displaying items if there were any */}
          </div>
        )}
      </div>
    </div>
  );
}
