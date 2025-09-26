'use client';

import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import FinalStep from './FinalStep';
import AIQuestionStep from './AIQuestionStep';

interface FormData {
  productName: string;
  category: string;
  ingredients: string;
  healthClaims: string;
  aiAnswer?: string;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  const nextStep = () => {
    // Check if we are at a step that should trigger an AI call
    if (currentStep === 2 || currentStep === 3) {
      setLoadingAI(true);
      fetchAIQuestion();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => setCurrentStep(currentStep - 1);
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const fetchAIQuestion = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}/generate-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ previous_answers: JSON.stringify(formData) }),
      });
      const data = await response.json();
      
      // Check for the "DONE" signal from the AI
      if (data.question === "DONE") {
        setCurrentStep(4); // Go directly to the final step
      } else {
        setAiQuestion(data.question);
        setCurrentStep(3); // Go to the AI question step
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      // Fallback: If the AI service fails, skip directly to the final step.
      setCurrentStep(4);
    } finally {
      setLoadingAI(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 nextStep={nextStep} updateFormData={updateFormData} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />;
      case 3:
        return <AIQuestionStep nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} aiQuestion={aiQuestion} />;
      case 4:
        return <FinalStep formData={formData} prevStep={prevStep} />;
      default:
        return <div className="p-8 text-center text-gray-600">Form Submission Complete!</div>;
    }
  };

  return (
    <div className="mx-auto my-12 w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
      <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-800">
        Product Transparency Form
      </h1>
      <div className="relative pt-1">
        <div className="mb-4 flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
          <div
            style={{ width: `${(currentStep / 4) * 100}%` }}
            className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none transition-all duration-500"
          ></div>
        </div>
      </div>
      {loadingAI ? (
        <div className="text-center font-bold text-gray-500">
          Generating next question...
        </div>
      ) : (
        renderStep()
      )}
    </div>
  );
};

export default MultiStepForm;