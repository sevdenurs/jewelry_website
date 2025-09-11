// app.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // db bağlantısı

const app = express();
const PORT = process.env.PORT || 3001;

/** Middleware */
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(express.json());

/** DB testi */
db.getConnection((err, conn) => {
 if (err) {
   console.error("MySQL bağlantı HATASI:", err);
 } else {
   console.log("MySQL bağlantısı OK");
   conn.release();
 }
});


app.get("/api/products", (req, res) => {
 const { category, q } = req.query;

 // Debug için konsola yazdır
 console.log('Gelen kategori:', category);
 console.log('Arama kelimesi:', q);

 let sql = "SELECT id, name, price, image, category FROM products";
 const params = [];
 const where = [];

 // Kategori filtresi
 if (category) {
   where.push("category = ?");
   params.push(category);
 }

 // İsim araması
 if (q && q.trim()) {
   where.push("name LIKE ?");
   params.push(`%${q.trim()}%`);
 }

 // WHERE koşulları varsa ekle
 if (where.length > 0) {
   sql += " WHERE " + where.join(" AND ");
 }

 sql += " ORDER BY id DESC";

 console.log('SQL sorgusu:', sql);
 console.log('Parametreler:', params);

 db.query(sql, params, (err, rows) => {
   if (err) {
     console.error("Sorgu hatası:", err);
     return res.status(500).json({ error: "Veritabanı hatası" });
   }

   console.log('Bulunan ürün sayısı:', rows.length);
   res.json(rows);
 });
});

/** GET /api/products/:id — tek ürün */
app.get("/api/products/:id", (req, res) => {
 const id = parseInt(req.params.id, 10);
 if (Number.isNaN(id)) return res.status(400).json({ error: "Geçersiz id" });

 db.query(
   "SELECT id, name, price, image, category FROM products WHERE id = ?",
   [id],
   (err, rows) => {
     if (err) {
       console.error("Get by id error:", err);
       return res.status(500).json({ error: "Internal server error" });
     }
     if (!rows.length) return res.status(404).json({ error: "Not found" });
     res.json(rows[0]);
   }
 );
});

/** Basit rotalar */
app.get("/", (_req, res) => res.json({ message: "Welcome to Express API 🚀" }));
app.get("/about", (_req, res) => res.json({ message: "About this API 🚀" }));

/** 404 */
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

/** Error handler */
app.use((err, _req, res, _next) => {
 console.error(err.stack);
 res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});