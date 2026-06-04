"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  description?: string;
  secondaryImage?: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const router = useRouter();

  // Modal and Toast State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/admin/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        showToast("Product deleted securely.");
      } else {
        showToast("Failed to delete", "error");
      }
    } catch (err) {
      console.error("Failed to delete product");
      showToast("Error connecting to server", "error");
    } finally {
      setProductToDelete(null);
    }
  };

  const openAddModal = () => {
    setEditingProduct({ name: '', category: 'women', price: 0, image: '', stock: 0, description: '', secondaryImage: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const saveProduct = async () => {
    const isEdit = modalMode === 'edit';
    const url = isEdit ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      
      if (data.success) {
        if (isEdit) {
          setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p));
          showToast("Product Updated Successfully!");
        } else {
          setProducts([{ ...editingProduct, id: data.product?.id || `new-${Date.now()}` } as Product, ...products]);
          showToast("Product Added Successfully!");
        }
        setIsModalOpen(false);
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch (err) {
      showToast("Failed to save product", "error");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your storefront products safely.</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={openAddModal}
            className="flex-1 sm:flex-none text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all text-sm shadow-sm"
          >
            + Add New Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Total Products</span>
          <span className="text-4xl font-bold text-gray-900">{products.length}</span>
          <div className="w-10 h-1 bg-blue-600 rounded-full mt-5" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Active Items</span>
          <span className="text-4xl font-bold text-gray-900">{products.filter(p => p.stock > 0).length}</span>
          <div className="w-10 h-1 bg-green-500 rounded-full mt-5" />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Low Stock</span>
          <span className="text-4xl font-bold text-gray-900">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</span>
          <div className="w-10 h-1 bg-amber-400 rounded-full mt-5" />
        </div>
      </div>

      {/* Product Feed Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Current Inventory</h2>
        
        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm font-medium">Loading inventory...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm font-medium bg-gray-50 rounded-xl">
            Your inventory is empty. Click "Add New Product" to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-widest bg-gray-50/50">
                  <th className="py-4 font-bold pl-6 rounded-tl-xl">Product</th>
                  <th className="py-4 font-bold">Category</th>
                  <th className="py-4 font-bold">Price</th>
                  <th className="py-4 font-bold">Status</th>
                  <th className="py-4 font-bold text-right pr-6 rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 pl-6 flex items-center gap-4">
                      <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.image || "/placeholder.png"} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{product.name}</span>
                    </td>
                    <td className="py-4 text-gray-600 capitalize text-sm">{product.category}</td>
                    <td className="py-4 text-gray-900 font-medium text-sm">${product.price.toFixed(2)}</td>
                    <td className="py-4">
                      {product.stock > 5 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-800">Active</span>
                      ) : product.stock > 0 ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-amber-100 text-amber-800">Low Stock</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-red-100 text-red-800">Empty</span>
                      )}
                    </td>
                    <td className="py-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg font-bold transition-colors text-xs border border-transparent hover:border-blue-200 uppercase tracking-wide"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg font-bold transition-colors text-xs border border-transparent hover:border-red-200 uppercase tracking-wide"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Friendly Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              Are you sure you want to permanently delete <span className="font-bold text-gray-900">"{productToDelete.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                Keep It
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-sm transition-colors text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' ? "Add New Product" : "Edit Product"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Title</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="e.g. Classic Silk Shirt"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Category</label>
                  <select
                    value={editingProduct.category || 'women'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                    <option value="beauty">Beauty</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Price ($)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Describe the product details..."
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Product Media (URLs)</h4>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] uppercase text-gray-400">Primary Image URL</label>
                    <input
                      type="text"
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 transition-all"
                      placeholder="https://..."
                    />
                    {editingProduct.image && (
                      <div className="mt-2 relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        <img src={editingProduct.image} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] uppercase text-gray-400">Hover/Secondary Image URL</label>
                    <input
                      type="text"
                      value={editingProduct.secondaryImage || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, secondaryImage: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-blue-500 transition-all"
                      placeholder="https://..."
                    />
                    {editingProduct.secondaryImage && (
                      <div className="mt-2 relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        <img src={editingProduct.secondaryImage} alt="Secondary Preview" className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm text-sm"
              >
                {modalMode === 'add' ? "Create Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elegant Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[120] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border ${
            toast.type === 'success' ? 'bg-white border-green-100 text-gray-800' : 'bg-white border-red-100 text-gray-800'
          }`}>
            {toast.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            <p className="font-bold text-sm tracking-wide">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
