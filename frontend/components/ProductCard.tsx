interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-6 flex flex-col items-center">
      <div className="bg-gray-100 w-32 h-32 rounded mb-4 flex items-center justify-center">
        <span className="text-gray-400">📦</span>
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.price} TL</p>
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Satın Al
      </button>
    </div>
  );
}
