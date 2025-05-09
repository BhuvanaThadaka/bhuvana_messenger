
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
import { Edit, Trash } from "lucide-react";

interface DetailViewProps {
  title: string;
  description?: string;
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  footerContent?: ReactNode;
  isLoading?: boolean;
}

const DetailView = ({
  title,
  description,
  children,
  onEdit,
  onDelete,
  onBack,
  footerContent,
  isLoading = false,
}: DetailViewProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          <div className="flex flex-col items-center justify-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-primary mb-4"
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
            <p className="text-muted-foreground">Loading details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-in fade-in duration-500">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex items-center gap-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex items-center gap-1"
              >
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-6 px-6">{children}</CardContent>

      <CardFooter className="border-t pt-6 flex justify-between">
        {footerContent ? (
          footerContent
        ) : (
          <>
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="transition-all hover:shadow"
              >
                Back
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default DetailView;
