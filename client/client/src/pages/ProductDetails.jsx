// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 👈 NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setSelectedImageIndex(0); // reset when product changes
      } catch (err) {
        console.error("Product detail error:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-600">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-red-600">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://via.placeholder.com/600x400?text=No+Image"];

  const mainImage = images[selectedImageIndex]; // 👈 use selected image

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-2">
      {/* Images */}
      <div>
        <div className="w-full h-72 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)} // 👈 click to change
                className={`border rounded-md overflow-hidden h-16 w-16 flex-shrink-0 ${
                  i === selectedImageIndex
                    ? "border-indigo-600 ring-2 ring-indigo-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
        <p className="text-sm text-gray-600 mb-3">
          {product.description || "No description available."}
        </p>

        <div className="mb-3 text-sm">
          <span className="text-gray-500">Category: </span>
          <span className="font-medium">
            {product.category?.name || product.category || "N/A"}
          </span>
        </div>

        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price}
            </span>
          )}
          {product.stock > 0 ? (
            <span className="text-sm text-green-600">
              In stock ({product.stock})
            </span>
          ) : (
            <span className="text-sm text-red-600">Out of stock</span>
          )}
        </div>

        <button className="w-full md:w-auto bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
          Add to cart
        </button>

        <div className="mt-4 text-xs text-gray-500">
          Sold by:{" "}
          <span className="font-medium">
            {product.vendor?.name || product.vendor?.storeName || "Vendor"}
          </span>
        </div>
      </div>
    </div>
  );
}
