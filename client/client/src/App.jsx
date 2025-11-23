import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchResults from './pages/SearchResults';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetails';

export default function App() {
  // fake auth state for now: guest | customer | vendor | admin
  const [role, setRole] = useState('guest');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header role={role} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/search" element={<SearchResults/>} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage setRole={setRole} />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected: vendor only */}
            <Route
              path="/vendor"
              element={
                role === 'vendor' ? (
                  <VendorDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Protected: admin only */}
            <Route
              path="/admin"
              element={
                role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={
                <div className="max-w-4xl mx-auto px-4 py-10">
                  <h1 className="text-2xl font-semibold mb-2">
                    404 - Page not found
                  </h1>
                  <p className="text-gray-600">
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
