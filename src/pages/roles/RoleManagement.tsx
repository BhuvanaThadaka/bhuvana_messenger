
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusCircle, MoreHorizontal, Check, Loader2, Shield, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modules } from "@/types/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import RoleForm, { Role } from "@/components/roles/RoleForm";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Simulated role service functions (in a real app, these would be from an actual service)
const mockRoles: Role[] = [
  {
    id: 1,
    name: "ADMIN",
    description: "Full system access",
    userCount: 2,
    permissions: Object.values(Modules),
  },
  {
    id: 2,
    name: "MANAGER",
    description: "Case and user management access",
    userCount: 3,
    permissions: [
      Modules.Dashboard,
      Modules.CaseManagement,
      Modules.UserManagement,
      Modules.UserProfile,
    ],
  },
  {
    id: 3,
    name: "USER",
    description: "Basic case and profile access",
    userCount: 10,
    permissions: [
      Modules.Dashboard,
      Modules.CaseManagement,
      Modules.UserProfile,
    ],
  },
  {
    id: 4,
    name: "READONLY",
    description: "View-only access to cases",
    userCount: 5,
    permissions: [
      Modules.Dashboard,
      Modules.CaseManagement,
    ],
  },
];

// Mock role service functions
const getRoles = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockRoles];
};

const createRole = async (roleData: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const newRole: Role = {
    id: Math.max(...mockRoles.map(r => r.id)) + 1,
    name: roleData.name,
    description: roleData.description,
    permissions: roleData.permissions,
    userCount: 0
  };
  mockRoles.push(newRole);
  return newRole;
};

const updateRole = async (id: number, roleData: any) => {
  await new Promise(resolve => setTimeout(resolve, 700));
  const index = mockRoles.findIndex(r => r.id === id);
  if (index >= 0) {
    mockRoles[index] = {
      ...mockRoles[index],
      name: roleData.name,
      description: roleData.description,
      permissions: roleData.permissions
    };
    return mockRoles[index];
  }
  throw new Error("Role not found");
};

const deleteRole = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const index = mockRoles.findIndex(r => r.id === id);
  if (index >= 0) {
    mockRoles.splice(index, 1);
    return { success: true };
  }
  throw new Error("Role not found");
};

const RoleManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Role form state
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // View permissions dialog state
  const [viewPermissionsRole, setViewPermissionsRole] = useState<Role | null>(null);
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  
  useEffect(() => {
    loadRoles();
  }, []);
  
  const loadRoles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedRoles = await getRoles();
      setRoles(loadedRoles);
    } catch (err) {
      setError("Failed to load roles. Please try again.");
      console.error("Error loading roles:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create or update role
  const handleSubmitRole = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (isCreating) {
        await createRole(data);
        toast({
          title: "Role created",
          description: "The role has been created successfully.",
        });
      } else if (selectedRole) {
        await updateRole(selectedRole.id, data);
        toast({
          title: "Role updated",
          description: "The role has been updated successfully.",
        });
      }
      loadRoles();
      closeRoleForm();
    } catch (err) {
      console.error("Error saving role:", err);
      toast({
        title: "Error",
        description: "Failed to save role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Open role form for creating
  const openCreateRoleForm = () => {
    setSelectedRole(undefined);
    setIsCreating(true);
    setIsRoleFormOpen(true);
  };
  
  // Open role form for editing
  const openEditRoleForm = (role: Role) => {
    setSelectedRole(role);
    setIsCreating(false);
    setIsRoleFormOpen(true);
  };
  
  // Close role form
  const closeRoleForm = () => {
    setIsRoleFormOpen(false);
    setSelectedRole(undefined);
    setIsCreating(false);
  };
  
  // Handle role deletion
  const openDeleteDialog = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteRole = async () => {
    if (!roleToDelete) return;
    
    try {
      await deleteRole(roleToDelete.id);
      toast({
        title: "Role deleted",
        description: "The role has been deleted successfully.",
      });
      loadRoles();
    } catch (err) {
      console.error("Error deleting role:", err);
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };
  
  // View role permissions
  const handleViewPermissions = (role: Role) => {
    setViewPermissionsRole(role);
  };
  
  // Filter roles based on search query
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Role Management</h2>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-auto">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search roles..."
              className="w-full sm:w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            className="flex items-center gap-1"
            onClick={openCreateRoleForm}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Role</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Manage roles and their permissions within the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>User Count</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>{role.id}</TableCell>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.userCount}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewPermissions(role)}>
                              View Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditRoleForm(role)}>
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-500"
                              onClick={() => openDeleteDialog(role)}
                            >
                              Delete Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Shield className="h-8 w-8 mb-2" />
                        <p>No roles found matching your search.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          {/* Permissions Dialog */}
          <Dialog 
            open={!!viewPermissionsRole} 
            onOpenChange={(open) => !open && setViewPermissionsRole(null)}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {viewPermissionsRole?.name} Permissions
                </DialogTitle>
                <DialogDescription>
                  View the permissions for this role.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <h4 className="text-sm font-medium mb-3">Module Access</h4>
                <div className="space-y-2">
                  {Object.values(Modules).map((module) => (
                    <div key={module} className="flex items-center gap-2">
                      <Checkbox 
                        id={`module-${module}`} 
                        checked={viewPermissionsRole?.permissions.includes(module)}
                        disabled
                      />
                      <label 
                        htmlFor={`module-${module}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {module}
                        {viewPermissionsRole?.permissions.includes(module) && (
                          <span className="ml-2 text-xs text-green-500">
                            <Check className="inline-block h-3 w-3" /> Enabled
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter className="sm:justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setViewPermissionsRole(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Role Form */}
      <RoleForm
        role={selectedRole}
        isOpen={isRoleFormOpen}
        isSubmitting={isSubmitting}
        onClose={closeRoleForm}
        onSubmit={handleSubmitRole}
        title={isCreating ? "Create Role" : "Edit Role"}
        description={isCreating ? "Add a new role to the system" : "Modify role details"}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the role{" "}
              <span className="font-medium">{roleToDelete?.name}</span>. 
              {roleToDelete?.userCount > 0 && (
                <span className="text-red-500 font-medium">
                  {" "}This role is currently assigned to {roleToDelete.userCount} users who will lose these permissions.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoleManagement;
