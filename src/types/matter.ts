
export interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  url?: string;
  type?: string;
  version?: number;
  caseId?: string;
  description?: string;
  status?: string;
  generationDate?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  updatedBy?: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  documents?: Document[];
  tags?: string[];
}

export interface Matter {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  description?: string;
  client?: string;
  clientId?: string;
  assignedTo?: string;
  assignedUserId?: string;
  court?: string;
  filingDate?: string;
  hearingDate?: string;
  lastUpdated: string;
  createdAt: string;
  timeline?: TimelineEvent[];
  documents?: Document[];
  tags?: string[];
  notes?: string;
}

// Additional types for the Matter List View and Case Journey
export type CourtType = "Lower Court" | "High Court" | "Supreme Court";
export type CaseType = "Civil" | "Criminal" | "Family" | "Corporate" | "Taxation" | "Property" | "Other";
export type CaseStage = "Filing" | "Initial Hearing" | "Evidence" | "Arguments" | "Judgment" | "Appeal" | "Closed";
export type DocumentStatus = "Draft" | "Vetting" | "Review" | "Approved";
export type EventType = "Filing" | "Hearing" | "Adjournment" | "Document" | "Other";
export type EventStatus = "Pending" | "In Progress" | "Closed" | "Adjourned";

export interface LegalCase {
  id: string;
  caseTitle: string;
  caseNumber: string;
  courtType: CourtType;
  caseType: CaseType;
  advocateName: string;
  dateOfFiling: string;
  hearingDate?: string;
  caseStage: CaseStage;
  documentStatus: DocumentStatus;
  remarks: string;
  courtDetails?: {
    courtName?: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
  };
  legalDetails?: {
    act?: string;
    section?: string;
    firNumber?: string;
    firYear?: number;
    policeStation?: string;
  };
  parties?: {
    yourParty?: "Plaintiff" | "Defendant";
    oppositePartyAdvocate?: string;
  };
  clerkAssigned?: string;
  notifications?: {
    advocate?: boolean;
    client?: boolean;
    admin?: boolean;
  };
}

export interface CaseEvent {
  id: string;
  caseId: string;
  eventType: EventType;
  date: string;
  status: EventStatus;
  order: string;
  remarks: string;
  recordedBy: string;
}

export interface MatterListParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: {
    caseNumber?: string;
    advocateName?: string;
    courtType?: CourtType;
    caseType?: CaseType;
    dateOfFiling?: {
      from?: string;
      to?: string;
    };
  };
}
