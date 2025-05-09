import { 
  Document, 
  LegalCase, 
  CaseEvent, 
  MatterListParams, 
  CourtType, 
  CaseType, 
  CaseStage, 
  DocumentStatus, 
  EventType, 
  EventStatus 
} from "@/types/matter";

// Mock data for legal cases
const mockLegalCases: LegalCase[] = [
  {
    id: "case-001",
    caseTitle: "Smith vs Johnson",
    caseNumber: "CIV-2025-123",
    courtType: "High Court",
    caseType: "Civil",
    advocateName: "James Wilson",
    dateOfFiling: "2025-02-15",
    hearingDate: "2025-04-20",
    caseStage: "Initial Hearing",
    documentStatus: "Approved",
    remarks: "Plaintiff seeking damages for breach of contract",
    courtDetails: {
      courtName: "Central High Court",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      address: "350 W 1st St, Los Angeles, CA 90012"
    },
    legalDetails: {
      act: "Contract Act",
      section: "Section 74",
      firNumber: undefined,
      firYear: undefined,
      policeStation: undefined
    },
    parties: {
      yourParty: "Plaintiff",
      oppositePartyAdvocate: "Sarah Thomas"
    },
    clerkAssigned: "Mike Peterson",
    notifications: {
      advocate: true,
      client: true,
      admin: false
    }
  },
  {
    id: "case-002",
    caseTitle: "State vs Roberts",
    caseNumber: "CRIM-2025-456",
    courtType: "Lower Court",
    caseType: "Criminal",
    advocateName: "Emily Parker",
    dateOfFiling: "2025-01-10",
    hearingDate: "2025-03-15",
    caseStage: "Evidence",
    documentStatus: "Review",
    remarks: "Defendant charged with fraud",
    courtDetails: {
      courtName: "Downtown Criminal Court",
      country: "United States",
      state: "New York",
      city: "Manhattan",
      address: "100 Centre St, New York, NY 10013"
    },
    legalDetails: {
      act: "Criminal Code",
      section: "Section 420",
      firNumber: "FIR-2024-789",
      firYear: 2024,
      policeStation: "Manhattan South Precinct"
    }
  },
  {
    id: "case-003",
    caseTitle: "Brown vs Brown",
    caseNumber: "FAM-2025-789",
    courtType: "Lower Court",
    caseType: "Family",
    advocateName: "James Wilson",
    dateOfFiling: "2025-03-05",
    hearingDate: "2025-05-10",
    caseStage: "Arguments",
    documentStatus: "Vetting",
    remarks: "Divorce proceedings, custody dispute"
  },
  {
    id: "case-004",
    caseTitle: "Tech Corp vs Innovate LLC",
    caseNumber: "CORP-2025-101",
    courtType: "High Court",
    caseType: "Corporate",
    advocateName: "David Miller",
    dateOfFiling: "2025-02-25",
    hearingDate: "2025-04-30",
    caseStage: "Initial Hearing",
    documentStatus: "Draft",
    remarks: "Patent infringement case"
  },
  {
    id: "case-005",
    caseTitle: "Davis vs IRS",
    caseNumber: "TAX-2025-202",
    courtType: "Supreme Court",
    caseType: "Taxation",
    advocateName: "Jessica Wong",
    dateOfFiling: "2024-12-10",
    hearingDate: "2025-06-15",
    caseStage: "Filing",
    documentStatus: "Draft",
    remarks: "Tax evasion allegation defense"
  },
  {
    id: "case-006",
    caseTitle: "Martinez vs City Council",
    caseNumber: "PROP-2025-303",
    courtType: "High Court",
    caseType: "Property",
    advocateName: "Robert Chen",
    dateOfFiling: "2025-01-20",
    hearingDate: "2025-04-25",
    caseStage: "Evidence",
    documentStatus: "Review",
    remarks: "Dispute over property rezoning"
  },
  {
    id: "case-007",
    caseTitle: "Green Family Trust",
    caseNumber: "PROB-2025-404",
    courtType: "Lower Court",
    caseType: "Other",
    advocateName: "Maria Rodriguez",
    dateOfFiling: "2025-03-12",
    hearingDate: "2025-05-20",
    caseStage: "Filing",
    documentStatus: "Approved",
    remarks: "Probate case for estate distribution"
  },
  {
    id: "case-008",
    caseTitle: "Williams vs Insurance Co",
    caseNumber: "CIV-2025-505",
    courtType: "High Court",
    caseType: "Civil",
    advocateName: "James Wilson",
    dateOfFiling: "2025-02-05",
    hearingDate: "2025-04-10",
    caseStage: "Arguments",
    documentStatus: "Approved",
    remarks: "Claim dispute after property damage"
  },
  {
    id: "case-009",
    caseTitle: "Thompson vs School District",
    caseNumber: "EDU-2025-606",
    courtType: "Supreme Court",
    caseType: "Other",
    advocateName: "David Miller",
    dateOfFiling: "2025-01-15",
    hearingDate: "2025-03-30",
    caseStage: "Judgment",
    documentStatus: "Approved",
    remarks: "Education rights violation case"
  },
  {
    id: "case-010",
    caseTitle: "Harris vs Pharmaceutical",
    caseNumber: "MED-2025-707",
    courtType: "High Court",
    caseType: "Civil",
    advocateName: "Emily Parker",
    dateOfFiling: "2024-12-20",
    hearingDate: "2025-03-25",
    caseStage: "Initial Hearing",
    documentStatus: "Review",
    remarks: "Medical malpractice lawsuit"
  }
];

