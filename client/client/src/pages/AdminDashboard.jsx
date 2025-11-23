import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-3">Admin Dashboard</h1>
      <p className="text-gray-600 text-sm mb-4">
        Only logged-in admins can access this page.
      </p>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Manage vendors and customers</li>
        <li>Monitor orders, disputes, and refunds</li>
        <li>View activity logs and system reports</li>
      </ul>
    </div>
  );
}
