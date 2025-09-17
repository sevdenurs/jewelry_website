"use client";
import { useState, useEffect } from "react";
import { signUpWithEmail } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Eğer kullanıcı zaten giriş yapmışsa profile'a yönlendir
  useEffect(() => {
    console.log("Register useEffect - loading:", loading, "user:", user?.uid);
    if (!loading && user) {
      console.log("User var, profile'a yönlendiriliyor...");
      router.push("/profile");
    }
  }, [user, loading, router]);

  const handleSignup = async () => {
    try {
      console.log("Signup başlatılıyor...");
      setError("");
      
      // Basit validasyonlar
      if (password !== confirmPassword) {
        setError("Şifreler eşleşmiyor");
        return;
      }
      
      if (password.length < 6) {
        setError("Şifre en az 6 karakter olmalıdır");
        return;
      }
      
      setIsLoading(true);
      console.log("Firebase signup çağrılıyor...");
      const result = await signUpWithEmail(email, password);
      console.log("Signup başarılı:", result.user.uid);
      
      // Auth context otomatik olarak güncellenecek ve useEffect ile yönlendirilecek
    } catch (err: unknown) {
      console.error("Signup hatası:", err);
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
      case "auth/email-already-in-use":
        return "Bu e-posta adresi zaten kullanılıyor.";
      case "auth/invalid-email":
        return "Geçersiz e-posta adresi.";
      case "auth/weak-password":
        return "Şifre çok zayıf. En az 6 karakter olmalıdır.";
      case "auth/operation-not-allowed":
        return "E-posta/şifre ile kayıt şu anda devre dışı.";
      default:
        return "Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.";
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
        <h2 className="text-3xl font-bold text-center text-gray-800">Yeni Hesap Oluştur</h2>
        <p className="mt-2 text-center text-gray-500">Jewelry için kayıt olun</p>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="********"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            disabled={isLoading || !email || !password || !confirmPassword}
            className="w-full rounded-lg bg-black p-3 text-white font-semibold shadow-md transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? "Kayıt olunuyor..." : "Kayıt Ol"}
          </button>
        </div>

        <div className="mt-6 flex justify-center text-sm text-gray-600">
          <button onClick={() => router.push("/login")} className="hover:underline">
            Zaten hesabınız var mı? Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}