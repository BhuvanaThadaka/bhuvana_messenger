
import { apiResponse, delay, generateId, showSuccessToast, showErrorToast } from "../mockApiService";
import { CourtData } from "./types";
import { courtsMockData } from "./mockData";

// Mutable reference to the mock data
let courts = [...courtsMockData];

// Court API methods
export async function getCourts() {
  await delay(300);
  return apiResponse(courts);
}

export async function getCourtById(id: string) {
  await delay(200);
  const court = courts.find(court => court.id === id);
  if (!court) {
    return apiResponse(null, false, "Court not found");
  }
  return apiResponse(court);
}

export async function createCourt(data: Omit<CourtData, "id">) {
  await delay(500);
  const newCourt = { ...data, id: `court-${generateId()}` };
  courts.push(newCourt);
  showSuccessToast("Court created successfully");
  return apiResponse(newCourt);
}

export async function updateCourt(id: string, data: Omit<CourtData, "id">) {
  await delay(500);
  const index = courts.findIndex(court => court.id === id);
  if (index === -1) {
    showErrorToast("Court not found");
    return apiResponse(null, false, "Court not found");
  }
  
  const updatedCourt = { ...data, id };
  courts[index] = updatedCourt;
  showSuccessToast("Court updated successfully");
  return apiResponse(updatedCourt);
}

export async function deleteCourt(id: string) {
  await delay(400);
  const initialLength = courts.length;
  courts = courts.filter(court => court.id !== id);
  
  if (courts.length === initialLength) {
    showErrorToast("Court not found");
    return apiResponse(false, false, "Court not found");
  }
  
  showSuccessToast("Court deleted successfully");
  return apiResponse(true);
}

// Reset function for testing purposes
export function resetCourtData() {
  courts = [...courtsMockData];
}
