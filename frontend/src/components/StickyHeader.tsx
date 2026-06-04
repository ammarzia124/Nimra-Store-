"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ShoppingBag, Search, Menu, X, User, Heart, Instagram, Facebook, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

const MOCK_PRODUCTS = [
  { id: 1, name: "The Kinetic Chronograph", price: "Rs. 24,500", image: "/images/hero-1.png", category: "Watches" },
  { id: 2, name: "Minimalist Leather Tote", price: "Rs. 18,000", image: "/images/hero-2.png", category: "Bags" },
  { id: 3, name: "Silk Blend Evening Dress", price: "Rs. 45,000", image: "/images/hero-3.png", category: "Pret" },
  { id: 4, name: "Signature Velvet Loafers", price: "Rs. 12,500", image: "/images/hero-4.png", category: "Shoes" }
];

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
  const router = useRouter();
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const isHome = pathname === "/";
  const shouldBeSolid = !isHome || isScrolled;

  const categories = ["Women", "Kids", "Men"];

  const announcements = [
    { text: <>Celebrate the Launch of <span className="font-bold italic">Labels by Nimra</span>! ✨ Flat 50% OFF Storewide – Limited Pieces Available.</> },
    { text: "Redefining Elegance for Men, Women & Kids. Quality that defines you." },
    { text: "Fresh Drops in the Spring Collection! 🌸 Click to Shop Your Favorites Now." },
  ];

  useEffect(() => {
    // eslint-disable-next-line
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

    const handleCartAdd = () => {
      setCartCount(prev => prev + 1);
    };
    window.addEventListener("cart-add", handleCartAdd);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cart-add", handleCartAdd);
      clearInterval(interval);
    };
  }, [announcements.length]);

  useEffect(() => {
    let focusTimer: NodeJS.Timeout;
    if (isSearchOpen && searchInputRef.current) {
      focusTimer = setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (focusTimer) clearTimeout(focusTimer);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredProducts = debouncedQuery 
    ? MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || p.category.toLowerCase().includes(debouncedQuery.toLowerCase()))
    : [];

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
                  className="w-56 md:w-80 h-20 md:h-28 !transition-none" 
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] flex flex-col p-8 md:p-12 bg-black/95 backdrop-blur-2xl text-white transition-all duration-300 ease-in-out overflow-y-auto no-scrollbar"
          >
            <div className="flex justify-between items-start w-full">
              <Logo isScrolled={true} theme="dark" className="h-10 w-auto" />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center space-x-3 group mt-2"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">CLOSE</span>
                <X className="w-6 h-6 stroke-[1px] text-white group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-start pt-[15vh] max-w-3xl mx-auto w-full px-6 sm:px-8">
              <div className="w-full relative">
                <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">SEARCH THE UNIVERSE</h2>
                <div className="relative border-b border-white/10 focus-within:border-white/40 transition-colors duration-500 pb-4 group flex items-center">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    placeholder="START TYPING..."
                    style={!searchQuery ? { fontFamily: 'Didot, "Bodoni MT", Cinzel, Georgia, serif' } : {}}
                    className={`w-full bg-transparent text-2xl sm:text-4xl md:text-5xl focus:outline-none focus:ring-0 text-white placeholder-neutral-500 transition-all duration-300 ${
                      searchQuery ? "font-sans font-light tracking-tight" : "italic font-light tracking-widest"
                    }`}
                  />
                  <Search className="absolute right-0 w-7 h-7 stroke-[1.5px] text-neutral-400 group-focus-within:text-white transition-colors" />
                </div>
              </div>

              {/* Live Search Results */}
              <AnimatePresence>
                {debouncedQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-16 w-full"
                  >
                    {filteredProducts.length > 0 ? (
                      <>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8 border-b border-white/10 pb-4">Suggested Products</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
                          {filteredProducts.map((product) => (
                            <Link 
                              href={`/product/${product.id}`} 
                              key={product.id}
                              onClick={() => setIsSearchOpen(false)}
                              className="group flex flex-col space-y-4"
                            >
                              <div className="aspect-[4/5] w-full overflow-hidden bg-white/5 relative">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">{product.category}</span>
                                <span className="text-sm font-light tracking-wide text-white/90 truncate">{product.name}</span>
                                <span className="text-xs font-medium text-white/50 mt-1">{product.price}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-20">
                        <p 
                          className="text-neutral-400 italic text-xl tracking-wide"
                          style={{ fontFamily: 'Didot, "Bodoni MT", Cinzel, Georgia, serif' }}
                        >
                          No collections found matching &apos;{debouncedQuery}&apos;
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};






