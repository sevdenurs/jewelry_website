import { useState, useEffect } from "react";

// Kullanıcı türü için interface
interface User {
  id?: number;
  isLoggedIn: boolean;
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User>({ isLoggedIn: false });

  // Kullanıcı durumunu kontrol et (bu fonksiyonu kendi auth sisteminize göre düzenleyin)
  const checkUserStatus = () => {
    // Örnek: JWT token kontrolü veya session kontrolü
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    
    if (token && userId) {
      setUser({ id: parseInt(userId), isLoggedIn: true });
      return true;
    }
    return false;
  };

  useEffect(() => {
    const isLoggedIn = checkUserStatus();
    
    if (isLoggedIn) {
      // Giriş yapmış kullanıcı - localStorage kullan
      const saved = localStorage.getItem(`wishlist_${user.id}`);
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } else {
      // Giriş yapmamış kullanıcı - sessionStorage kullan
      const saved = sessionStorage.getItem("guest_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    }
  }, [user.id]);

  const toggleWishlist = (id: number) => {
    let updated: number[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    
    setWishlist(updated);
    
    // Kullanıcı durumuna göre kaydetme
    if (user.isLoggedIn && user.id) {
      // Giriş yapmış kullanıcı için localStorage
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updated));
      
      // İsteğe bağlı: Backend'e de gönder
      // saveWishlistToBackend(user.id, updated);
    } else {
      // Misafir kullanıcı için sessionStorage
      sessionStorage.setItem("guest_wishlist", JSON.stringify(updated));
      
      if (updated.length > 0 && !user.isLoggedIn) {
        // Toast notification veya modal gösterebilirsin
        console.log("Favorilerinizi kalıcı olarak kaydetmek için giriş yapın!");
      }
    }
  };

  // Misafir wishlist'i giriş yaptıktan sonra taşı
  const migrateGuestWishlist = (userId: number) => {
    const guestWishlist = sessionStorage.getItem("guest_wishlist");
    if (guestWishlist) {
      const guestItems = JSON.parse(guestWishlist);
      const existingWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || "[]");
      
      // Birleştir ve tekrarları kaldır
      const merged = [...new Set([...existingWishlist, ...guestItems])];
      
      localStorage.setItem(`wishlist_${userId}`, JSON.stringify(merged));
      sessionStorage.removeItem("guest_wishlist");
      setWishlist(merged);
    }
  };

  // Wishlist'i temizle
  const clearWishlist = () => {
    setWishlist([]);
    if (user.isLoggedIn && user.id) {
      localStorage.removeItem(`wishlist_${user.id}`);
    } else {
      sessionStorage.removeItem("guest_wishlist");
    }
  };

  // Backend'e kaydetme fonksiyonu (isteğe bağlı)
  const saveWishlistToBackend = async (userId: number, wishlistItems: number[]) => {
    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          userId,
          items: wishlistItems
        })
      });
    } catch (error) {
      console.error('Wishlist backend kaydetme hatası:', error);
    }
  };

  return { 
    wishlist, 
    toggleWishlist, 
    clearWishlist,
    migrateGuestWishlist,
    user,
    wishlistCount: wishlist.length 
  };
}