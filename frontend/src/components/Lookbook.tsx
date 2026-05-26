"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";

const editorialShots = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1539008835154-732475dbe134?q=80&w=1920&auto=format&fit=crop",
    pos: "top-1/2 left-1/2",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1920&auto=format&fit=crop",
    pos: "top-[40%] left-[60%]",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    pos: "top-[60%] left-[40%]",
  },
];

export const Lookbook = () => {
  return (
    <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-sm uppercase tracking-[0.5em] font-bold mb-4">In The Look</h2>
        <p className="text-xs text-muted uppercase tracking-widest">Our Seasonal Story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {editorialShots.map((shot, idx) => (
          <motion.div
            key={shot.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
          >
            <Image
              src={shot.image}
              alt="Editorial Shot"
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            
            <motion.div 
              className={`absolute ${shot.pos} -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 backdrop-blur-sm`}
            >
              <Plus className="w-5 h-5 text-black" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
