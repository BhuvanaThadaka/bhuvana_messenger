
import { toast } from "@/hooks/use-toast";

export { toast };
export { useToast } from "@/hooks/use-toast";

// Helper functions for common toast types
export const showSuccessToast = (title: string, description?: string) => {
  toast({
    title,
    description,
  });
};

export const showErrorToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: "destructive",
  });
};

export const showWarningToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: "destructive",
  });
};

export const showInfoToast = (title: string, description?: string) => {
  toast({
    title,
    description,
  });
};
