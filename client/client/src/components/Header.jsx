import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ role }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white font-bold rounded-md px-3 py-1 text-sm">
            MV
          </div>
          <span className="font-semibold text-lg tracking-tight">
            MarketVerse
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700 ml-4">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link to="/products" className="hover:text-indigo-600">
            Products
          </Link>
          <Link to="/cart" className="hover:text-indigo-600">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-indigo-600">
            Orders
          </Link>

          {/* Vendor & Admin links: only when logged in as them */}
          {role === 'vendor' && (
            <Link to="/vendor" className="hover:text-indigo-600">
              Vendor Dashboard
            </Link>
          )}
          {role === 'admin' && (
            <Link to="/admin" className="hover:text-indigo-600">
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center max-w-md ml-auto"
        >
          <input
            type="text"
            value={query}
            placeholder="Search products…"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-l-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-r-md hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        {/* Auth */}
        <div className="hidden sm:flex items-center gap-2 text-sm ml-3">
          <Link
            to="/login"
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
