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

export default function NecklacePage() {
  const [necklaces, setNecklaces] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?category=necklace`)
      .then((res) => res.json())
      .then((data) => setNecklaces(data.items ?? data))
      .catch((e) => console.error("Necklace fetch error:", e));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
        Necklaces
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {necklaces.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
