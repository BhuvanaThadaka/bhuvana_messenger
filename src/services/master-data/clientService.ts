
import { apiResponse, delay, generateId, showSuccessToast, showErrorToast } from "../mockApiService";
import { ClientData } from "./types";
import { clientsMockData } from "./mockData";

// Mutable reference to the mock data
let clients = [...clientsMockData];

// Client API methods
export async function getClients() {
  await delay(300);
  return apiResponse(clients);
}

export async function getClientById(id: string) {
  await delay(200);
  const client = clients.find(client => client.id === id);
  if (!client) {
    return apiResponse(null, false, "Client not found");
  }
  return apiResponse(client);
}

export async function createClient(data: Omit<ClientData, "id">) {
  await delay(500);
  const newClient = { ...data, id: `client-${generateId()}` };
  clients.push(newClient);
  showSuccessToast("Client created successfully");
  return apiResponse(newClient);
}

export async function updateClient(id: string, data: Omit<ClientData, "id">) {
  await delay(500);
  const index = clients.findIndex(client => client.id === id);
  if (index === -1) {
    showErrorToast("Client not found");
    return apiResponse(null, false, "Client not found");
  }
  
  const updatedClient = { ...data, id };
  clients[index] = updatedClient;
  showSuccessToast("Client updated successfully");
  return apiResponse(updatedClient);
}

export async function deleteClient(id: string) {
  await delay(400);
  const initialLength = clients.length;
  clients = clients.filter(client => client.id !== id);
  
  if (clients.length === initialLength) {
    showErrorToast("Client not found");
    return apiResponse(false, false, "Client not found");
  }
  
  showSuccessToast("Client deleted successfully");
  return apiResponse(true);
}

// Reset function for testing purposes
export function resetClientData() {
  clients = [...clientsMockData];
}
