
// Define Case type interface for use throughout the application
export interface Case {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  lastUpdated: string;
  timeline?: any[];
  client?: string;
  clientId?: string;
  assignedTo?: string;
  assignedUserId?: string;
  description?: string;
  notes?: string;
  court?: string;
  filingDate?: string;
  hearingDate?: string;
  tags?: string[];
  documents?: {
    id: string;
    name: string;
    size: number;
    uploadedAt: string;
  }[];
  createdAt: string;
}

export interface CaseFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CaseResponse {
  status: number;
  data: Case;
}

export interface CasesResponse {
  status: number;
  data: {
    cases: Case[];
    total: number;
  };
}

export interface CaseStatusUpdateResponse {
  status: number;
  data: {
    message: string;
  };
}

export interface CaseDeleteResponse {
  status: number;
  data: {
    message: string;
  };
}
