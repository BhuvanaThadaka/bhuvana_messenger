
import React, { ReactNode } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

interface SettingsFormProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  footerContent?: ReactNode;
  icon?: ReactNode;
}

const SettingsForm = ({
  title,
  description,
  children,
  onSubmit,
  isSubmitting = false,
  submitButtonText = "Save Changes",
  onCancel,
  cancelButtonText = "Cancel",
  footerContent,
  icon
}: SettingsFormProps) => {
  return (
    <Card className="border-t-4 border-t-primary shadow-lg animate-in slide-in-from-bottom-5 duration-500">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">{children}</CardContent>
      {(onSubmit || onCancel || footerContent) && (
        <>
          <Separator />
          <CardFooter className="pt-6 flex justify-between">
            {footerContent ? (
              footerContent
            ) : (
              <>
                {onCancel && (
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                {onSubmit && (
                  <Button 
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">{submitButtonText}</span>
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
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {submitButtonText}
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SettingsForm;
