'use client';

import { useEffect, useState } from 'react';
import Login from '../../components/Login';

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <Login />
    </main>
  );
}