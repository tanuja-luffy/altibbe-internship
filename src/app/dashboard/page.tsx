'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReportDashboard from '../../components/ReportDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    setLoading(false);

    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <ReportDashboard />
    </main>
  );
}