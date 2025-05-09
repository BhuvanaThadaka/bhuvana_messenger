
import { apiResponse, delay, generateId, showSuccessToast, showErrorToast } from "../mockApiService";
import { LawTypeData } from "./types";
import { lawTypesMockData } from "./mockData";

// Mutable reference to the mock data
let lawTypes = [...lawTypesMockData];

// Law Type API methods
export async function getLawTypes() {
  await delay(300);
  return apiResponse(lawTypes);
}

export async function getLawTypeById(id: string) {
  await delay(200);
  const lawType = lawTypes.find(lawType => lawType.id === id);
  if (!lawType) {
    return apiResponse(null, false, "Law type not found");
  }
  return apiResponse(lawType);
}

export async function createLawType(data: Omit<LawTypeData, "id">) {
  await delay(500);
  const newLawType = { ...data, id: `law-${generateId()}` };
  lawTypes.push(newLawType);
  showSuccessToast("Law type created successfully");
  return apiResponse(newLawType);
}

export async function updateLawType(id: string, data: Omit<LawTypeData, "id">) {
  await delay(500);
  const index = lawTypes.findIndex(lawType => lawType.id === id);
  if (index === -1) {
    showErrorToast("Law type not found");
    return apiResponse(null, false, "Law type not found");
  }
  
  const updatedLawType = { ...data, id };
  lawTypes[index] = updatedLawType;
  showSuccessToast("Law type updated successfully");
  return apiResponse(updatedLawType);
}

export async function deleteLawType(id: string) {
  await delay(400);
  const initialLength = lawTypes.length;
  lawTypes = lawTypes.filter(lawType => lawType.id !== id);
  
  if (lawTypes.length === initialLength) {
    showErrorToast("Law type not found");
    return apiResponse(false, false, "Law type not found");
  }
  
  showSuccessToast("Law type deleted successfully");
  return apiResponse(true);
}

// Reset function for testing purposes
export function resetLawTypeData() {
  lawTypes = [...lawTypesMockData];
}
