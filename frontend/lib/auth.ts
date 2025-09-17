import { auth, googleProvider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Kullanıcı verisini Firestore'a kaydetme fonksiyonu
export const saveUserToDatabase = async (user: User, additionalData?: Record<string, unknown>) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  
  try {
    // Önce kullanıcının zaten var olup olmadığını kontrol et
    const userSnapshot = await getDoc(userRef);
    
    if (!userSnapshot.exists()) {
      // Kullanıcı yoksa yeni kayıt oluştur
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        ...additionalData,
      });
      console.log("Yeni kullanıcı veritabanına kaydedildi:", user.uid);
    } else {
      // Kullanıcı varsa sadece son giriş zamanını güncelle
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
      }, { merge: true });
      console.log("Kullanıcı giriş zamanı güncellendi:", user.uid);
    }
  } catch (error) {
    console.error("Kullanıcı veritabanına kaydedilirken hata:", error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Yeni kullanıcıyı veritabanına kaydet
    await saveUserToDatabase(result.user, { 
      signUpMethod: "email",
      isEmailVerified: result.user.emailVerified 
    });
    return result;
  } catch (error) {
    console.error("Email ile kayıt olurken hata:", error);
    throw error;
  }
};

export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Giriş yapan kullanıcının bilgilerini güncelle
    await saveUserToDatabase(result.user);
    return result;
  } catch (error) {
    console.error("Email ile giriş yaparken hata:", error);
    throw error;
  }
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Google ile giriş yapan kullanıcıyı kaydet
    await saveUserToDatabase(result.user, { 
      signUpMethod: "google",
      isEmailVerified: result.user.emailVerified 
    });
    return result;
  } catch (error) {
    console.error("Google ile giriş yaparken hata:", error);
    throw error;
  }
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};