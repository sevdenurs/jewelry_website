import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo / Site Adı */}
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-800">
            Jewelry.
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Zarif tasarımlar, ömür boyu ışıltı.
          </p>
        </div>

        {/* Linkler */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 uppercase">Bağlantılar</h3>
          <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">
            Hakkımızda
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">
            İletişim
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-800 text-sm">
            Kargo & İade
          </a>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-2">Bizi Takip Edin</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-white hover:bg-black transition"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-white hover:bg-black transition"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-white hover:bg-black transition"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Jewelry. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
