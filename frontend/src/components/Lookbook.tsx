"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const editorialShots = [
  {
    id: 1,
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.11 AM.jpeg", // Women's
    pos: "top-1/2 left-1/2",
    link: "/women",
  },
  {
    id: 2,
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.12 AM.jpeg", // Men's
    pos: "top-[40%] left-[60%]",
    link: "/men",
  },
  {
    id: 3,
    image: "/Clothing Brand images/WhatsApp Image 2026-04-26 at 5.29.13 AM.jpeg", // Kids
    pos: "top-[60%] left-[40%]",
    link: "/kids",
  },
];

const LookbookCard = ({ shot, idx }: { shot: typeof editorialShots[0], idx: number }) => {
  const [imgSrc, setImgSrc] = useState(shot.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
    >
      <Image
        src={imgSrc}
        alt="Editorial Shot"
        fill
        className="object-cover w-full h-full transition-transform duration-[2s] group-hover:scale-110"
        onError={() => setImgSrc("/images/hero.png")}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
      
      <Link href={shot.link} className="absolute inset-0 z-10" aria-label="View Category" />
    </motion.div>
  );
};

export const Lookbook = () => {
  return (
    <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-sm uppercase tracking-[0.5em] font-bold mb-4">In The Look</h2>
        <p className="text-xs text-muted uppercase tracking-widest">Our Seasonal Story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {editorialShots.map((shot, idx) => (
          <LookbookCard key={shot.id} shot={shot} idx={idx} />
        ))}
      </div>
    </section>
  );
};
