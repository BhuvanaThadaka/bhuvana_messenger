
import { format, subDays } from 'date-fns';

// Generate a random avatar URL
const getRandomAvatar = (userId: string) => {
  return `https://i.pravatar.cc/150?u=${userId}`;
};

// Generate random user data
const generateUsers = () => {
  const users = [
    { id: 'user1', name: 'James Wilson', role: 'Lead Attorney', avatar: getRandomAvatar('user1') },
    { id: 'user2', name: 'Sarah Parker', role: 'Legal Assistant', avatar: getRandomAvatar('user2') },
    { id: 'user3', name: 'Michael Thompson', role: 'Paralegal', avatar: getRandomAvatar('user3') },
    { id: 'user4', name: 'Emma Rodriguez', role: 'Case Manager', avatar: getRandomAvatar('user4') },
    { id: 'user5', name: 'Robert Chen', role: 'Senior Partner', avatar: getRandomAvatar('user5') },
  ];
  return users;
};

const users = generateUsers();

// Generate timeline events with Git-like commit messages and statuses
const generateTimelineEvents = (caseId: string) => {
  const statuses = ['Completed', 'Pending', 'In Progress', 'Adjourned'];
  const today = new Date();
  
  const events = [
    {
      id: `${caseId}-event1`,
      title: 'Initial case filing submitted',
      description: 'Filed the initial complaint with the district court as per client instructions',
      date: format(subDays(today, 30), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Completed',
      updatedBy: users[0]
    },
    {
      id: `${caseId}-event2`,
      title: 'Motion to dismiss received from opposing counsel',
      description: 'The defendant has submitted a motion to dismiss based on jurisdictional grounds',
      date: format(subDays(today, 25), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Completed',
      updatedBy: users[1]
    },
    {
      id: `${caseId}-event3`,
      title: 'Response to motion to dismiss filed',
      description: 'Our response argues that the court has proper jurisdiction based on diversity of citizenship',
      date: format(subDays(today, 18), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Completed',
      updatedBy: users[0]
    },
    {
      id: `${caseId}-event4`,
      title: 'Court hearing on motion to dismiss',
      description: 'Judge denied the motion to dismiss and set a schedule for discovery',
      date: format(subDays(today, 10), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Completed',
      updatedBy: users[4]
    },
    {
      id: `${caseId}-event5`,
      title: 'First set of discovery requests sent',
      description: 'Interrogatories, requests for production, and requests for admission served on defendant',
      date: format(subDays(today, 5), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Completed',
      updatedBy: users[2]
    },
    {
      id: `${caseId}-event6`,
      title: 'Preparing for deposition of defendant',
      description: 'Reviewing documents and preparing questions for upcoming deposition',
      date: format(subDays(today, 2), "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'In Progress',
      updatedBy: users[0]
    },
    {
      id: `${caseId}-event7`,
      title: 'Scheduled settlement conference',
      description: 'Court has ordered parties to attend a settlement conference before the magistrate judge',
      date: format(today, "yyyy-MM-dd'T'HH:mm:ss"),
      status: 'Pending',
      updatedBy: users[3]
    },
  ];
  
  return events;
};

// Generate dummy case data with timeline events
export const generateDummyCaseJourneyData = () => {
  const cases = [
    {
      id: 'case1',
      title: 'Smith v. Johnson Manufacturing',
      type: 'Product Liability',
      status: 'Active',
      priority: 'High',
      lastUpdated: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      timeline: generateTimelineEvents('case1')
    },
    {
      id: 'case2',
      title: 'Estate of Williams v. City General Hospital',
      type: 'Medical Malpractice',
      status: 'Active',
      priority: 'Medium',
      lastUpdated: format(subDays(new Date(), 3), "yyyy-MM-dd'T'HH:mm:ss"),
      timeline: generateTimelineEvents('case2')
    },
    {
      id: 'case3',
      title: 'Green Enterprises v. Blue Corporation',
      type: 'Contract Dispute',
      status: 'Active',
      priority: 'High',
      lastUpdated: format(subDays(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss"),
      timeline: generateTimelineEvents('case3')
    },
    {
      id: 'case4',
      title: 'Wilson v. ABC Insurance',
      type: 'Insurance Claim',
      status: 'On Hold',
      priority: 'Low',
      lastUpdated: format(subDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm:ss"),
      timeline: generateTimelineEvents('case4')
    },
    {
      id: 'case5',
      title: 'Thompson Family Trust',
      type: 'Estate Planning',
      status: 'Closed',
      priority: 'Medium',
      lastUpdated: format(subDays(new Date(), 15), "yyyy-MM-dd'T'HH:mm:ss"),
      timeline: generateTimelineEvents('case5')
    },
  ];
  
  return cases;
};

// Function to get a specific case by ID
export const getCaseJourneyById = (id: string) => {
  const cases = generateDummyCaseJourneyData();
  return cases.find(c => c.id === id);
};

// Function to get all cases
export const getAllCaseJourneys = () => {
  return generateDummyCaseJourneyData();
};
