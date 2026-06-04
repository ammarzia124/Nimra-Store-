"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (data.success) {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          setError(data.message || "Invalid credentials");
        }
      } catch (err) {
        setError("An error occurred during authentication.");
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate signup or handle it if needed
      setError("Registration is currently restricted.");
    }
  };

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

        {error && (
          <div className="mb-6 rounded-sm bg-red-500/10 border border-red-500/20 p-4 text-[10px] uppercase tracking-[0.2em] text-red-500 font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleAuth}>
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
              <input 
                type="text" 
                placeholder="FULL NAME"
                className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 text-[10px] tracking-[0.2em] outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 text-[10px] tracking-[0.2em] outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20 group-focus-within:opacity-100 transition-opacity" />
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-foreground/10 py-4 pl-8 pr-10 text-[10px] tracking-[0.2em] outline-none focus:border-foreground transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors p-2"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center group hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <span>{loading ? "AUTHENTICATING..." : (isLogin ? "LOG IN" : "SIGN UP")}</span>
              {!loading && <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />}
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
