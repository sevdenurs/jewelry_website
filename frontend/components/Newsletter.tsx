// components/Newsletter.tsx
export default function Newsletter() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h3 className="text-2xl font-serif font-semibold">%10 indirim kazanın</h3>
      <p className="text-gray-600 mt-2">Bültene katılın, yeni ürün ve kampanyaları kaçırmayın.</p>
      <form className="mt-6 flex gap-2">
        <input type="email" required placeholder="E‑posta adresiniz"
          className="flex-1 border rounded-md px-4 py-3" />
        <button className="px-5 py-3 rounded-md bg-black text-white hover:bg-gray-800">Kaydol</button>
      </form>
      <p className="text-xs text-gray-500 mt-2">Kaydolarak KVKK ve gizlilik politikasını kabul edersiniz.</p>
    </section>
  );
}
