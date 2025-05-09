
import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  footerContent?: ReactNode;
  showFooter?: boolean;
}

const FormWrapper = ({
  title,
  description,
  children,
  onCancel,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  footerContent,
  showFooter = true,
}: FormWrapperProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary animate-in fade-in duration-500">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showFooter && (
        <CardFooter className="flex justify-between border-t pt-6">
          {footerContent ? (
            footerContent
          ) : (
            <>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  {cancelLabel}
                </Button>
              )}

              {onSubmit && (
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">{submitLabel}</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    submitLabel
                  )}
                </Button>
              )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default FormWrapper;
