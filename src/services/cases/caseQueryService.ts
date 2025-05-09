
import { Case, CaseFilterParams, CasesResponse } from './types';
import { generateMockCases } from './mockDataGenerator';

// Simulate API call for getting cases with filtering, sorting, and pagination
export const getCases = (params: CaseFilterParams = {}): Promise<CasesResponse> => {
  return new Promise<CasesResponse>((resolve) => {
    const cases = generateMockCases();
    
    // Apply filters (simplified for mock data)
    let filteredCases = [...cases];
    
    // Simple search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredCases = filteredCases.filter(
        c => c.title.toLowerCase().includes(searchTerm)
      );
    }
    
    // Status filter
    if (params.status) {
      filteredCases = filteredCases.filter(
        c => c.status.toLowerCase() === params.status.toLowerCase()
      );
    }
    
    // Priority filter
    if (params.priority) {
      filteredCases = filteredCases.filter(
        c => c.priority.toLowerCase() === params.priority.toLowerCase()
      );
    }
    
    // Sort cases
    if (params.sortBy) {
      filteredCases.sort((a: any, b: any) => {
        const aValue = a[params.sortBy as keyof Case];
        const bValue = b[params.sortBy as keyof Case];
        
        if (params.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    
    // Pagination
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;
    const paginatedCases = filteredCases.slice(start, start + pageSize);
    
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          cases: paginatedCases,
          total: filteredCases.length
        }
      });
    }, 300);
  });
};
