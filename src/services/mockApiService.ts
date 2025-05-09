
// This service simulates API calls with mock data
import { toast } from "@/hooks/use-toast";

// Simulate network delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic mock API call function
export async function mockApiCall<T, R>(
  method: string,
  endpoint: string,
  data?: T,
  simulateError: boolean = false
): Promise<R> {
  console.log(`[MockAPI] ${method} ${endpoint}`, data);
  
  // Simulate network delay (300-800ms)
  await delay(300 + Math.random() * 500);
  
  // Simulate random error (for testing error handling)
  if (simulateError || Math.random() < 0.05) {
    const error = new Error("API Error: Something went wrong");
    console.error(`[MockAPI] Error:`, error);
    throw error;
  }
  
  return {} as R; // This will be overridden by the specific handlers
}

// API response wrapper
export function apiResponse<T>(data: T, success: boolean = true, error?: string) {
  if (!success && error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive"
    });
  }
  
  return { 
    data,
    success,
    error,
    timestamp: new Date().toISOString()
  };
}

// Helper to generate random IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Helper to show success messages
export function showSuccessToast(message: string): void {
  toast({
    title: "Success",
    description: message,
  });
}

// Helper to show error messages
export function showErrorToast(message: string): void {
  toast({
    title: "Error",
    description: message,
    variant: "destructive"
  });
}
