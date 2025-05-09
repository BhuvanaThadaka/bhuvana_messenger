
import React from "react";
import { Check } from "lucide-react";

export interface FormStep {
  title: string;
  description: string;
}

interface FormStepIndicatorProps {
  steps: FormStep[];
  currentStep: number;
}

const FormStepIndicator = ({ steps, currentStep }: FormStepIndicatorProps) => {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex-1 border-b-2 pb-2 transition-all duration-200 ${
            index === currentStep
              ? "border-primary"
              : index < currentStep
              ? "border-green-500"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 transition-all duration-200 ${
                index === currentStep
                  ? "bg-primary text-white"
                  : index < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span
              className={`transition-all duration-200 text-sm sm:text-base font-medium ${
                index === currentStep
                  ? "text-primary"
                  : index < currentStep
                  ? "text-green-500"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </span>
          </div>
          <p className="text-xs text-muted-foreground hidden md:block mt-1 ml-10">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FormStepIndicator;
