
import { Case } from './types';

// Generate a list of mock cases
export const generateMockCases = (): Case[] => {
  return [
    {
      id: "case-001",
      title: "Smith v. Johnson",
      type: "Civil Litigation",
      status: "Active",
      priority: "High",
      lastUpdated: new Date().toISOString(),
      timeline: generateMockTimeline("case-001"),
      client: "John Smith",
      clientId: "client-001",
      assignedTo: "Sarah Wilson",
      assignedUserId: "user-001",
      description: "Civil dispute regarding property damage",
      court: "Federal District Court",
      filingDate: new Date(2023, 2, 15).toISOString(),
      hearingDate: new Date(2023, 5, 22).toISOString(),
      createdAt: new Date(2023, 1, 10).toISOString(),
    },
    {
      id: "case-002",
      title: "State v. Thompson",
      type: "Criminal Defense",
      status: "Pending",
      priority: "Medium",
      lastUpdated: new Date().toISOString(),
      timeline: generateMockTimeline("case-002"),
      client: "Robert Thompson",
      clientId: "client-002",
      assignedTo: "Michael Brown",
      assignedUserId: "user-002",
      description: "Criminal defense case for burglary charges",
      court: "State Superior Court",
      filingDate: new Date(2023, 3, 5).toISOString(),
      hearingDate: new Date(2023, 6, 12).toISOString(),
      createdAt: new Date(2023, 2, 28).toISOString(),
    },
    {
      id: "case-003",
      title: "Williams Family Trust",
      type: "Estate Planning",
      status: "Closed",
      priority: "Low",
      lastUpdated: new Date().toISOString(),
      timeline: generateMockTimeline("case-003"),
      client: "Emily Williams",
      clientId: "client-003",
      assignedTo: "Jessica Davis",
      assignedUserId: "user-003",
      description: "Estate planning and trust establishment",
      court: "N/A",
      filingDate: new Date(2023, 1, 20).toISOString(),
      createdAt: new Date(2023, 1, 15).toISOString(),
    },
    // Add more cases to support route parameters
    {
      id: "case-004",
      title: "Johnson v. City Hospital",
      type: "Medical Malpractice",
      status: "Active",
      priority: "High",
      lastUpdated: new Date().toISOString(),
      timeline: generateMockTimeline("case-004"),
      client: "David Johnson",
      clientId: "client-004",
      assignedTo: "Sarah Wilson",
      assignedUserId: "user-001",
      description: "Medical malpractice claim against City Hospital",
      court: "State Superior Court",
      filingDate: new Date(2023, 4, 10).toISOString(),
      hearingDate: new Date(2023, 7, 15).toISOString(),
      createdAt: new Date(2023, 3, 30).toISOString(),
    },
    {
      id: "case-005",
      title: "Martinez Divorce Proceedings",
      type: "Family Law",
      status: "Pending",
      priority: "Medium",
      lastUpdated: new Date().toISOString(),
      timeline: generateMockTimeline("case-005"),
      client: "Elena Martinez",
      clientId: "client-005",
      assignedTo: "Jessica Davis",
      assignedUserId: "user-003",
      description: "Divorce proceedings including child custody arrangements",
      court: "Family Court",
      filingDate: new Date(2023, 5, 1).toISOString(),
      createdAt: new Date(2023, 4, 25).toISOString(),
    }
  ];
};

// Find a case by ID - this function needs improvement to handle different ID formats
export const findCaseById = (id: string): Case | null => {
  console.log("Searching for case with ID:", id);
  const allCases = generateMockCases();
  
  // Try exact match first
  let foundCase = allCases.find(c => c.id === id);
  
  // If not found, try with different formats (with or without 'case-' prefix)
  if (!foundCase) {
    // If id starts with 'case-', try without it
    if (id.startsWith('case-')) {
      const idWithoutPrefix = id.substring(5);
      foundCase = allCases.find(c => c.id === idWithoutPrefix || c.id === `case-${idWithoutPrefix}`);
    } else {
      // If id doesn't start with 'case-', try with it
      foundCase = allCases.find(c => c.id === `case-${id}`);
    }
  }
  
  // Additional fallback: try numeric IDs (like '1' should match 'case-001')
  if (!foundCase && !isNaN(Number(id))) {
    const numericId = Number(id);
    const paddedId = numericId.toString().padStart(3, '0');
    foundCase = allCases.find(c => c.id === `case-${paddedId}`);
  }
  
  if (!foundCase) {
    console.log("No case found with ID:", id);
    return null;
  }
  
  console.log("Found case:", foundCase);
  return foundCase;
};

// Generate mock timeline events for a case
const generateMockTimeline = (caseId: string) => {
  return [
    {
      id: `${caseId}-event-1`,
      title: "Case Filed",
      description: "Initial case documents filed with the court",
      date: new Date(2023, 1, 15).toISOString(),
      status: "completed",
      updatedBy: {
        id: "user-001",
        name: "Sarah Wilson"
      }
    },
    {
      id: `${caseId}-event-2`,
      title: "Discovery Phase",
      description: "Exchange of relevant information between parties",
      date: new Date(2023, 2, 10).toISOString(),
      status: "completed",
      updatedBy: {
        id: "user-002",
        name: "Michael Brown"
      }
    },
    {
      id: `${caseId}-event-3`,
      title: "Preliminary Hearing",
      description: "Initial hearing before the judge",
      date: new Date(2023, 3, 5).toISOString(),
      status: "completed",
      updatedBy: {
        id: "user-001",
        name: "Sarah Wilson"
      }
    },
    {
      id: `${caseId}-event-4`,
      title: "Settlement Discussion",
      description: "Parties discussing potential settlement options",
      date: new Date(2023, 4, 20).toISOString(),
      status: "in-progress",
      updatedBy: {
        id: "user-003",
        name: "Jessica Davis"
      }
    },
    {
      id: `${caseId}-event-5`,
      title: "Trial Preparation",
      description: "Preparation of trial documents and witness lists",
      date: new Date(2023, 5, 15).toISOString(),
      status: "pending",
      updatedBy: {
        id: "user-002",
        name: "Michael Brown"
      }
    }
  ];
};
