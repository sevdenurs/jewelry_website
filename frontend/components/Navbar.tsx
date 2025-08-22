"use client";

import { useState } from "react";
import { FaShoppingBag, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dinamik route için slug kullandık
  const navLinks = [
    { name: "Yüzük", slug: "ring" },
    { name: "Kolye", slug: "necklace" },
    { name: "Küpe", slug: "earring" },
    { name: "Bileklik", slug: "bracelet" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-serif font-bold text-gray-800">
          Jewelry.
        </Link>

        {/* Desktop Menü */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.slug}
              href={`/products/${link.slug}`}
              className="text-gray-600 hover:text-black transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Sağ İkonlar */}
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="text-gray-600 hover:text-black">
            <FaUser size={18} />
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-black">
            <FaShoppingBag size={18} />
            {/* Sepette ürün sayısı örnek */}
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>
          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 hover:text-black"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.slug}
              href={`/products/${link.slug}`}
              className="block text-gray-600 hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
