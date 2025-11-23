import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setRole }) {
  const [selectedRole, setSelectedRole] = useState('customer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // here you will actually call backend to login
    setRole(selectedRole);

    if (selectedRole === 'vendor') navigate('/vendor');
    else if (selectedRole === 'admin') navigate('/admin');
    else navigate('/products');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Email (demo)
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="demo@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Password (demo)
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="********"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Login as (just for demo)
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 text-sm rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
