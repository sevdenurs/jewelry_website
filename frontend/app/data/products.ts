export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "ring" | "necklace" | "earring" | "bracelet";
}
export const products: Product[] = [
  // Rings
  { id: 1, name: "Minimal Ring", price: 750, image: "/images/photo1.jpg", category: "ring" },
  { id: 2, name: "Stone Ring", price: 950, image: "/images/photo2.jpg", category: "ring" },
  { id: 3, name: "Gold Ring", price: 1350, image: "/images/photo3.jpg", category: "ring" },

  // Necklaces
  { id: 4, name: "Gold Necklace", price: 1200, image: "/images/photo4.jpg", category: "necklace" },
  { id: 5, name: "Silver Necklace", price: 890, image: "/images/photo1.jpg", category: "necklace" },
  { id: 6, name: "Pearl Necklace", price: 1600, image: "/images/photo2.jpg", category: "necklace" },

  // Earrings
  { id: 7, name: "Silver Earrings", price: 550, image: "/images/photo3.jpg", category: "earring" },
  { id: 8, name: "Gold Hoop Earrings", price: 780, image: "/images/photo4.jpg", category: "earring" },
  { id: 9, name: "Diamond Earrings", price: 2100, image: "/images/photo1.jpg", category: "earring" },

  // Bracelets
  { id: 10, name: "Diamond Bracelet", price: 2200, image: "/images/photo2.jpg", category: "bracelet" },
  { id: 11, name: "Gold Bracelet", price: 1300, image: "/images/photo3.jpg", category: "bracelet" },
  { id: 12, name: "Silver Chain", price: 600, image: "/images/photo4.jpg", category: "bracelet" },
];
