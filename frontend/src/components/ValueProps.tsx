"use client";

import { motion } from "framer-motion";
import { Truck, Clock, RefreshCw } from "lucide-react";

const props = [
  {
    icon: <Truck className="w-6 h-6" />,
    text: "Free Shipping Above Rs. 2000",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    text: "Delivery in 3-5 Working Days",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    text: "14 Days Easy Return & Exchange",
  },
];

export const ValueProps = () => {
  return (
    <section className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {props.map((prop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col items-center text-center px-4 ${
                idx !== props.length - 1 ? "md:border-r md:border-white/20" : ""
              }`}
            >
              <div className="mb-4 text-white/80">{prop.icon}</div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                {prop.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
