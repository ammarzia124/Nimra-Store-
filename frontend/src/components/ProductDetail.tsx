"use client";

import React, { useState } from 'react';
import { 
  Heart, 
  Star, 
  StarHalf, 
  Truck, 
  ShieldCheck, 
  RefreshCcw, 
  Minus, 
  Plus, 
  ChevronRight,
  Share2,
  Ruler,
  Check
} from 'lucide-react';
import { Product } from "@/lib/products";

const baseMockProduct = {
  id: "PROD-84920",
  title: "Premium Egyptian Cotton Signature Oxford",
  brand: "LUXE SARTORIAL",
  breadcrumbs: ["Home", "Men", "Shirts", "Oxfords"],
  price: 129.00,
  originalPrice: 185.00,
  currency: "USD",
  discountPercent: 30,
  rating: 4.8,
  reviewCount: 342,
  description: "Meticulously tailored from 100% pure Egyptian cotton, this signature oxford shirt features a refined modern fit, mother-of-pearl buttons, and exceptional breathability. Engineered for both high-stakes boardroom environments and elegant evening affairs.",
  colors: [
    { id: "c1", name: "Arctic White", hex: "#ffffff", images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=800&auto=format&fit=crop"
    ] },
    { id: "c2", name: "Midnight Navy", hex: "#0f172a", images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=800&auto=format&fit=crop"
    ] },
    { id: "c3", name: "Slate Grey", hex: "#64748b", images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop"
    ] }
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  specs: {
    Material: "100% Egyptian Cotton",
    Fit: "Modern Tailored",
    Care: "Machine wash cold, line dry",
    Origin: "Imported"
  }
};

