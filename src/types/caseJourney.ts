
export interface CaseJourneyEntry {
  id: string;
  caseId: string;
  title: string;
  description: string;
  date: string;
  status: JourneyStatus;
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
  createdBy: UserInfo;
  updatedBy: UserInfo;
}

export type JourneyStatus = "completed" | "in-progress" | "pending" | "adjourned" | "cancelled";

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: UserInfo;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface JourneyVersionHistory {
  id: string;
  journeyId: string;
  modifiedAt: string;
  modifiedBy: UserInfo;
  changes: FieldChange[];
  version: number;
}

export interface FieldChange {
  field: string;
  oldValue: string;
  newValue: string;
}
