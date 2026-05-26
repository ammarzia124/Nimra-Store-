import React from "react";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/lib/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find product by ID from our mock database, or fall back to a generic one
  const product = products.find(p => p.id === id) || {
    id: id,
    name: "Exclusive Engineered Piece",
    category: "men",
    price: 195.00,
    image: "/images/hero-1.png",
    stock: 10
  };

  return (
    <main className="min-h-screen bg-white">
      <ProductDetail productData={product as any} />
    </main>
  );
}
