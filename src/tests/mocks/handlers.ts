import { rest } from 'msw';
import { AccountType, Modules } from '@/types/auth';
import { JourneyStatus } from '@/services/journey/journeyEnums';

export const handlers = [
  // Auth handlers
  rest.post('*/auth/login', (req, res, ctx) => {
    const { username, password } = req.body as { username: string; password: string };
    
    if (username === 'admin@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-token-super-admin',
          user: {
            username: 'admin@example.com',
            accountType: AccountType.SUPER_ADMIN,
            roles: ['ADMIN'],
            featurePrivileges: {
              [Modules.UserManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.Dashboard]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.RoleManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.CaseManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.MasterDataManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.UserProfile]: ['VIEW', 'EDIT'],
              [Modules.LawFirmManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.PlanManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.Settings]: ['VIEW', 'EDIT'],
              [Modules.StaffManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.AccessManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.InvoiceManagement]: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
              [Modules.CompanyProfile]: ['VIEW', 'EDIT', 'CREATE', 'UPDATE']
            }
          }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),
  
  rest.post('*/auth/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, message: 'Logged out successfully' })
    );
  }),
  
  // Law Firm handlers
  rest.get('*/law-firms', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        firms: [
          {
            id: "1",
            name: "Smith & Associates",
            firmCode: "SA-001",
            isActive: true,
          },
          {
            id: "2",
            name: "Legal Eagles LLP",
            firmCode: "LE-002",
            isActive: true,
          }
        ],
        total: 2,
        page: 1,
        pageSize: 10
      })
    );
  }),
  
  rest.get('*/law-firms/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "1",
        name: "Smith & Associates",
        firmCode: "SA-001",
        registrationNumber: "REG12345",
        firmType: "LLP",
        taxId: "TX98765",
        establishmentYear: 2005,
        primaryContactName: "John Smith",
        primaryContactNumber: "555-123-4567",
        country: "US",
        state: "CA",
        city: "Los Angeles",
        officeAddress: "123 Legal Avenue, Suite 500",
        zipCode: "90001",
        adminName: "Sarah Johnson",
        adminEmail: "sarah@smith-associates.com",
        adminPhone: "555-987-6543",
        plan: "premium",
        isActive: true,
        createdAt: "2023-01-15T10:30:00Z",
        updatedAt: "2023-04-20T14:45:00Z"
      })
    );
  }),
  
  // Master Data handlers
  rest.get('*/master-data/courts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: "court-1", name: "Supreme Court", location: "Washington, DC", type: "Federal" },
          { id: "court-2", name: "US District Court", location: "New York, NY", type: "Federal" },
          { id: "court-3", name: "Circuit Court", location: "Chicago, IL", type: "State" },
          { id: "court-4", name: "Family Court", location: "Los Angeles, CA", type: "State" },
          { id: "court-5", name: "Bankruptcy Court", location: "Miami, FL", type: "Federal" }
        ],
        success: true
      })
    );
  }),
  
  rest.get('*/master-data/law-types', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: "law-1", name: "Criminal Law", description: "Deals with crimes and their punishment" },
          { id: "law-2", name: "Civil Law", description: "Deals with disputes between individuals/organizations" },
          { id: "law-3", name: "Family Law", description: "Deals with family matters like divorce, custody" },
          { id: "law-4", name: "Corporate Law", description: "Deals with formation and operations of corporations" },
          { id: "law-5", name: "Intellectual Property", description: "Deals with protection of intellectual creations" }
        ],
        success: true
      })
    );
  }),
  
  rest.get('*/master-data/clients', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: "client-1", name: "John Doe", email: "john@example.com", phone: "555-1234" },
          { id: "client-2", name: "Jane Smith", email: "jane@example.com", phone: "555-5678" },
          { id: "client-3", name: "Acme Corporation", email: "info@acme.com", phone: "555-9012" },
          { id: "client-4", name: "Global Industries", email: "contact@global.com", phone: "555-3456" },
          { id: "client-5", name: "Tech Innovators", email: "hello@techinnovators.com", phone: "555-7890" }
        ],
        success: true
      })
    );
  }),
  
  // Journey handlers
  rest.get('*/cases/case-1/journey', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "case-1-journey-1",
          caseId: "case-1",
          title: "Initial Consultation",
          description: "First meeting with client to discuss case details",
          status: JourneyStatus.COMPLETED,
          date: "2023-05-10",
          createdAt: "2023-05-10T09:00:00",
          updatedAt: "2023-05-10T09:00:00",
          createdBy: { id: "user-1", name: "Test User", email: "test@example.com" },
          updatedBy: { id: "user-1", name: "Test User", email: "test@example.com" },
          attachments: []
        },
        {
          id: "case-1-journey-2",
          caseId: "case-1",
          title: "Document Filing",
          description: "Filed initial paperwork with the court",
          status: JourneyStatus.COMPLETED,
          date: "2023-05-15",
          createdAt: "2023-05-15T14:00:00",
          updatedAt: "2023-05-15T14:00:00",
          createdBy: { id: "user-1", name: "Test User", email: "test@example.com" },
          updatedBy: { id: "user-1", name: "Test User", email: "test@example.com" },
          attachments: []
        }
      ])
    );
  }),
  
  rest.get('*/journey/:journeyId', (req, res, ctx) => {
    const { journeyId } = req.params;
    
    return res(
      ctx.status(200),
      ctx.json({
        id: journeyId,
        caseId: "case-1",
        title: "Test Journey Entry",
        description: "This is a test journey entry",
        status: JourneyStatus.IN_PROGRESS,
        date: "2023-06-01",
        createdAt: "2023-06-01T10:00:00",
        updatedAt: "2023-06-01T10:00:00",
        createdBy: { id: "user-1", name: "Test User", email: "test@example.com" },
        updatedBy: { id: "user-1", name: "Test User", email: "test@example.com" },
        attachments: []
      })
    );
  }),
  
  rest.post('*/journey', (req, res, ctx) => {
    const journeyData = req.body as any;
    
    return res(
      ctx.status(201),
      ctx.json({
        id: `${journeyData.caseId}-journey-new`,
        ...journeyData,
        createdAt: "2023-06-01T10:00:00",
        updatedAt: "2023-06-01T10:00:00"
      })
    );
  }),
  
  rest.put('*/journey/:journeyId', (req, res, ctx) => {
    const { journeyId } = req.params;
    const journeyData = req.body as any;
    
    return res(
      ctx.status(200),
      ctx.json({
        id: journeyId,
        ...journeyData,
        updatedAt: "2023-06-02T11:00:00"
      })
    );
  }),
  
  rest.delete('*/journey/:journeyId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    );
  }),
  
  // Invoice handlers
  rest.get('*/invoices', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        invoices: [
          {
            id: "INV-001",
            lawFirm: "Smith & Associates",
            lawFirmId: "1",
            amount: 1200.00,
            issueDate: "2025-03-15",
            dueDate: "2025-04-15",
            status: "paid",
            plan: "Premium"
          },
          {
            id: "INV-002",
            lawFirm: "Legal Eagles LLP",
            lawFirmId: "2",
            amount: 999.00,
            issueDate: "2025-03-20",
            dueDate: "2025-04-20",
            status: "pending",
            plan: "Standard"
          },
          {
            id: "INV-003",
            lawFirm: "Johnson Legal Group",
            lawFirmId: "3",
            amount: 699.00,
            issueDate: "2025-03-25",
            dueDate: "2025-04-25",
            status: "overdue",
            plan: "Basic"
          }
        ],
        total: 3,
        page: 1,
        pageSize: 10
      })
    );
  }),
  
  rest.get('*/invoices/:invoiceId', (req, res, ctx) => {
    const { invoiceId } = req.params;
    
    return res(
      ctx.status(200),
      ctx.json({
        id: invoiceId,
        lawFirm: "Smith & Associates",
        lawFirmId: "1",
        amount: 1200.00,
        issueDate: "2025-03-15",
        dueDate: "2025-04-15",
        status: "paid",
        plan: "Premium",
        billingAddress: "123 Legal Avenue, Suite 500, Los Angeles, CA 90001",
        items: [
          { description: "Premium Plan Subscription", amount: 1000.00, quantity: 1 },
          { description: "Additional User Licenses", amount: 50.00, quantity: 4 }
        ],
        subtotal: 1200.00,
        tax: 0.00,
        total: 1200.00,
        paymentMethod: "Credit Card",
        notes: "Thank you for your business"
      })
    );
  }),
  
  // Company Profile handler
  rest.get('*/organizations/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: "org-1",
        name: "Legal Eagles Corporation",
        legalName: "Legal Eagles LLC",
        address: "123 Law Street, Legal City",
        contactEmail: "info@legaleagles.com",
        contactPhone: "555-LEGAL",
        website: "https://www.legaleagles.com",
        description: "Legal Eagles is a premier law firm specializing in corporate law, intellectual property, and litigation services.",
        taxId: "LEG-12345",
        registrationNumber: "NY-987654",
        foundedYear: "2010",
        logoUrl: "https://example.com/logo.png"
      })
    );
  }),
  
  rest.put('*/organizations/profile', (req, res, ctx) => {
    const profileData = req.body as any;
    
    return res(
      ctx.status(200),
      ctx.json({
        ...profileData,
        updatedAt: new Date().toISOString()
      })
    );
  }),
  
  // Subscription plan handlers
  rest.get('*/plans', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        plans: [
          {
            id: "1",
            name: "Basic",
            description: "Basic plan for small firms",
            price: 99,
            isActive: true
          },
          {
            id: "2", 
            name: "Standard",
            description: "Standard plan for medium firms",
            price: 199,
            isActive: true
          },
          {
            id: "3",
            name: "Premium",
            description: "Premium plan for large firms",
            price: 299,
            isActive: true
          }
        ],
        total: 3,
        page: 1,
        pageSize: 10
      })
    );
  })
];
