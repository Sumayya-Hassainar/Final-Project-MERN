import React from 'react';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';

// dummy products just for UI
const sampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    price: 2499,
    vendor: 'TechWorld',
    image:
      'https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 2,
    name: 'Smartphone 5G 128GB',
    price: 18999,
    vendor: 'MobileHub',
    image:
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 3,
    name: 'Casual Men’s Sneakers',
    price: 1499,
    vendor: 'Urban Style',
    image:
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 4,
    name: 'Minimal Wooden Chair',
    price: 2199,
    vendor: 'HomeCraft',
    image:
      'https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero carousel */}
      <Carousel />

      {/* Features section */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Why shop with MarketVerse?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-1 text-sm">
              Multi-vendor marketplace
            </h3>
            <p className="text-xs text-gray-600">
              Discover products from multiple vendors in one unified platform.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-1 text-sm">
              Secure payments & refunds
            </h3>
            <p className="text-xs text-gray-600">
              End-to-end encrypted payments with safe refund processing.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-1 text-sm">
              Real-time order tracking
            </h3>
            <p className="text-xs text-gray-600">
              Track your orders from processing to delivery in real time.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-1 text-sm">
              Ratings & reviews
            </h3>
            <p className="text-xs text-gray-600">
              Make better decisions with verified customer reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Featured products</h2>
          <button className="text-sm text-indigo-600 hover:underline">
            View all
          </button>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {sampleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
