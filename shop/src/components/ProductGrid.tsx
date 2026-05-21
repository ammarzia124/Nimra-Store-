"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cotton Blend Co-ord Set",
    price: "Rs. 4,500",
    image: "/images/hero-3.png",
    category: "New Arrivals",
  },
  {
    id: 2,
    name: "Linen Button-Up Shirt",
    price: "Rs. 3,200",
    image: "https://images.unsplash.com/photo-1539109132381-31a1ecbfad2b?q=80&w=1920&auto=format&fit=crop",
    category: "New Arrivals",
  },
  {
    id: 3,
    name: "Flowy Wide Leg Trousers",
    price: "Rs. 3,800",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1920&auto=format&fit=crop",
    category: "New Arrivals",
  },
  {
    id: 4,
    name: "Silk Satin Midi Skirt",
    price: "Rs. 5,200",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1920&auto=format&fit=crop",
    category: "New Arrivals",
  },
];

export const ProductGrid = ({ title }: { title: string }) => {
  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-editorial mb-2">{title}</h2>
        <div className="w-12 h-[1px] bg-black mt-2" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] uppercase tracking-widest px-6 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                Quick Add
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-sans tracking-wide mb-1 uppercase group-hover:underline decoration-1 underline-offset-4">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <Link 
          href="/shop"
          className="bg-black text-white px-10 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-800 transition-colors"
        >
          View All
        </Link>
      </div>
    </section>
  );
};
