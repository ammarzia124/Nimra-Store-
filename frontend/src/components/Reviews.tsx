"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Saba Hamid",
    text: "The quality of the fabric is exceptional. It fits perfectly and feels so luxurious. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    product: "Linen Co-ord Set",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    text: "Beautiful design and fast delivery. The color is exactly as shown in the pictures. Very happy with my purchase.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    product: "Silk Blouse",
  },
  {
    id: 3,
    name: "Zainab Ali",
    text: "Excellent customer service and premium packaging. The fit is true to size and the material is breathable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    product: "Cotton Trousers",
  },
];

export const Reviews = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24 bg-gray-50 dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-editorial mb-4 uppercase tracking-widest">You make us love what we do!</h2>
          <p className="text-[10px] text-muted uppercase tracking-[0.3em]">Customer Stories</p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                className="min-w-[300px] md:min-w-[400px] bg-background p-8 snap-center border border-border shadow-sm"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                
                <p className="text-sm italic text-foreground/80 leading-relaxed mb-8">
                  &quot;{review.text}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={review.image} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest">{review.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Verified Buyer</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button className="p-2 border border-border hover:border-foreground transition-colors rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
