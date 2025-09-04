"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "ring" | "necklace" | "earring" | "bracelet";
}

export default function RingPage() {
  const [rings, setRings] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=ring`)
    .then(r => r.json())
    .then((data) => setRings(data.items ?? data)) // eski düz dizi kalırsa da çalışsın
    .catch(e => console.error("Ring fetch error:", e));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
        Rings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {rings.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
