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

import productData from './productData.json';

export const products: Product[] = productData as Product[];

// Helper to get products by category
export const getProductsByCategory = (category: string) => {
  const base = products.filter(p => p.category === category || category === "all");
  
  if (base.length === 0) {
    const uniqueImages = {
      women: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539008835154-732475dbe134?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550614000-4b95d466f2fb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
      ],
      kids: [
        "https://images.unsplash.com/photo-1519238396349-299f1504938a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop",
      ],
      men: [
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
      ]
    };
    
    const images = uniqueImages[category as keyof typeof uniqueImages] || [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    ];

    return Array.from({ length: 24 }).map((_, i) => ({
      id: `${category}-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Performance Piece ${i + 1}`,
      category: category as "men" | "women" | "kids" | "beauty" | "accessories",
      price: 120 + (i * 10),
      image: images[i % images.length],
      secondaryImage: images[(i + 1) % images.length],
      stock: i % 5 === 0 ? 3 : 10,
      description: "Premium engineered fit with advanced materials for everyday performance.",
      tag: i % 8 === 0 ? "Limited" : undefined
    }));
  }

  const baseWithDescriptions = base.map((p, i) => ({
    ...p,
    description: p.description || "Premium engineered fit with advanced materials for everyday performance.",
    secondaryImage: base[(i + 1) % base.length]?.image || p.image
  }));

  const extendedBase = [...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions, ...baseWithDescriptions].slice(0, 24);
  
  // Make duplicates visually distinct if they repeat the base
  return extendedBase.map((p, i) => ({
    ...p,
    id: `${p.id}-${i}`,
  }));
};
