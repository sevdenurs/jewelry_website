import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const products = [
    { name: "Minimal Yüzük", price: 750, image: "/images/photo1.jpg" },
    { name: "Altın Kolye", price: 1200, image: "/images/photo2.jpg" },
    { name: "Gümüş Küpe", price: 550, image: "/images/photo3.jpg" },
    { name: "Pırlanta Bileklik", price: 2200, image: "/images/photo4.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-100">
        <Image
          src="/images/photo1.jpg"
          alt="Takı koleksiyonu"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Zarif Takı Koleksiyonu
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Güzelliğinizi öne çıkaracak özel parçalar
          </p>
          <button className="mt-6 rounded-md bg-white text-black px-6 py-3 text-sm md:text-base font-medium hover:bg-gray-200 transition">
            Koleksiyonu Keşfet
          </button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-8">
          Yeni Gelenler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p, idx) => (
            <ProductCard key={idx} {...p} />
          ))}
        </div>
      </section>

    </div>
  );
}
