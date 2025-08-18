export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
      
      {/* Feature 1 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">Şık Tasarımlar</h2>
        <p className="text-gray-600">Her tarza uygun modern takı koleksiyonu.</p>
      </div>
      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-md shadow" />
      </div>

      {/* Feature 2 */}
      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full shadow" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">Güvenli Ödeme</h2>
        <p className="text-gray-600">SSL sertifikalı, güvenli alışveriş deneyimi.</p>
      </div>

      {/* Feature 3 */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">Hızlı Kargo</h2>
        <p className="text-gray-600">Türkiye’nin her yerine hızlı gönderim.</p>
      </div>
      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
        <div className="w-12 h-12 bg-white shadow rounded" />
      </div>

    </div>
  );
}
