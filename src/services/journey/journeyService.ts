
import { apiClient } from '../apiService';

// Types
import { JourneyStatus } from './journeyEnums';

export interface CaseJourneyEntry {
  id: string;
  caseId: string;
  title: string;
  description: string;
  status: JourneyStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  updatedBy: {
    id: string;
    name: string;
    email: string;
  };
  attachments: Array<{
    id: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    uploadedAt: string;
    uploadedBy: string;
    url: string;
  }>;
}

export type CaseJourneyEntryCreate = Omit<CaseJourneyEntry, 'id' | 'createdAt' | 'updatedAt'>;
export type CaseJourneyEntryUpdate = Partial<CaseJourneyEntry>;

// API endpoints for journey operations
export const getCaseJourneyList = async (caseId: string): Promise<CaseJourneyEntry[]> => {
  const response = await apiClient.get<CaseJourneyEntry[]>(`/cases/${caseId}/journey`);
  return response.data;
};

export const getCaseJourneyEntry = async (journeyId: string): Promise<CaseJourneyEntry> => {
  const response = await apiClient.get<CaseJourneyEntry>(`/journey/${journeyId}`);
  return response.data;
};

export const createCaseJourneyEntry = async (
  journeyData: CaseJourneyEntryCreate
): Promise<CaseJourneyEntry> => {
  const response = await apiClient.post<CaseJourneyEntry>('/journey', journeyData);
  return response.data;
};

export const updateCaseJourneyEntry = async (
  journeyId: string,
  updateData: CaseJourneyEntryUpdate
): Promise<CaseJourneyEntry> => {
  const response = await apiClient.put<CaseJourneyEntry>(`/journey/${journeyId}`, updateData);
  return response.data;
};

export const deleteCaseJourneyEntry = async (journeyId: string): Promise<void> => {
  await apiClient.delete(`/journey/${journeyId}`);
};

export const getJourneyVersionHistory = async (journeyId: string): Promise<any[]> => {
  const response = await apiClient.get<any[]>(`/journey/${journeyId}/history`);
  return response.data;
};
