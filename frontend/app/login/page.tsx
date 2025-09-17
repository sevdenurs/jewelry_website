"use client";
import { useState, useEffect } from "react";
import { loginWithEmail, loginWithGoogle } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Eğer kullanıcı zaten giriş yapmışsa profile'a yönlendir
  useEffect(() => {
    if (!loading && user) {
      router.push("/profile");
    }
  }, [user, loading, router]);

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      await loginWithEmail(email, password);
      // Auth context otomatik olarak güncellenecek ve useEffect ile yönlendirilecek
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(getErrorMessage(err.code));
      } else {
        setError("Bilinmeyen bir hata oluştu");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      await loginWithGoogle();
      // Auth context otomatik olarak güncellenecek ve useEffect ile yönlendirilecek
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(getErrorMessage(err.code));
      } else {
        setError("Bilinmeyen bir hata oluştu");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.";
      case "auth/wrong-password":
        return "Yanlış şifre girdiniz.";
      case "auth/invalid-email":
        return "Geçersiz e-posta adresi.";
      case "auth/user-disabled":
        return "Bu hesap devre dışı bırakılmış.";
      case "auth/too-many-requests":
        return "Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.";
      case "auth/invalid-credential":
        return "E-posta veya şifre hatalı.";
      default:
        return "Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.";
    }
  };

  // Auth yüklenirken loading göster
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

  // Kullanıcı giriş yapmışsa null döndür (redirect zaten useEffect'te yapılıyor)
  if (user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Hoşgeldiniz</h2>
        <p className="mt-2 text-center text-gray-500">Jewelry hesabınıza giriş yapın</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="ornek@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="********"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleEmailLogin}
            disabled={isLoading || !email || !password}
            className="w-full rounded-lg bg-black p-3 text-white font-semibold shadow-md transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </div>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">veya</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="mt-4 w-full flex items-center justify-center rounded-lg border border-gray-300 p-3 text-gray-700 font-semibold shadow-sm transition hover:bg-gray-50 disabled:bg-gray-100"
          >
            Google ile Giriş Yap
          </button>
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <button 
            onClick={() => {
              console.log("Şifremi Unuttum butonuna tıklandı");
              alert("Şifremi Unuttum tıklandı");
            }}
            className="hover:underline"
          >
            Şifremi Unuttum
          </button>
          <button 
            onClick={() => {
              console.log("Register butonuna tıklandı");
              alert("Register butonuna tıklandı - yönlendiriliyor...");
              router.push("/register");
            }} 
            className="hover:underline"
          >
            Yeni Hesap Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
