import ProductCard from "../../components/ProductCard";

const products = [
  { id: 1, name: "Altın Kolye", price: 2500, image: "/necklace.jpg" },
  { id: 2, name: "Gümüş Yüzük", price: 1200, image: "/ring.jpg" },
  { id: 3, name: "Pırlanta Küpe", price: 5000, image: "/earring.jpg" },
];

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
