"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ShoppingBag, Search, Menu, X, User, Heart, Instagram, Facebook, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const shouldBeSolid = !isHome || isScrolled;

  const categories = ["Women", "Kids", "Men"];

  const announcements = [
    { text: <>Celebrate the Launch of <span className="font-bold italic">Labels by Nimra</span>! ✨ Flat 50% OFF Storewide – Limited Pieces Available.</> },
    { text: "Redefining Elegance for Men, Women & Kids. Quality that defines you." },
    { text: "Fresh Drops in the Spring Collection! 🌸 Click to Shop Your Favorites Now." },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [announcements.length]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleWishlistClick = () => {
    console.log("Added to Wishlist");
    // Placeholder for toast or actual logic
  };

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <>
      {/* Announcement Bar: Absolute on Home ONLY, disappears on scroll */}
      {isHome && (
        <div className="absolute top-0 left-0 right-0 z-[110] bg-[#000000] text-[#FFFFFF] h-10 flex items-center justify-center overflow-hidden border-b border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-medium text-center px-4 w-full"
            >
              {announcements[announcementIndex].text}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Navbar Container: Dynamic Sticky State only on Home */}
      <header className={`fixed top-0 left-0 right-0 z-[100] !transition-none ${
        isHome 
          ? (isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent mt-10")
          : (isDark ? "bg-black border-b border-white/10 shadow-sm" : "bg-white border-b border-black/5 shadow-sm")
      }`}>
        {/* Navbar: Identical size and layout on every page */}
        <div className={`h-[80px] md:h-[100px] flex items-center !transition-none ${
          isHome ? "text-white" : (isDark ? "text-white" : "text-black")
        }`}>
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-3 items-center h-full w-full">
            
            {/* Left Column: Menu & Search */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 -ml-2 hover:opacity-50 transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.25px]" />
              </button>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 hover:opacity-50 hidden md:block transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
              >
                <Search className="w-5 h-5 stroke-[1.25px]" />
              </button>
            </div>

            {/* Center Column: Logo */}
            <div className="flex justify-center items-center">
              <div 
                onClick={() => window.location.href = "/"}
                className="block cursor-pointer"
              >
                <Logo 
                  isScrolled={isScrolled || !isHome} 
                  theme={isHome ? "dark" : currentTheme}
                  className="w-48 md:w-64 h-16 md:h-20 !transition-none" 
                />
              </div>
            </div>

            {/* Right Column: Utility Icons */}
            <div className="flex items-center justify-end space-x-2 md:space-x-6">
              <button 
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-2 hover:opacity-50 transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
              >
                {isDark ? <Sun className="w-5 h-5 stroke-[1.25px]" /> : <Moon className="w-5 h-5 stroke-[1.25px]" />}
              </button>

              <Link 
                href="/wishlist"
                className={`p-2 hover:opacity-50 hidden sm:block transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
              >
                <Heart className="w-5 h-5 stroke-[1.25px]" />
              </Link>
              
              <Link 
                href="/login" 
                className={`p-2 hover:opacity-50 hidden sm:block transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
              >
                <User className="w-5 h-5 stroke-[1.25px]" />
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 hover:opacity-50 transition-opacity ${isHome && !isScrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""}`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.25px]" />
                <span className={`absolute top-1 right-0 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border transition-colors ${
                  isHome ? "bg-white text-black border-white" : (isDark ? "bg-white text-black border-white" : "bg-black text-white border-black")
                }`}>
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer (Right Side) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed top-0 right-0 bottom-0 w-full max-w-[480px] z-[210] flex flex-col shadow-2xl ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <div className="flex justify-between items-center p-8 border-b border-foreground/10">
                <h2 className="text-[12px] uppercase tracking-[0.4em] font-bold">Shopping Bag ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-500">
                  <X className="w-7 h-7 stroke-[1.5px]" />
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-6">
                <ShoppingBag className="w-12 h-12 opacity-10 stroke-[1px]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 text-center">Your bag is currently empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:opacity-80 transition-opacity"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Maria B. Inspired Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-[4px] brightness-[0.5] z-[110]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`fixed top-0 left-0 bottom-0 w-full max-w-[480px] z-[120] flex flex-col shadow-2xl transition-all duration-300 ${
                isDark 
                  ? "bg-black text-white border-r border-white/10" 
                  : "bg-white text-black border-r border-black/5"
              }`}
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-8">
                <div 
                  onClick={() => window.location.href = "/"}
                  className="cursor-pointer"
                >
                  <Logo isScrolled={true} theme={currentTheme} className="h-10 w-auto" />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:rotate-90 transition-transform duration-500"
                >
                  <X className="w-7 h-7 stroke-[1.5px]" />
                </button>
              </div>

              {/* Main Categories Navigation */}
              <div className="flex-1 overflow-y-auto px-10 py-8">
                <div className="flex space-x-8 text-[12px] uppercase tracking-[0.2em] font-bold pb-6 mb-10 overflow-x-auto no-scrollbar whitespace-nowrap">
                  {categories.map((cat) => (
                    <Link 
                      key={cat}
                      href={`/${cat.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`pb-1 cursor-pointer transition-all duration-300 border-b-2 ${
                        activeCategory === cat 
                          ? "border-foreground opacity-100" 
                          : "border-transparent opacity-40 hover:opacity-100 hover:border-foreground"
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link 
                    href="/offers" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-red-600 cursor-pointer hover:underline decoration-red-600 decoration-2 underline-offset-8 transition-all duration-300"
                  >
                    Special Offers
                  </Link>
                </div>

                <div className="flex flex-col space-y-4">
                  {["Unstitched", "Stitched"].map((item) => (
                    <div 
                      key={item} 
                      className="group relative flex justify-between items-center py-3 px-4 -mx-4 cursor-pointer transition-all duration-300 hover:bg-foreground/5 rounded-lg text-sm uppercase tracking-[0.25em] font-light"
                    >
                      <span className="relative z-10 transition-colors duration-300 opacity-40 group-hover:opacity-100 group-hover:text-foreground">
                        {item}
                      </span>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-foreground/30 text-[10px]"
                      >
                        EXPLORE
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer / Promo Banner */}
              <div className="p-6">
                <div className="bg-red-50 p-6 rounded-xl flex justify-between items-center group cursor-pointer transition-all hover:bg-red-100 hover:scale-[1.02]">
                  <div className="flex flex-col">
                    <span className="text-black text-base font-bold">Up to 50% Off Luxury Pret</span>
                  </div>
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-red-200">
                     <div className="absolute inset-0 bg-gradient-to-tr from-red-300 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[300] flex flex-col p-12 md:p-24 bg-black/90 backdrop-blur-[8px] text-white"
          >
            <div className="flex justify-between items-center mb-24">
              <Logo isScrolled={true} theme="dark" className="h-10 w-auto" />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center space-x-4 group"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 group-hover:opacity-100 transition-opacity">Close</span>
                <X className="w-8 h-8 stroke-[1px] group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
              <h2 className="text-[10px] uppercase tracking-[0.8em] font-bold mb-8 text-white/40">Search the Universe</h2>
              <div className="relative border-b border-white/20 pb-8 group focus-within:border-white transition-colors duration-700">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="START TYPING..."
                  className="w-full bg-transparent text-5xl md:text-9xl font-editorial font-bold italic tracking-tighter text-white placeholder:text-white/5 outline-none"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              </div>
              
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-8">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 border-b border-white/10 pb-4">Trending Now</h4>
                  <div className="flex flex-col space-y-6 text-sm tracking-[0.1em] font-light">
                    {["Unstitched Luxury", "Lawn '26", "Pret Essentials", "Signature Series"].map((term) => (
                      <button key={term} className="text-left hover:text-white/60 transition-colors flex items-center group">
                        <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2">/</span>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 border-b border-white/10 pb-4">Quick Links</h4>
                  <div className="flex flex-col space-y-6 text-sm tracking-[0.1em] font-light">
                    {["Track Order", "Store Locator", "Size Guide", "Contact Us"].map((link) => (
                      <button key={link} className="text-left hover:text-white/60 transition-colors">{link}</button>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-red-500 mb-4 block">New Drop</span>
                    <h5 className="text-xl font-editorial italic font-bold mb-4">The Kinetic Series</h5>
                    <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                      Discover the intersection of technical performance and architectural elegance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};






