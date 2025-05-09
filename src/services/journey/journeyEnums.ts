// Define JourneyStatus as an enum with string values that match the string literal type in caseJourney.ts
export enum JourneyStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  PENDING = "pending",
  ADJOURNED = "adjourned",
  CANCELLED = "cancelled",
  // Keep backward compatibility with older values
  NOT_STARTED = "pending",
  ON_HOLD = "adjourned"
}

// Helper function to convert between string literal types and enum values
export const mapStatusToEnum = (status: string): JourneyStatus => {
  switch (status) {
    case "completed": return JourneyStatus.COMPLETED;
    case "in-progress": return JourneyStatus.IN_PROGRESS;
    case "pending": return JourneyStatus.PENDING;
    case "adjourned": return JourneyStatus.ADJOURNED;
    case "cancelled": return JourneyStatus.CANCELLED;
    default: return JourneyStatus.PENDING;
  }
};

// Helper function to map enum to string for UI display
export const getStatusDisplayName = (status: JourneyStatus): string => {
  switch (status) {
    case JourneyStatus.COMPLETED: return "Completed";
    case JourneyStatus.IN_PROGRESS: return "In Progress";
    case JourneyStatus.PENDING: return "Pending";
    case JourneyStatus.ADJOURNED: return "Adjourned";
    case JourneyStatus.CANCELLED: return "Cancelled";
    case JourneyStatus.NOT_STARTED: return "Not Started";
    case JourneyStatus.ON_HOLD: return "On Hold";
    default: return "Unknown";
  }
};
