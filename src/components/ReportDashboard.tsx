'use client';

import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  product_name: string;
  created_at: string;
}

const ReportDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading reports...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="mx-auto my-12 w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Product Transparency Reports
      </h2>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No reports have been submitted yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="flex justify-between items-center py-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted on: {new Date(product.created_at).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={`http://localhost:5000/api/report/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none"
                >
                  Download Report
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportDashboard;