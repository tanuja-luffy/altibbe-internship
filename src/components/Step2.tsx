'use client';

import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

// Define the props for this component
interface StepProps {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: any) => void;
}

const Step2 = ({ nextStep, prevStep, updateFormData }: StepProps) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [healthClaims, setHealthClaims] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateFormData({ ingredients, healthClaims });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="ingredients" className="mb-2 font-semibold text-gray-700">
          List of Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setIngredients(e.target.value)}
          className="h-24 rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Filtered water, organic oats, organic sunflower oil..."
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="healthClaims" className="mb-2 font-semibold text-gray-700">
          Health Claims (e.g., "sugar-free")
        </label>
        <input
          id="healthClaims"
          type="text"
          value={healthClaims}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setHealthClaims(e.target.value)}
          className="rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Dairy-free, lactose-free"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-md bg-gray-400 px-6 py-3 font-bold text-white transition-colors hover:bg-gray-500 focus:outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;