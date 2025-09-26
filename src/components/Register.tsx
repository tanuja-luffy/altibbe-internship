'use client';

import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      setMessage('Registration successful! You can now log in.');
    } catch (error: any) {
      setMessage(error.message);
      console.error('Registration Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-semibold text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm font-bold text-red-600">{message}</p>}
    </div>
  );
};

export default Register;