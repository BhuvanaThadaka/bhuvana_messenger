
import { useState, useCallback } from 'react';
import { useToast } from './useToast';

interface UseApiRequestOptions<T, R> {
  onSuccess?: (data: R) => void;
  onError?: (error: Error) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A custom hook for handling API requests with loading, error, and success states
 */
export function useApiRequest<T, R>(
  apiFunction: (params: T) => Promise<R>,
  options: UseApiRequestOptions<T, R> = {}
) {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred'
  } = options;

  const execute = useCallback(
    async (params: T): Promise<R | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiFunction(params);
        setData(result);
        
        if (showSuccessToast) {
          toast({
            title: successMessage,
          });
        }

        if (onSuccess) {
          onSuccess(result);
        }

        setIsLoading(false);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        
        if (showErrorToast) {
          toast({
            title: errorMessage,
            description: error.message,
            variant: "destructive",
          });
        }

        if (onError) {
          onError(error);
        }

        setIsLoading(false);
        return null;
      }
    },
    [apiFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage, errorMessage, toast]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    execute,
    data,
    isLoading,
    error,
    reset,
  };
}
