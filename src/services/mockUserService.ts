
import { apiResponse, delay, generateId, showSuccessToast, showErrorToast } from './mockApiService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
}

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  phone?: string;
  department?: string;
  permissions: string[];
}

export interface UserListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Mock users data
let mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "ADMIN",
    status: "Active",
    lastLogin: "2025-04-02",
    avatar: null,
    phone: "+1 (555) 123-4567",
    department: "Legal",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2025-04-02T09:15:00Z",
    permissions: ["users.view", "users.create", "users.update", "users.delete", "cases.view", "cases.create", "cases.update", "cases.delete"],
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "USER",
    status: "Active",
    lastLogin: "2025-04-01",
    avatar: null,
    phone: "+1 (555) 234-5678",
    department: "Legal",
    createdAt: "2024-02-20T14:45:00Z",
    updatedAt: "2025-04-01T11:30:00Z",
    permissions: ["cases.view", "cases.create", "cases.update"],
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "MANAGER",
    status: "Active",
    lastLogin: "2025-03-30",
    avatar: null,
    phone: "+1 (555) 345-6789",
    department: "Legal",
    createdAt: "2024-01-25T09:15:00Z",
    updatedAt: "2025-03-30T16:45:00Z",
    permissions: ["users.view", "users.create", "cases.view", "cases.create", "cases.update", "cases.delete"],
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "USER",
    status: "Inactive",
    lastLogin: "2025-03-15",
    avatar: null,
    phone: "+1 (555) 456-7890",
    department: "Accounting",
    createdAt: "2024-03-10T11:20:00Z",
    updatedAt: "2025-03-15T10:30:00Z",
    permissions: ["cases.view"],
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "USER",
    status: "Active",
    lastLogin: "2025-04-02",
    avatar: null,
    phone: "+1 (555) 567-8901",
    department: "IT",
    createdAt: "2024-02-05T16:30:00Z",
    updatedAt: "2025-04-02T14:20:00Z",
    permissions: ["cases.view", "cases.create"],
  },
];

// Get users with filtering, pagination and sorting
export const getUsers = async (params: UserListParams) => {
  await delay(600);
  
  let filteredUsers = [...mockUsers];
  
  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.department?.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply status filter
  if (params.status) {
    filteredUsers = filteredUsers.filter((user) => user.status === params.status);
  }
  
  // Apply role filter
  if (params.role) {
    filteredUsers = filteredUsers.filter((user) => user.role === params.role);
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredUsers.sort((a: any, b: any) => {
      let aValue = a[params.sortBy!];
      let bValue = b[params.sortBy!];
      
      // Handle nested properties if needed
      
      if (params.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }
  
  // Calculate pagination
  const total = filteredUsers.length;
  const pageSize = params.pageSize || 10;
  const page = params.page || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  
  console.log("[MockAPI] GET /api/users", {
    params,
    results: paginatedUsers.length,
    total,
  });
  
  return apiResponse({
    users: paginatedUsers,
    total,
    page,
    pageSize,
  });
};

// Get a single user by ID
export const getUserById = async (id: string) => {
  await delay(400);
  
  const user = mockUsers.find((u) => u.id === id);
  
  console.log("[MockAPI] GET /api/users/" + id, user);
  
  if (!user) {
    showErrorToast("User not found");
    return apiResponse(null, false, "User not found");
  }
  
  return apiResponse(user);
};

// Create a new user
export const createUser = async (data: UserFormData) => {
  await delay(900);
  
  try {
    // Check if email already exists
    const emailExists = mockUsers.some((u) => u.email === data.email);
    if (emailExists) {
      showErrorToast("A user with this email already exists.");
      return apiResponse(null, false, "Email already exists");
    }
    
    const newUser: User = {
      id: "user-" + generateId(),
      ...data,
      lastLogin: "-",
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    console.log("[MockAPI] POST /api/users/create", newUser);
    showSuccessToast(`User "${data.name}" has been successfully created.`);
    
    return apiResponse(newUser);
  } catch (error) {
    showErrorToast("Error creating user. Please try again.");
    return apiResponse(null, false, "Error creating user");
  }
};

// Update an existing user
export const updateUser = async (id: string, data: Partial<UserFormData>) => {
  await delay(700);
  
  try {
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      showErrorToast("User not found");
      return apiResponse(null, false, "User not found");
    }
    
    // Check if email is being changed and already exists
    if (data.email && data.email !== mockUsers[userIndex].email) {
      const emailExists = mockUsers.some((u) => u.email === data.email && u.id !== id);
      if (emailExists) {
        showErrorToast("A user with this email already exists.");
        return apiResponse(null, false, "Email already exists");
      }
    }
    
    // Update the user
    const updatedUser = {
      ...mockUsers[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers[userIndex] = updatedUser;
    
    console.log("[MockAPI] PUT /api/users/update/" + id, updatedUser);
    showSuccessToast("User updated successfully");
    
    return apiResponse(updatedUser);
  } catch (error) {
    showErrorToast("Error updating user. Please try again.");
    return apiResponse(null, false, "Error updating user");
  }
};

// Delete a user
export const deleteUser = async (id: string) => {
  await delay(800);
  
  try {
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      showErrorToast("User not found");
      return apiResponse(null, false, "User not found");
    }
    
    // Delete the user
    const deletedUser = mockUsers[userIndex];
    mockUsers = mockUsers.filter((u) => u.id !== id);
    
    console.log("[MockAPI] DELETE /api/users/delete/" + id);
    showSuccessToast("User deleted successfully");
    
    return apiResponse({ id });
  } catch (error) {
    showErrorToast("Error deleting user. Please try again.");
    return apiResponse(null, false, "Error deleting user");
  }
};

// Update user status
export const updateUserStatus = async (id: string, status: User["status"]) => {
  await delay(500);
  
  try {
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      showErrorToast("User not found");
      return apiResponse(null, false, "User not found");
    }
    
    // Update status
    mockUsers[userIndex].status = status;
    mockUsers[userIndex].updatedAt = new Date().toISOString();
    
    console.log("[MockAPI] PUT /api/users/" + id + "/status", {
      status,
    });
    showSuccessToast(`User status updated to ${status}`);
    
    return apiResponse(mockUsers[userIndex]);
  } catch (error) {
    showErrorToast("Error updating user status. Please try again.");
    return apiResponse(null, false, "Error updating status");
  }
};

// Reset user password
export const resetUserPassword = async (id: string) => {
  await delay(600);
  
  try {
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    
    if (userIndex === -1) {
      showErrorToast("User not found");
      return apiResponse(null, false, "User not found");
    }
    
    // In a real app, this would generate a password reset token and send an email
    console.log("[MockAPI] POST /api/users/" + id + "/reset-password");
    showSuccessToast(`Password reset instructions sent to ${mockUsers[userIndex].email}`);
    
    return apiResponse({ success: true });
  } catch (error) {
    showErrorToast("Error resetting password. Please try again.");
    return apiResponse(null, false, "Error resetting password");
  }
};