// Mock data for case events
const mockCaseEvents: CaseEvent[] = [
  {
    id: "event-001",
    caseId: "case-001",
    eventType: "Filing",
    date: "2025-02-15",
    status: "Closed",
    order: "Case filed successfully",
    remarks: "All documents submitted correctly",
    recordedBy: "James Wilson"
  },
  {
    id: "event-002",
    caseId: "case-001",
    eventType: "Hearing",
    date: "2025-03-10",
    status: "Closed",
    order: "Initial hearing conducted",
    remarks: "Arguments heard, next date set for evidence",
    recordedBy: "James Wilson"
  },
  {
    id: "event-003",
    caseId: "case-001",
    eventType: "Adjournment",
    date: "2025-03-20",
    status: "Closed",
    order: "Case adjourned due to judge's absence",
    remarks: "New date set for April 5",
    recordedBy: "Clerk"
  },
  {
    id: "event-004",
    caseId: "case-001",
    eventType: "Document",
    date: "2025-03-25",
    status: "Closed",
    order: "Additional evidence documents submitted",
    remarks: "Medical reports and expert testimony",
    recordedBy: "James Wilson"
  },
  {
    id: "event-005",
    caseId: "case-001",
    eventType: "Hearing",
    date: "2025-04-05",
    status: "Closed",
    order: "Evidence hearing",
    remarks: "All evidence presented by plaintiff",
    recordedBy: "James Wilson"
  },
  {
    id: "event-006",
    caseId: "case-001",
    eventType: "Hearing",
    date: "2025-04-20",
    status: "Pending",
    order: "Next hearing for defendant's evidence",
    remarks: "Scheduled for April 20, 2025",
    recordedBy: "Court"
  }
];

// Mock data for documents
const mockDocuments: Document[] = [
  {
    id: "doc-001",
    caseId: "case-001",
    name: "Plaintiff Statement",
    description: "Initial statement of claim",
    uploadedAt: "2025-02-15",
    status: "Approved",
    url: "/documents/statement.pdf",
    type: "Uploaded",
    size: 1024000
  },
  {
    id: "doc-002",
    caseId: "case-001",
    name: "Evidence Photos",
    description: "Photographic evidence of damage",
    uploadedAt: "2025-02-20",
    status: "Approved",
    url: "/documents/photos.zip",
    type: "Uploaded",
    size: 2048000
  },
  {
    id: "doc-003",
    caseId: "case-001",
    name: "Contract Copy",
    description: "Copy of the original contract",
    uploadedAt: "2025-02-22",
    status: "Approved",
    url: "/documents/contract.pdf",
    type: "Uploaded",
    size: 512000
  },
  {
    id: "doc-004",
    caseId: "case-001",
    name: "Legal Notice",
    description: "Legal notice sent to defendant",
    generationDate: "2025-02-25",
    uploadedAt: "2025-02-25",
    status: "Approved",
    url: "/documents/notice.pdf",
    type: "Generated",
    size: 256000
  },
  {
    id: "doc-005",
    caseId: "case-001",
    name: "Court Filing Form",
    description: "Official court filing documentation",
    generationDate: "2025-02-26",
    uploadedAt: "2025-02-26",
    status: "Approved",
    url: "/documents/filing.pdf",
    type: "Generated",
    size: 384000
  }
];

