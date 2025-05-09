
import { getCompanyProfile, updateCompanyProfile } from '../organizationService';

describe('Organization Service', () => {
  
  it('should fetch company profile successfully', async () => {
    const profile = await getCompanyProfile();
    
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Legal Eagles Corporation');
    expect(profile.contactEmail).toBe('info@legaleagles.com');
  });
  
  it('should update company profile successfully', async () => {
    const updatedData = {
      name: 'Updated Company Name',
      address: 'New Address',
      contactEmail: 'updated@example.com'
    };
    
    const result = await updateCompanyProfile(updatedData);
    
    expect(result).toBeDefined();
    expect(result.name).toBe('Updated Company Name');
    expect(result.contactEmail).toBe('updated@example.com');
  });
  
});
