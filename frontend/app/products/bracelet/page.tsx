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

export default function BraceletPage() {
  const [bracelets, setBracelets] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=bracelet`)
      .then((res) => res.json())
      .then((data) => setBracelets(data.items ?? data))
      .catch((e) => console.error("Bracelet fetch error:", e));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
        Bracelets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bracelets.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