// Get all legal cases with optional filtering and sorting
export const getLegalCases = async (params: MatterListParams): Promise<{ data: LegalCase[], total: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filteredCases = [...mockLegalCases];
  
  // Apply filters if provided
  if (params.filters) {
    if (params.filters.caseNumber) {
      filteredCases = filteredCases.filter(c => 
        c.caseNumber.toLowerCase().includes(params.filters?.caseNumber?.toLowerCase() || '')
      );
    }
    
    if (params.filters.advocateName) {
      filteredCases = filteredCases.filter(c => 
        c.advocateName.toLowerCase().includes(params.filters?.advocateName?.toLowerCase() || '')
      );
    }
    
    if (params.filters.courtType) {
      filteredCases = filteredCases.filter(c => c.courtType === params.filters?.courtType);
    }
    
    if (params.filters.caseType) {
      filteredCases = filteredCases.filter(c => c.caseType === params.filters?.caseType);
    }
    
    if (params.filters.dateOfFiling?.from) {
      filteredCases = filteredCases.filter(c => 
        new Date(c.dateOfFiling) >= new Date(params.filters?.dateOfFiling?.from || '')
      );
    }
    
    if (params.filters.dateOfFiling?.to) {
      filteredCases = filteredCases.filter(c => 
        new Date(c.dateOfFiling) <= new Date(params.filters?.dateOfFiling?.to || '')
      );
    }
  }
  
  // Apply search if provided
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredCases = filteredCases.filter(c => 
      c.caseTitle.toLowerCase().includes(searchLower) || 
      c.caseNumber.toLowerCase().includes(searchLower) ||
      c.advocateName.toLowerCase().includes(searchLower) ||
      c.remarks.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting if provided
  if (params.sortBy) {
    filteredCases.sort((a, b) => {
      let valueA, valueB;
      
      switch (params.sortBy) {
        case 'dateOfFiling':
          valueA = new Date(a.dateOfFiling).getTime();
          valueB = new Date(b.dateOfFiling).getTime();
          break;
        case 'hearingDate':
          // Handle null hearing dates by considering them "later" than any actual date
          valueA = a.hearingDate ? new Date(a.hearingDate).getTime() : Infinity;
          valueB = b.hearingDate ? new Date(b.hearingDate).getTime() : Infinity;
          break;
        case 'advocateName':
          valueA = a.advocateName;
          valueB = b.advocateName;
          break;
        default:
          valueA = a[params.sortBy as keyof LegalCase];
          valueB = b[params.sortBy as keyof LegalCase];
      }
      
      if (params.sortOrder === 'desc') {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      } else {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
    });
  }
  
  // Calculate pagination
  const total = filteredCases.length;
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedCases = filteredCases.slice(start, end);
  
  return { data: paginatedCases, total };
};

// Get a single legal case by ID
export const getLegalCaseById = async (id: string): Promise<LegalCase> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const legalCase = mockLegalCases.find(c => c.id === id);
  
  if (!legalCase) {
    throw new Error('Legal case not found');
  }
  
  return legalCase;
};

// Get all events for a case
export const getCaseEvents = async (caseId: string): Promise<CaseEvent[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockCaseEvents.filter(e => e.caseId === caseId);
};

// Get all documents for a case
export const getCaseDocuments = async (caseId: string): Promise<Document[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockDocuments.filter(d => d.caseId === caseId);
};

// Create a new legal case
export const createLegalCase = async (caseData: Omit<LegalCase, 'id'>): Promise<LegalCase> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newCase: LegalCase = {
    id: `case-${mockLegalCases.length + 1}`.padStart(7, '0'),
    ...caseData
  };
  
  mockLegalCases.push(newCase);
  
  return newCase;
};

// Update an existing legal case
export const updateLegalCase = async (id: string, caseData: Partial<LegalCase>): Promise<LegalCase> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = mockLegalCases.findIndex(c => c.id === id);
  
  if (index === -1) {
    throw new Error('Legal case not found');
  }
  
  mockLegalCases[index] = { ...mockLegalCases[index], ...caseData };
  
  return mockLegalCases[index];
};

// Delete a legal case
export const deleteLegalCase = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = mockLegalCases.findIndex(c => c.id === id);
  
  if (index === -1) {
    throw new Error('Legal case not found');
  }
  
  mockLegalCases.splice(index, 1);
};

// Add a new event to a case
export const addCaseEvent = async (event: Omit<CaseEvent, 'id'>): Promise<CaseEvent> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newEvent: CaseEvent = {
    id: `event-${mockCaseEvents.length + 1}`.padStart(7, '0'),
    ...event
  };
  
  mockCaseEvents.push(newEvent);
  
  return newEvent;
};

// Add a new document to a case
export const addCaseDocument = async (document: Omit<Document, 'id'>): Promise<Document> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newDocument: Document = {
    id: `doc-${mockDocuments.length + 1}`.padStart(7, '0'),
    ...document
  };
  
  mockDocuments.push(newDocument);
  
  return newDocument;
};
