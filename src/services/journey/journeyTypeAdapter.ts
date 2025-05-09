
import { JourneyStatus } from './journeyEnums';
import { CaseJourneyEntry as UIJourneyEntry, UserInfo as UIUserInfo, JourneyStatus as UIJourneyStatus } from '@/types/caseJourney';
import { CaseJourneyEntry as ServiceJourneyEntry } from './journeyService';

/**
 * Converts a service journey entry to UI journey entry
 */
export const toUIJourneyEntry = (journeyEntry: ServiceJourneyEntry): UIJourneyEntry => {
  return {
    id: journeyEntry.id,
    caseId: journeyEntry.caseId,
    title: journeyEntry.title,
    description: journeyEntry.description,
    // Convert enum to string literal type
    status: journeyStatusToUIStatus(journeyEntry.status),
    date: journeyEntry.date,
    createdAt: journeyEntry.createdAt,
    updatedAt: journeyEntry.updatedAt,
    createdBy: {
      id: journeyEntry.createdBy.id,
      name: journeyEntry.createdBy.name,
      avatar: undefined,
      role: undefined
    },
    updatedBy: {
      id: journeyEntry.updatedBy.id,
      name: journeyEntry.updatedBy.name,
      avatar: undefined,
      role: undefined
    },
    attachments: journeyEntry.attachments.map(attachment => ({
      id: attachment.id,
      name: attachment.fileName,
      type: attachment.fileType,
      size: attachment.fileSize,
      url: attachment.url,
      uploadedAt: attachment.uploadedAt,
      uploadedBy: {
        id: attachment.uploadedBy,
        name: attachment.uploadedBy
      }
    }))
  };
};

/**
 * Converts UI user info to service user info
 */
export const toServiceUserInfo = (userInfo: UIUserInfo): { id: string; name: string; email: string } => {
  return {
    id: userInfo.id,
    name: userInfo.name,
    email: userInfo.id || 'user@example.com' // Provide a default email if not available
  };
};

/**
 * Converts a string literal status to enum status
 */
export const toServiceStatus = (status: string): JourneyStatus => {
  switch(status) {
    case "completed": return JourneyStatus.COMPLETED;
    case "in-progress": return JourneyStatus.IN_PROGRESS;
    case "pending": return JourneyStatus.PENDING;
    case "adjourned": return JourneyStatus.ADJOURNED;
    case "cancelled": return JourneyStatus.CANCELLED;
    default: return JourneyStatus.PENDING;
  }
};

/**
 * Converts an enum status to UI string literal status
 */
export const journeyStatusToUIStatus = (status: JourneyStatus): UIJourneyStatus => {
  switch(status) {
    case JourneyStatus.COMPLETED: return "completed";
    case JourneyStatus.IN_PROGRESS: return "in-progress";
    case JourneyStatus.PENDING: return "pending";
    case JourneyStatus.ADJOURNED: return "adjourned";
    case JourneyStatus.CANCELLED: return "cancelled";
    default: return "pending";
  }
};
