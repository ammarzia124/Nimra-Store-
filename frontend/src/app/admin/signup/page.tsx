"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup, but reject because we are using hardcoded credentials as requested.
    setError("Administrator registration is currently restricted to authorized personnel only. Please contact IT support.");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Admin</h1>
          <p className="text-gray-500">Register a new administrator account.</p>
        </div>
        
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-5 py-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-lg"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-5 py-4 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-lg"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 px-4 py-4 font-bold text-white hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all text-lg shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/admin/login" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