export default function ProductDetail({ productData }: { productData?: Product }) {
  const mockProduct = {
    ...baseMockProduct,
    id: productData?.id || baseMockProduct.id,
    title: productData?.name || baseMockProduct.title,
    price: productData?.price || baseMockProduct.price,
    colors: productData?.image 
      ? [
          { ...baseMockProduct.colors[0], images: [productData.image, ...baseMockProduct.colors[0].images.slice(1)] },
          ...baseMockProduct.colors.slice(1)
        ]
      : baseMockProduct.colors
  };

  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");

  const activeImage = selectedColor.images[activeImageIndex] || selectedColor.images[0];

  const handleColorChange = (color: typeof mockProduct.colors[0]) => {
    setSelectedColor(color);
    setActiveImageIndex(0);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Added pt-32 to push content completely below your fixed sticky navbar */}
      <div className="w-full bg-white min-h-screen text-zinc-900 font-inter pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* 1. Visual Presentation Stage (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col lg:flex-row gap-5 h-max">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible hide-scrollbar shrink-0 w-full lg:w-24 order-2 lg:order-1">
                {selectedColor.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 lg:w-full aspect-[4/5] shrink-0 overflow-hidden transition-all duration-300 focus:outline-none ${
                      activeImageIndex === idx 
                        ? "border-2 border-zinc-900 opacity-100 scale-100" 
                        : "border border-zinc-200 opacity-60 hover:opacity-100 scale-95 hover:scale-100"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${mockProduct.title} thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>

              {/* Hero Image */}
              <div className="relative w-full aspect-[4/5] bg-[#F8F8F8] overflow-hidden group order-1 lg:order-2 flex-1 shadow-sm border border-zinc-100">
                <img
                  src={activeImage}
                  alt={mockProduct.title}
                  className="w-full h-full object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                />
                <button className="absolute top-5 right-5 p-3.5 bg-white shadow-md hover:shadow-lg hover:text-rose-500 transition-all duration-300 z-10 focus:outline-none group/heart rounded-full">
                  <Heart className="w-4 h-4 text-zinc-900 group-hover/heart:text-rose-500 transition-colors" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* 2. Metadata & Specification Node (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col space-y-8 lg:pt-2">
              
              <div className="space-y-4">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                  {mockProduct.breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb}>
                      <a href="#" className="hover:text-zinc-900 transition-colors">{crumb}</a>
                      {idx < mockProduct.breadcrumbs.length - 1 && (
                        <ChevronRight className="w-3 h-3 mx-2 text-zinc-300" />
                      )}
                    </React.Fragment>
                  ))}
                </nav>

                {/* Title & Brand */}
                <div className="pt-2">
                  <h1 className="text-4xl lg:text-[2.75rem] font-medium text-zinc-900 leading-[1.1] font-playfair tracking-tight mb-4">
                    {mockProduct.title}
                  </h1>
                  <p className="text-[11px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
                    {mockProduct.brand}
                  </p>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <StarHalf className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                  </div>
                  <div className="h-3 w-px bg-zinc-300" />
                  <a href="#reviews" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-all">
                    {mockProduct.reviewCount} Reviews
                  </a>
                </div>
              </div>

              <hr className="border-zinc-100" />

              {/* Color Matrix */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-semibold text-zinc-900 uppercase tracking-[0.2em]">
                    Color
                  </h3>
                  <span className="text-xs font-medium text-zinc-500">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {mockProduct.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none ${
                        selectedColor.id === color.id ? "" : "hover:scale-105"
                      }`}
                      aria-label={color.name}
                    >
                      <span 
                        className={`absolute inset-0 rounded-full border border-black/10 ${selectedColor.id === color.id ? 'ring-1 ring-zinc-900 ring-offset-2' : ''}`} 
                        style={{ backgroundColor: color.hex }} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizing Chips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-semibold text-zinc-900 uppercase tracking-[0.2em]">Size</h3>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2.5">
                  {mockProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3.5 text-xs font-medium transition-all duration-200 focus:outline-none border ${
                        selectedSize === size 
                          ? "border-zinc-900 bg-zinc-900 text-white" 
                          : "border-zinc-200 text-zinc-600 bg-white hover:border-zinc-900 hover:text-zinc-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabbed System */}
              <div className="pt-6">
                <div className="flex gap-8 border-b border-zinc-200 relative">
                  <button 
                    onClick={() => setActiveTab("overview")}
                    className={`pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors relative ${activeTab === "overview" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
                  >
                    Overview
                    {activeTab === "overview" && (
                      <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900" />
                    )}
                  </button>
                  <button 
                    onClick={() => setActiveTab("specs")}
                    className={`pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors relative ${activeTab === "specs" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"}`}
                  >
                    Details & Care
                    {activeTab === "specs" && (
                      <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-zinc-900" />
                    )}
                  </button>
                </div>
                <div className="py-6 text-[13px] text-zinc-600 font-light leading-relaxed min-h-[160px]">
                  {activeTab === "overview" && (
                    <p className="animate-in fade-in duration-500">{mockProduct.description}</p>
                  )}
                  {activeTab === "specs" && (
                    <ul className="space-y-3 animate-in fade-in duration-500">
                      {Object.entries(mockProduct.specs).map(([key, val]) => (
                        <li key={key} className="flex justify-between items-center border-b border-zinc-100 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium text-zinc-900 text-xs uppercase tracking-wider">{key}</span>
                          <span className="text-zinc-500">{val}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Conversion & Logistics Engine (lg:col-span-3) */}
            <div className="lg:col-span-3 lg:pt-2">
              <div className="sticky top-32 flex flex-col space-y-8 bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 p-6 lg:p-8">
                
                {/* Pricing Stack */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[11px] text-zinc-500 font-medium line-through">
                    ${mockProduct.originalPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-playfair font-semibold text-zinc-900 tracking-tight">
                      ${mockProduct.price.toFixed(2)}
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] bg-rose-900 text-white">
                      {mockProduct.discountPercent}% OFF
                    </span>
                  </div>
                </div>

                {/* Quantity Counter */}
                <div className="flex flex-col space-y-3">
                  <span className="text-[10px] font-semibold text-zinc-900 uppercase tracking-[0.2em]">Quantity</span>
                  <div className="flex items-center justify-between border border-zinc-300 bg-white p-1 w-full">
                    <button onClick={decrementQuantity} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors focus:outline-none">
                      <Minus className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <span className="text-sm font-medium text-zinc-900 w-12 text-center">{quantity}</span>
                    <button onClick={incrementQuantity} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors focus:outline-none">
                      <Plus className="w-4 h-4" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                {/* CTA Domination */}
                <div className="flex flex-col gap-3 pt-2">
                  <button className="w-full py-4 px-6 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-[0.15em] hover:bg-zinc-800 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:ring-offset-2 flex justify-between items-center">
                    <span>Add to Bag</span>
                    <span className="opacity-70">${(mockProduct.price * quantity).toFixed(2)}</span>
                  </button>
                  <button className="w-full py-4 px-6 bg-white text-zinc-900 text-xs font-semibold uppercase tracking-[0.15em] border border-zinc-900 hover:bg-zinc-50 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:ring-offset-2">
                    Checkout Now
                  </button>
                </div>

                <hr className="border-zinc-200" />

                {/* Logistics & Trust */}
                <div className="flex flex-col gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-zinc-900 font-medium tracking-wide">Complimentary Shipping</p>
                      <p className="text-zinc-500 mt-1 leading-relaxed">Delivered in 2-4 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCcw className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-zinc-900 font-medium tracking-wide">Free Returns</p>
                      <p className="text-zinc-500 mt-1 leading-relaxed">Return within 30 days of delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="text-zinc-900 font-medium tracking-wide">Authenticity Guarantee</p>
                      <p className="text-zinc-500 mt-1 leading-relaxed">Secure payments & buyer protection.</p>
                    </div>
                  </div>
                </div>
                
                {/* Share action */}
                <button className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-900 transition-colors w-full mt-2 pt-5 border-t border-zinc-200">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
