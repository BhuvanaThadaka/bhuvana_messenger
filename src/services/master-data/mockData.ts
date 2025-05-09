
import { CourtData, LawTypeData, ClientData } from './types';

// Mock data storage
export const courtsMockData: CourtData[] = [
  { id: "court-1", name: "Supreme Court", location: "Washington, DC", type: "Federal" },
  { id: "court-2", name: "US District Court", location: "New York, NY", type: "Federal" },
  { id: "court-3", name: "State Superior Court", location: "Los Angeles, CA", type: "State" },
  { id: "court-4", name: "Family Court", location: "Chicago, IL", type: "Specialized" },
  { id: "court-5", name: "Bankruptcy Court", location: "Miami, FL", type: "Federal" },
];

export const lawTypesMockData: LawTypeData[] = [
  { id: "law-1", name: "Criminal Law", description: "Deals with crimes and their punishment" },
  { id: "law-2", name: "Civil Law", description: "Resolves disputes between individuals or organizations" },
  { id: "law-3", name: "Corporate Law", description: "Governs formation and operations of corporations" },
  { id: "law-4", name: "Family Law", description: "Domestic relations and family matters" },
  { id: "law-5", name: "Intellectual Property", description: "Protects creations of the mind" },
];

export const clientsMockData: ClientData[] = [
  { id: "client-1", name: "Acme Corporation", type: "Corporate", industry: "Manufacturing" },
  { id: "client-2", name: "TechCorp Inc.", type: "Corporate", industry: "Technology" },
  { id: "client-3", name: "John Smith", type: "Individual", industry: "N/A" },
  { id: "client-4", name: "Global Services Ltd.", type: "Corporate", industry: "Services" },
  { id: "client-5", name: "Healthcare Solutions", type: "Corporate", industry: "Healthcare" },
];
