"use client";

import React from "react";

interface LeadMagnetProps {
  isVisible: boolean;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ isVisible }) => {
  return (
    <div 
      className={`sticky top-0 left-0 w-full z-[100] bg-brand-white border-b border-brand-charcoal/10 transition-all duration-700 ease-in-out overflow-hidden ${
        isVisible ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0 border-none"
      }`}
    >
      <div className="editorial-container py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <span className="bg-brand-charcoal text-brand-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-tighter">
            Limited
          </span>
          <p className="text-xs md:text-sm font-sans font-bold tracking-tight text-brand-charcoal">
            FIRST PURCHASE: <span className="text-brand-red">15% OFF</span> — CODE: <span className="underline decoration-brand-red/30">WELCOME15</span>
          </p>
        </div>
        
        <button className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold bg-brand-red text-brand-white px-6 py-2 hover:bg-brand-charcoal transition-all">
          Secure My Discount & Checkout
        </button>
      </div>
    </div>
  );
};

export default LeadMagnet;
