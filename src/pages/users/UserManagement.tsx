
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
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  PlusCircle,
  MoreHorizontal,
  User as UserIcon,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  UserFormData,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
} from "@/services/mockUserService";
import UserForm from "@/components/users/UserForm";
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
import { useToast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  
  // User form state
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isCreating, setIsCreating] = useState(false);
  
  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsers({
        page: 1,
        pageSize: 100,
        search: searchQuery,
      });
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    loadUsers();
  };
  
  // Create or update user
  const handleSubmitUser = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      if (isCreating) {
        await createUser(data);
        toast({
          title: "User created",
          description: "The user has been created successfully.",
        });
      } else if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast({
          title: "User updated",
          description: "The user has been updated successfully.",
        });
      }
      loadUsers();
      closeUserForm();
    } catch (err) {
      console.error("Error saving user:", err);
      toast({
        title: "Error",
        description: "Failed to save user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Open user form for creating
  const openCreateUserForm = () => {
    setSelectedUser(undefined);
    setIsCreating(true);
    setIsUserFormOpen(true);
  };
  
  // Open user form for editing
  const openEditUserForm = (user: User) => {
    setSelectedUser(user);
    setIsCreating(false);
    setIsUserFormOpen(true);
  };
  
  // Close user form
  const closeUserForm = () => {
    setIsUserFormOpen(false);
    setSelectedUser(undefined);
    setIsCreating(false);
  };
  
  // Open delete confirmation
  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      await deleteUser(userToDelete.id);
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      });
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  // Handle status change
  const handleStatusChange = async (user: User, newStatus: User["status"]) => {
    try {
      await updateUserStatus(user.id, newStatus);
      toast({
        title: "Status updated",
        description: `User status changed to ${newStatus}.`,
      });
      loadUsers();
    } catch (err) {
      console.error("Error updating status:", err);
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-red-500">Admin</Badge>;
      case "MANAGER":
        return <Badge className="bg-blue-500">Manager</Badge>;
      case "USER":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="outline" className="text-green-500 border-green-500">Active</Badge>;
      case "Inactive":
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case "Suspended":
        return <Badge variant="outline" className="text-red-500 border-red-500">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-auto">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full sm:w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          
          <Button 
            className="flex items-center gap-1"
            onClick={openCreateUserForm}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add User</span>
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
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="w-[80px]">{user.id.split('-')[1]}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
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
                            <DropdownMenuItem onClick={() => openEditUserForm(user)}>
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "Active" ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(user, "Inactive")}>
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleStatusChange(user, "Active")}>
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              className="text-red-500"
                              onClick={() => openDeleteDialog(user)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <UserIcon className="h-8 w-8 mb-2" />
                        <p>No users found matching your search.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm
        user={selectedUser}
        isOpen={isUserFormOpen}
        isSubmitting={isSubmitting}
        onClose={closeUserForm}
        onSubmit={handleSubmitUser}
        title={isCreating ? "Create User" : "Edit User"}
        description={isCreating ? "Add a new user to the system" : "Modify user details"}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user account for{" "}
              <span className="font-medium">{userToDelete?.name}</span>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
