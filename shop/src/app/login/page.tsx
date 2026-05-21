"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-[12px] uppercase tracking-[0.5em] font-bold mb-4">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 leading-relaxed">
            {isLogin 
              ? "Access your personalized fashion portfolio." 
              : "Join the vanguard of contemporary style."}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                placeholder="FULL NAME"
                className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 text-[10px] tracking-[0.2em] uppercase outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 text-[10px] tracking-[0.2em] uppercase outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="password" 
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 text-[10px] tracking-[0.2em] uppercase outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div className="pt-6">
            <button className="w-full bg-foreground text-background py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center group hover:opacity-90 transition-opacity">
              <span>{isLogin ? "LOG IN" : "SIGN UP"}</span>
              <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </form>

        <div className="mt-12 text-center space-y-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors"
          >
            {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOG IN"}
          </button>
          
          {isLogin && (
            <div>
              <button className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors italic">
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
