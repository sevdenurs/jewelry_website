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

/** GET /api/products
 *  Query:
 *   - category: ring|necklace|earring|bracelet
 *   - q: isim içinde arama
 *   - page, limit: sayfalama
 */
app.get("/api/products", (req, res) => {
  try {
    const { category, q } = req.query;
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const offset = (page - 1) * limit;

    const where = [];
    const params = [];

    // güvenli whitelist
    const allowed = ["ring", "necklace", "earring", "bracelet"];
    if (category) {
      if (!allowed.includes(category)) {
        return res.status(400).json({ error: "Geçersiz kategori" });
      }
      where.push("category = ?");
      params.push(category);
    }

    if (q && q.trim()) {
      where.push("name LIKE ?");
      params.push(`%${q.trim()}%`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const sql = `
      SELECT id, name, price, image, category
      FROM products
      ${whereSql}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = `
      SELECT COUNT(*) as total
      FROM products
      ${whereSql}
    `;

    // önce toplam sayıyı çek
    db.query(countSql, params, (err1, countRows) => {
      if (err1) {
        console.error("Count error:", err1);
        return res.status(500).json({ error: "Internal server error" });
      }
      const total = countRows?.[0]?.total || 0;

      db.query(sql, [...params, limit, offset], (err2, rows) => {
        if (err2) {
          console.error("List error:", err2);
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({
          page,
          limit,
          total,
          items: rows,
        });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** GET /api/products/:id  — tek ürün */
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
