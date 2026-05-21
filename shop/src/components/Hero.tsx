"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
        alt="The Sunset Edit"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm uppercase tracking-[0.4em] mb-4 font-sans"
        >
          Introducing
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-editorial mb-8"
        >
          The Sunset Edit
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/shop"
            className="group relative inline-block text-sm uppercase tracking-widest font-bold border-b border-white pb-1 overflow-hidden"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-white/50 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};
