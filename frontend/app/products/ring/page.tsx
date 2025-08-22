import ProductCard from "@/components/ProductCard";
import { products, Product } from "../../data/products";

export default function RingPage() {
  const rings = products.filter((p: Product) => p.category === "ring");

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
