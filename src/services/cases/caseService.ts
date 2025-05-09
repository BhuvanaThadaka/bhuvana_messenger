
import { Case, CaseFilterParams, CaseResponse, CasesResponse, CaseStatusUpdateResponse, CaseDeleteResponse } from './types';
import { generateMockCases, findCaseById } from './mockDataGenerator';

// Simulate API call for getting all cases
export const getAllCases = (): Promise<CaseResponse> => {
  return new Promise<CaseResponse>((resolve) => {
    setTimeout(() => {
      const cases = generateMockCases();
      resolve({
        status: 200,
        data: cases[0]  // Return first case as sample
      });
    }, 500);
  });
};

// Simulate API call for getting a case by ID
export const getCaseById = (id: string): Promise<CaseResponse> => {
  return new Promise<CaseResponse>((resolve, reject) => {
    setTimeout(() => {
      const caseData = findCaseById(id);
      if (caseData) {
        resolve({
          status: 200,
          data: caseData
        });
      } else {
        reject({
          status: 404,
          message: "Case not found"
        });
      }
    }, 300);
  });
};

// Simulate API call for updating case status
export const updateCaseStatus = (id: string, status: string): Promise<CaseStatusUpdateResponse> => {
  return new Promise<CaseStatusUpdateResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          message: `Case ${id} status updated to ${status}`
        }
      });
    }, 300);
  });
};

// Simulate API call for deleting a case
export const deleteCase = (id: string): Promise<CaseDeleteResponse> => {
  return new Promise<CaseDeleteResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          message: `Case ${id} deleted successfully`
        }
      });
    }, 300);
  });
};
