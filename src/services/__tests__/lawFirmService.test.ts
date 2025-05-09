import { 
  getLawFirms, 
  getLawFirmById, 
  createLawFirm, 
  updateLawFirm, 
  deleteLawFirm, 
  toggleLawFirmStatus
} from '../lawFirm/lawFirmService';
import { LawFirmListParams, LawFirmFormData } from '../lawFirm/lawFirmTypes';

describe('Law Firm Service', () => {
  
  it('should fetch law firms successfully', async () => {
    const params: LawFirmListParams = {
      page: 1,
      pageSize: 10,
      search: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    
    const result = await getLawFirms(params);
    
    expect(result).toBeDefined();
    expect(result.firms.length).toBeGreaterThan(0);
    expect(result.firms[0].name).toBeDefined();
  });
  
  it('should fetch a law firm by ID', async () => {
    const lawFirm = await getLawFirmById('1');
    
    expect(lawFirm).toBeDefined();
    expect(lawFirm.name).toBe('Smith & Associates');
    expect(lawFirm.firmCode).toBe('SA-001');
  });
  
  it('should create a new law firm', async () => {
    const newLawFirmData: LawFirmFormData = {
      name: 'Test Law Firm',
      firmCode: 'TLF-001',
      registrationNumber: 'REG-12345',
      firmType: 'LLC',
      taxId: 'TAX-54321',
      establishmentYear: 2023,
      primaryContactName: 'John Doe',
      primaryContactNumber: '555-1234',
      country: 'US',
      state: 'NY',
      city: 'New York',
      officeAddress: '123 Legal St',
      zipCode: '10001',
      adminName: 'Admin User',
      adminEmail: 'admin@testlawfirm.com',
      adminPhone: '555-5678',
      plan: 'basic'
    };
    
    const result = await createLawFirm(newLawFirmData);
    
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Test Law Firm');
  });
  
  it('should update a law firm', async () => {
    const updateData = {
      name: 'Updated Law Firm Name',
      primaryContactName: 'Jane Smith'
    };
    
    const result = await updateLawFirm('1', updateData);
    
    expect(result).toBeDefined();
    expect(result.name).toBe('Updated Law Firm Name');
    expect(result.primaryContactName).toBe('Jane Smith');
  });
  
  it('should delete a law firm', async () => {
    const result = await deleteLawFirm('1');
    
    expect(result).toBe('1');
  });
  
  it('should toggle law firm status', async () => {
    const result = await toggleLawFirmStatus('1', false);
    
    expect(result).toBeDefined();
    expect(result.isActive).toBe(false);
  });
  
});
