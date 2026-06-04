"use client";

import React from "react";
import Image from "next/image";

export const Logo = ({ className = "", isScrolled = false, theme = "dark" }: { className?: string, isScrolled?: boolean, theme?: string }) => {
  // Logo is black ONLY when it's light theme AND scrolled (white bg)
  const isBlack = theme === "light" && isScrolled;
  
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <Image
        src="/images/new-logo.png"
        alt="LABEL BY NIMRAH FASHION STORE"
        fill
        className={`object-contain ${isBlack ? "" : "brightness-0 invert"}`}
        priority
      />
    </div>
  );
};




