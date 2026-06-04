"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "men",
    stock: "10",
    description: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setLoading(true);
    const newImages = [...images];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: data,
        });
        const json = await res.json();
        if (json.success) {
          newImages.push(json.url);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
    
    setImages(newImages);
    setLoading(false);
    // Clear input so same file can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: images[0], // First image is primary
          images: images,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        alert("Failed to create product");
      }
    } catch (err) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-1 text-sm">Configure your new storefront item below.</p>
        </div>
        <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900 font-medium bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-xl border border-gray-200 transition-colors text-sm">
          Cancel & Return
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Product Title</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm transition-all"
              placeholder="e.g., Premium Silk Blouse"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm transition-all bg-white"
              >
                <option value="men">Men's Collection</option>
                <option value="women">Women's Collection</option>
                <option value="kids">Kids' Collection</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm transition-all overflow-hidden resize-none leading-relaxed"
              placeholder="Write a detailed description highlighting the premium features..."
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Images */}
        <div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Product Gallery</label>
            <p className="text-xs text-gray-500">Select multiple files at once. First image is used as the primary cover.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            {images.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl border border-gray-200 overflow-hidden group bg-gray-50">
                <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute inset-0 bg-red-900/60 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center font-bold text-xs uppercase tracking-widest transition-opacity backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-slate-900 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded shadow-sm">Primary</span>
                )}
              </div>
            ))}
            
            {/* Upload Button Box */}
            <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-slate-800 bg-gray-50 hover:bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-colors group">
              <span className="text-3xl text-gray-300 group-hover:text-slate-800 mb-1 transition-colors">+</span>
              <span className="text-xs font-bold text-gray-400 group-hover:text-slate-800 uppercase tracking-widest transition-colors">Upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 font-bold text-sm uppercase tracking-widest shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Publishing..." : "Publish Product to Storefront"}
          </button>
        </div>
      </form>
    </div>
  );
}
