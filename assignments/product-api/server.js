const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

let products = [];
const categories = ["Electronics", "Books", "Fashion", "Sports", "Home", "Toys"];

for (let i = 1; i <= 100; i++) {
  products.push({
    id: i,
    name: `Product ${i}`,
    price: 50 + (i * 5),
    category: categories[i % categories.length],
    stock: 100 - (i % 50)
  });
}

app.get("/products", (req, res) => res.json(products));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
