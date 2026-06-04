"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const LuxuryLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="luxury-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-white cursor-none pointer-events-none"
        >
          {/* Asset: Absolute Centered Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-48 md:w-64 aspect-[3/1]"
          >
            <Image
              src="/images/transparent-logo.png"
              alt="LABEL BY NIMRAH FASHION STORE"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Progress Engine: 1px Black Progress Line at Bottom */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-black"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

