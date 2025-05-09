
// Common types for Master Data entities
export interface CourtData {
  id: string;
  name: string;
  location: string;
  type: string;
}

export interface LawTypeData {
  id: string;
  name: string;
  description: string;
}

export interface ClientData {
  id: string;
  name: string;
  type: string;
  industry: string;
}
