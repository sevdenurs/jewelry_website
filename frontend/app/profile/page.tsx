"use client";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auth durumu yüklendiğinde kontrol et
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

  // Loading durumunda spinner göster
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı yoksa null döndür (redirect zaten useEffect'te yapılıyor)
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Profil</h1>
          <p className="mt-2 text-gray-600">Hoşgeldin!</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-medium text-gray-800">Hesap Bilgileri</h2>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Kullanıcı ID:</span> {user.uid}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Kayıt Tarihi:</span>{" "}
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("tr-TR")
                  : "Bilinmiyor"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Son Giriş:</span>{" "}
                {user.metadata.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString("tr-TR")
                  : "Bilinmiyor"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-600 p-3 text-white font-semibold shadow-md transition hover:bg-red-700"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}