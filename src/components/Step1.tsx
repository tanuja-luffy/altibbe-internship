'use client';

import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

// Define the props for this component
interface StepProps {
  nextStep: () => void;
  updateFormData: (data: any) => void;
}

const Step1 = ({ nextStep, updateFormData }: StepProps) => {
  const [productName, setProductName] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateFormData({ productName, category });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="productName" className="mb-2 font-semibold text-gray-700">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
          className="rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Organic Oat Milk"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2 font-semibold text-gray-700">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          className="rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Dairy-Free"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none"
      >
        Next
      </button>
    </form>
  );
};

export default Step1;