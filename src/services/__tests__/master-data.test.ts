
import { getCourts, createCourt, updateCourt, deleteCourt } from '../master-data/courtService';
import { getLawTypes } from '../master-data/lawTypeService';
import { getClients } from '../master-data/clientService';

describe('Master Data Services', () => {
  
  describe('Court Service', () => {
    it('should fetch courts successfully', async () => {
      const response = await getCourts();
      
      expect(response).toBeDefined();
      expect(response.data).toHaveLength(5); // Based on mock data
      expect(response.data[0].name).toBe('Supreme Court');
    });
    
    it('should create a court successfully', async () => {
      const newCourt = {
        name: 'Test Court',
        location: 'Test Location',
        type: 'Test Type'
      };
      
      const response = await createCourt(newCourt);
      
      expect(response).toBeDefined();
      expect(response.data.name).toBe('Test Court');
      expect(response.data.id).toBeDefined();
    });
    
    it('should update a court successfully', async () => {
      const updatedData = {
        name: 'Updated Court',
        location: 'Updated Location',
        type: 'Updated Type'
      };
      
      const response = await updateCourt('court-1', updatedData);
      
      expect(response).toBeDefined();
      expect(response.data.name).toBe('Updated Court');
    });
    
    it('should delete a court successfully', async () => {
      const response = await deleteCourt('court-1');
      
      expect(response).toBeDefined();
      expect(response.data).toBe(true);
    });
  });
  
  describe('Law Type Service', () => {
    it('should fetch law types successfully', async () => {
      const response = await getLawTypes();
      
      expect(response).toBeDefined();
      expect(response.data).toHaveLength(5); // Based on mock data
    });
  });
  
  describe('Client Service', () => {
    it('should fetch clients successfully', async () => {
      const response = await getClients();
      
      expect(response).toBeDefined();
      expect(response.data).toHaveLength(5); // Based on mock data
    });
  });
  
});
