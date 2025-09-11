"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Hoşgeldiniz
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Jewelry hesabınıza giriş yapın
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="ornek@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black p-3 text-white font-semibold shadow-md transition hover:bg-gray-800"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Şifremi Unuttum
          </a>
          <a href="#" className="hover:underline">
            Yeni Hesap Oluştur
          </a>
        </div>
      </div>
    </div>
  );
}
