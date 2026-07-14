"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Tops",
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.18 AM.jpeg",
    link: "/shop/tops",
  },
  {
    name: "Bottoms",
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.19 AM.jpeg",
    link: "/shop/bottoms",
  },
  {
    name: "Skirts",
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.20 AM.jpeg",
    link: "/shop/skirts",
  },
  {
    name: "Pants",
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.21 AM.jpeg",
    link: "/shop/pants",
  },
  {
    name: "Kids",
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.22 AM.jpeg",
    link: "/kids",
  },
];

const CategoryCard = ({ cat, idx }: { cat: typeof categories[0], idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group relative cursor-pointer"
    >
      <Link href={cat.link}>
        <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
        </div>
        <div className="text-center">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold group-hover:underline decoration-1 underline-offset-4">
            {cat.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export const CategoryGrid = () => {
  return (
    <section className="py-20 bg-brand-white dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-editorial mb-2 uppercase tracking-widest">Shop By Category</h2>
          <div className="w-12 h-[1px] bg-foreground mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.name} cat={cat} idx={idx} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            href="/shop"
            className="bg-foreground text-background px-10 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:opacity-80 transition-colors"
          >
            Explore All
          </Link>
        </div>
      </div>
    </section>
  );
};
