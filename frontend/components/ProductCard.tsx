import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-lg aspect-square">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 text-sm text-gray-700">{name}</h3>
      <p className="text-gray-900 font-semibold">{price} ₺</p>
      <button className="mt-2 w-full rounded-md bg-black text-white py-2 text-sm transition hover:bg-gray-800">
        Sepete Ekle
      </button>
    </div>
  );
}
