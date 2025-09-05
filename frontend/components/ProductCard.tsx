import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlist } from "../hooks/useWishlist";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <div className="group cursor-pointer relative">
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 border border-gray-200"
      >
        {isWishlisted ? (
          <AiFillHeart size={22} className="text-red-500 hover:text-red-600" />
        ) : (
          <AiOutlineHeart size={22} className="text-gray-500 hover:text-red-400" />
        )}
      </button>

      {/* Ürün görseli */}
      <div className="overflow-hidden rounded-lg aspect-square relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Wishlist durumunu gösteren overlay */}
        {isWishlisted && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-br-lg">
            ❤️ Favorilerde
          </div>
        )}
      </div>

      {/* Ürün adı ve fiyat */}
      <h3 className="mt-2 text-sm text-gray-700">{name}</h3>
      <p className="text-gray-900 font-semibold">{price} ₺</p>

      {/* Sepete ekle */}
      <button className="mt-2 w-full rounded-md bg-black text-white py-2 text-sm transition hover:bg-gray-800">
        Sepete Ekle
      </button>
    </div>
  );
}