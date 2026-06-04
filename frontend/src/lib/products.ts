export interface Product {
  id: string;
  name: string;
  category: "men" | "women" | "kids" | "beauty" | "accessories";
  price: number;
  image: string;
  stock: number;
  description?: string;
  tag?: string;
  discount?: number;
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
    // Map of mock images by category
    const mockImages: Record<string, string[]> = {
      women: [
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
      ],
      kids: [
        "https://images.unsplash.com/photo-1519238396349-299f1504938a?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1920&auto=format&fit=crop"
      ],
      men: [
        "/images/hero-1.png",
        "/images/hero-2.png"
      ]
    };
    const images = mockImages[category] || [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&auto=format&fit=crop"
    ];

    // Fill with mock if empty for the selected category
    return Array.from({ length: 24 }).map((_, i) => ({
      id: `${category}-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Performance Piece ${i + 1}`,
      category: category as "men" | "women" | "kids" | "beauty" | "accessories",
      price: 120 + (i * 10),
      image: images[i % images.length],
      stock: i % 5 === 0 ? 3 : 10,
      description: "Premium engineered fit with advanced materials for everyday performance.",
      tag: i % 8 === 0 ? "Limited" : undefined
    }));
  }

  // Add mock descriptions to base products
  const baseWithDescriptions = base.map(p => ({
    ...p,
    description: p.description || "Premium engineered fit with advanced materials for everyday performance."
  }));

  return [...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions].slice(0, 24);
};
