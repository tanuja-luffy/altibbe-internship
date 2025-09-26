'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FinalStepProps {
  formData: object;
  prevStep: () => void;
}

const FinalStep = ({ formData, prevStep }: FinalStepProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with a status of ${response.status}`);
      }

      const result = await response.json();
      setStatus('Success! Product data saved. Redirecting to reports...');
      console.log('Success:', result);
    
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      setStatus(`Error: ${error.message} ❌`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Review & Submit</h2>
      <pre className="w-full overflow-auto rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800">
        {JSON.stringify(formData, null, 2)}
      </pre>
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="rounded-md bg-gray-400 px-6 py-3 font-bold text-white transition-colors hover:bg-gray-500 focus:outline-none"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-md bg-green-600 px-6 py-3 font-bold text-white transition-colors hover:bg-green-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Final Form'}
        </button>
      </div>
      {status && (
        <p className={`mt-4 text-center font-bold ${status.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default FinalStep;