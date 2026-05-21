export interface Product {
  id: string;
  name: string;
  category: "men" | "women" | "kids" | "beauty" | "accessories";
  price: number;
  image: string;
  stock: number;
  tag?: string;
}

export const products: Product[] = [
  // Men's Collection
  { id: "m1", name: "Modular Shell Jacket", category: "men", price: 450, image: "/images/hero-1.png", stock: 3, tag: "System 01" },
  { id: "m2", name: "Kinetic Cargo Pants", category: "men", price: 280, image: "/images/cat-kinetic.png", stock: 12 },
  { id: "m3", name: "Technical Mid-Layer", category: "men", price: 180, image: "/images/cat-modular.png", stock: 4, tag: "New Release" },
  { id: "m4", name: "Utility Vest v2", category: "men", price: 220, image: "/images/hero-2.png", stock: 15 },
  // Kids' Collection
  { id: "k1", name: "Junior Tech Parka", category: "kids", price: 180, image: "/images/kids-hero.png", stock: 10, tag: "New" },
  { id: "k2", name: "Mini Cargo Joggers", category: "kids", price: 95, image: "/images/hero-4.png", stock: 5 },
  { id: "k3", name: "Kids Active Tee", category: "kids", price: 45, image: "/images/hero-5.png", stock: 20 },
];

// Helper to get products by category
export const getProductsByCategory = (category: string) => {
  // For demonstration, we'll repeat the base products to reach 20+
  const base = products.filter(p => p.category === category || category === "all");
  if (base.length === 0) {
    // Fill with mock if empty for the selected category
    return Array.from({ length: 24 }).map((_, i) => ({
      id: `${category}-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Performance Piece ${i + 1}`,
      category: category as any,
      price: 120 + (i * 10),
      image: i % 2 === 0 ? "/images/hero-1.png" : "/images/hero-2.png",
      stock: i % 5 === 0 ? 3 : 10,
      tag: i % 8 === 0 ? "Limited" : undefined
    }));
  }
  return [...base, ...base, ...base, ...base, ...base].slice(0, 24);
};
