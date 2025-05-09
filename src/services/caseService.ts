
import { apiClient } from './apiService';
import { ENDPOINTS } from './endpoints';

export interface Case {
  id: string;
  title: string;
  client: string;
  status: string;
  priority: string;
  type: string;
  assignedTo: string;
  lastUpdated: string;
  description?: string;
  courtDetails?: {
    courtName: string;
    caseNumber: string;
    judge: string;
  };
  // Add other case fields as needed
}

export interface CreateCasePayload {
  title: string;
  client: string;
  status: string;
  priority: string;
  type: string;
  assignedTo?: string;
  description?: string;
  courtDetails?: {
    courtName: string;
    caseNumber: string;
    judge: string;
  };
  // Add other fields needed for creating a case
}

export const getCases = async (): Promise<Case[]> => {
  const response = await apiClient.get<Case[]>(ENDPOINTS.CASE.LIST);
  return response.data;
};

export const getCaseById = async (caseId: string): Promise<Case> => {
  const response = await apiClient.get<Case>(ENDPOINTS.CASE.DETAILS(caseId));
  return response.data;
};

export const createCase = async (caseData: CreateCasePayload): Promise<Case> => {
  const response = await apiClient.post<Case>(ENDPOINTS.CASE.CREATE, caseData);
  return response.data;
};

export const updateCase = async (caseId: string, caseData: Partial<Case>): Promise<Case> => {
  const response = await apiClient.put<Case>(`${ENDPOINTS.CASE.UPDATE}/${caseId}`, caseData);
  return response.data;
};

export const deleteCase = async (caseId: string): Promise<void> => {
  await apiClient.delete(`${ENDPOINTS.CASE.DELETE}/${caseId}`);
};
