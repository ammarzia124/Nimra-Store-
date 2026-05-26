import React from 'react';
import ProductDetail from '@/components/ProductDetail';

export const metadata = {
  title: 'Premium PDP Demo | Nimra Website',
  description: 'High-end Product Detail Page component demo',
};

export default function PDPDemoPage() {
  return (
    <main className="min-h-screen bg-white">
      <ProductDetail />
    </main>
  );
}
