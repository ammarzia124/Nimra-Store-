"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Tops",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
    link: "/shop/tops",
  },
  {
    name: "Bottoms",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    link: "/shop/bottoms",
  },
  {
    name: "Skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    link: "/shop/skirts",
  },
  {
    name: "Pants",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    link: "/shop/pants",
  },
  {
    name: "Kids",
    image: "https://images.unsplash.com/photo-1519238396349-299f1504938a?q=80&w=800&auto=format&fit=crop",
    link: "/kids",
  },
];

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
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative cursor-pointer"
            >
              <Link href={cat.link}>
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
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
