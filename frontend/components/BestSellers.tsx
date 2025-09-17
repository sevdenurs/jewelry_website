"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function BestSellers() {
  const [items, setItems] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?limit=10`)
      .then(r => r.json()).then(d => setItems(d.items ?? d));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-serif font-semibold mb-6">Çok Satanlar</h2>
      <div className="flex gap-6 overflow-x-auto snap-x pb-2">
        {items.map(p => (
          <div key={p.id} className="min-w-[260px] snap-start">
            <ProductCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}