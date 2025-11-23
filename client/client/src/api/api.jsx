// src/api/api.jsx
const API_BASE = "http://localhost:3000/api"; // matches your backend index.js

// GET /api/products  -> all products
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// GET /api/products/:id -> single product
export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
