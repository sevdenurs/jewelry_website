import ProductCard from "@/components/ProductCard";
import { products, Product } from "../../data/products";

export default function BraceletPage() {
  const bracelets = products.filter((p: Product) => p.category === "bracelet");

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
