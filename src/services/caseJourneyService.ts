
// This file now serves as a re-export of the refactored journey service
// It maintains backward compatibility with existing imports
import { 
  getCaseJourneyList,
  getCaseJourneyEntry,
  createCaseJourneyEntry,
  updateCaseJourneyEntry,
  deleteCaseJourneyEntry,
  getJourneyVersionHistory
} from './journey';

export {
  getCaseJourneyList,
  getCaseJourneyEntry,
  createCaseJourneyEntry,
  updateCaseJourneyEntry,
  deleteCaseJourneyEntry,
  getJourneyVersionHistory
};
