
import { 
  getCaseJourneyList, 
  getCaseJourneyEntry,
  createCaseJourneyEntry,
  updateCaseJourneyEntry,
  deleteCaseJourneyEntry,
  getJourneyVersionHistory
} from '../journey/journeyService';
import { JourneyStatus } from '../journey/journeyEnums';

describe('Case Journey Service', () => {
  
  const mockUser = {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com'
  };
  
  it('should fetch journey entries for a case', async () => {
    const entries = await getCaseJourneyList('case-1');
    
    expect(entries).toBeDefined();
    expect(Array.isArray(entries)).toBe(true);
  });
  
  it('should create a new journey entry', async () => {
    const newEntry = {
      caseId: 'case-1',
      title: 'Test Journey Entry',
      description: 'This is a test journey entry',
      status: JourneyStatus.IN_PROGRESS,
      date: '2023-06-01',
      createdBy: mockUser,
      updatedBy: mockUser,
      attachments: []
    };
    
    const result = await createCaseJourneyEntry(newEntry);
    
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.title).toBe('Test Journey Entry');
  });
  
  it('should fetch a specific journey entry', async () => {
    // First create an entry to make sure there's one to fetch
    const newEntry = {
      caseId: 'case-1',
      title: 'Entry to Fetch',
      description: 'This is a test journey entry to fetch',
      status: JourneyStatus.IN_PROGRESS,
      date: '2023-06-01',
      createdBy: mockUser,
      updatedBy: mockUser,
      attachments: []
    };
    
    const created = await createCaseJourneyEntry(newEntry);
    
    const result = await getCaseJourneyEntry(created.id);
    
    expect(result).toBeDefined();
    expect(result.id).toBe(created.id);
    expect(result.title).toBe('Entry to Fetch');
  });
  
  it('should update a journey entry', async () => {
    // First create an entry to update
    const newEntry = {
      caseId: 'case-1',
      title: 'Entry to Update',
      description: 'This is a test journey entry to update',
      status: JourneyStatus.IN_PROGRESS,
      date: '2023-06-01',
      createdBy: mockUser,
      updatedBy: mockUser,
      attachments: []
    };
    
    const created = await createCaseJourneyEntry(newEntry);
    
    const updateData = {
      title: 'Updated Title',
      description: 'Updated description',
      status: JourneyStatus.COMPLETED,
      updatedBy: mockUser
    };
    
    const updated = await updateCaseJourneyEntry(created.id, updateData);
    
    expect(updated).toBeDefined();
    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Updated Title');
    expect(updated.status).toBe(JourneyStatus.COMPLETED);
  });
  
  it('should get version history for a journey entry', async () => {
    // First create an entry
    const newEntry = {
      caseId: 'case-1',
      title: 'Entry for Version History',
      description: 'Testing version history',
      status: JourneyStatus.IN_PROGRESS,
      date: '2023-06-01',
      createdBy: mockUser,
      updatedBy: mockUser,
      attachments: []
    };
    
    const created = await createCaseJourneyEntry(newEntry);
    
    // Then update it to create version history
    await updateCaseJourneyEntry(created.id, {
      title: 'Updated Title for History',
      updatedBy: mockUser
    });
    
    const history = await getJourneyVersionHistory(created.id);
    
    expect(history).toBeDefined();
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBeGreaterThan(0);
  });
  
  it('should delete a journey entry', async () => {
    // First create an entry to delete
    const newEntry = {
      caseId: 'case-1',
      title: 'Entry to Delete',
      description: 'This is a test journey entry to delete',
      status: JourneyStatus.IN_PROGRESS,
      date: '2023-06-01',
      createdBy: mockUser,
      updatedBy: mockUser,
      attachments: []
    };
    
    const created = await createCaseJourneyEntry(newEntry);
    
    await expect(deleteCaseJourneyEntry(created.id)).resolves.not.toThrow();
    
    // Verify it's deleted by trying to fetch it
    await expect(getCaseJourneyEntry(created.id)).rejects.toThrow();
  });
  
});
