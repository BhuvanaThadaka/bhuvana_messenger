
import { CaseJourneyEntry, JourneyVersionHistory, FieldChange } from "@/types/caseJourney";
import { format, subDays } from "date-fns";

// Mock data storage
export const mockJourneyEntries: CaseJourneyEntry[] = [];
export const mockVersionHistories: JourneyVersionHistory[] = [];

/**
 * Generates mock journey entries for a case
 * @param caseId The ID of the case
 * @returns Array of mock journey entries
 */
export const generateMockJourneyEntries = (caseId: string): CaseJourneyEntry[] => {
  const today = new Date();
  
  const entries = [
    {
      id: `${caseId}-journey-1`,
      caseId,
      title: "Initial client consultation",
      description: "Met with client to discuss case details and gather initial information.",
      date: format(subDays(today, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      status: "completed" as const,
      attachments: [
        {
          id: `${caseId}-attachment-1`,
          name: "Meeting Notes.pdf",
          type: "application/pdf",
          size: 256000,
          url: "#",
          uploadedAt: format(subDays(today, 30), "yyyy-MM-dd'T'HH:mm:ss"),
          uploadedBy: {
            id: "user1", 
            name: "Sarah Wilson",
            avatar: "https://i.pravatar.cc/150?u=user1",
            role: "Lead Attorney"
          }
        }
      ],
      createdAt: format(subDays(today, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(subDays(today, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      createdBy: {
        id: "user1", 
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?u=user1",
        role: "Lead Attorney"
      },
      updatedBy: {
        id: "user1", 
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?u=user1",
        role: "Lead Attorney"
      }
    },
    {
      id: `${caseId}-journey-2`,
      caseId,
      title: "Evidence collection and analysis",
      description: "Collected and reviewed all available evidence related to the case.",
      date: format(subDays(today, 25), "yyyy-MM-dd'T'HH:mm:ss"),
      status: "completed" as const,
      attachments: [],
      createdAt: format(subDays(today, 25), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(subDays(today, 25), "yyyy-MM-dd'T'HH:mm:ss"),
      createdBy: {
        id: "user3", 
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?u=user3",
        role: "Paralegal"
      },
      updatedBy: {
        id: "user3", 
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?u=user3",
        role: "Paralegal"
      }
    },
    {
      id: `${caseId}-journey-3`,
      caseId,
      title: "Drafting legal brief",
      description: "Prepared initial legal brief based on client information and evidence analysis.",
      date: format(subDays(today, 20), "yyyy-MM-dd'T'HH:mm:ss"),
      status: "in-progress" as const,
      attachments: [],
      createdAt: format(subDays(today, 20), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(subDays(today, 18), "yyyy-MM-dd'T'HH:mm:ss"),
      createdBy: {
        id: "user1", 
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?u=user1",
        role: "Lead Attorney"
      },
      updatedBy: {
        id: "user1", 
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?u=user1",
        role: "Lead Attorney"
      }
    },
    {
      id: `${caseId}-journey-4`,
      caseId,
      title: "Court date scheduled",
      description: "Received court scheduling notice. Preliminary hearing set.",
      date: format(subDays(today, 15), "yyyy-MM-dd'T'HH:mm:ss"),
      status: "pending" as const,
      attachments: [],
      createdAt: format(subDays(today, 15), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(subDays(today, 15), "yyyy-MM-dd'T'HH:mm:ss"),
      createdBy: {
        id: "user4", 
        name: "Jessica Davis",
        avatar: "https://i.pravatar.cc/150?u=user4",
        role: "Case Manager"
      },
      updatedBy: {
        id: "user4", 
        name: "Jessica Davis",
        avatar: "https://i.pravatar.cc/150?u=user4",
        role: "Case Manager"
      }
    }
  ];
  
  // Generate version histories for the third entry (which was updated)
  generateMockVersionHistory(`${caseId}-journey-3`);
  
  return entries;
};

/**
 * Generates mock version history for a journey entry
 * @param journeyId The ID of the journey entry
 */
export const generateMockVersionHistory = (journeyId: string): void => {
  const today = new Date();
  mockVersionHistories.push({
    id: `${journeyId}-version-1`,
    journeyId,
    modifiedAt: format(subDays(today, 18), "yyyy-MM-dd'T'HH:mm:ss"),
    modifiedBy: {
      id: "user1", 
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?u=user1",
      role: "Lead Attorney"
    },
    changes: [
      {
        field: "description",
        oldValue: "Started drafting legal brief based on initial findings.",
        newValue: "Prepared initial legal brief based on client information and evidence analysis."
      },
      {
        field: "status",
        oldValue: "pending",
        newValue: "in-progress"
      }
    ],
    version: 2
  });
  
  mockVersionHistories.push({
    id: `${journeyId}-version-0`,
    journeyId,
    modifiedAt: format(subDays(today, 20), "yyyy-MM-dd'T'HH:mm:ss"),
    modifiedBy: {
      id: "user1", 
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/150?u=user1",
      role: "Lead Attorney"
    },
    changes: [
      {
        field: "title",
        oldValue: "",
        newValue: "Drafting legal brief"
      },
      {
        field: "description",
        oldValue: "",
        newValue: "Started drafting legal brief based on initial findings."
      },
      {
        field: "status",
        oldValue: "",
        newValue: "pending"
      }
    ],
    version: 1
  });
};
