'use client';

import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

// Define the props for this component
interface AIQuestionStepProps {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: object) => void;
  aiQuestion: string;
}

const AIQuestionStep = ({ nextStep, prevStep, updateFormData, aiQuestion }: AIQuestionStepProps) => {
  const [userAnswer, setUserAnswer] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // The key change: add a new key-value pair with the AI's question and the user's answer
    updateFormData({ [aiQuestion]: userAnswer });
    
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="ai-question" className="mb-2 font-bold text-gray-800">
          AI Follow-up Question:
        </label>
        <div className="rounded-md border p-4 text-gray-700 bg-gray-50 italic">
          {aiQuestion}
        </div>
        <textarea
          id="ai-question"
          value={userAnswer}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserAnswer(e.target.value)}
          className="mt-4 h-24 rounded-md border p-3 text-gray-800 focus:border-blue-500 focus:outline-none"
          placeholder="Enter your answer here..."
          required
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

export default AIQuestionStep;