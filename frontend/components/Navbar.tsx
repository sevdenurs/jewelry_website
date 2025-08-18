import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold"> Takı Dünyası</h1>
      <div className="flex space-x-6 text-gray-700 font-medium">
        <Link href="/">Ana Sayfa</Link>
        <Link href="/products">Ürünler</Link>
        <Link href="/login">Giriş</Link>
        <Link href="/register">Kayıt Ol</Link>
      </div>
    </nav>
  );
}
