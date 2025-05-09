
import { Case, CaseResponse } from './types';
import { findCaseById } from './mockDataGenerator';

// Simulate API call for creating a new case
export const createCase = (caseData: Partial<Case>): Promise<CaseResponse> => {
  return new Promise<CaseResponse>((resolve) => {
    setTimeout(() => {
      const newCase: Case = {
        id: `case${Date.now()}`,
        ...caseData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        title: caseData.title || 'Untitled Case',
        type: caseData.type || 'General',
        status: caseData.status || 'Open',
        priority: caseData.priority || 'Medium'
      };
      
      resolve({
        status: 200,
        data: newCase
      });
    }, 300);
  });
};

// Simulate API call for updating an existing case
export const updateCase = (id: string, caseData: Partial<Case>): Promise<CaseResponse> => {
  return new Promise<CaseResponse>((resolve, reject) => {
    setTimeout(() => {
      const existingCase = findCaseById(id);
      if (existingCase) {
        const updatedCase: Case = {
          ...existingCase,
          ...caseData,
          lastUpdated: new Date().toISOString()
        };
        resolve({
          status: 200,
          data: updatedCase
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
