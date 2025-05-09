
import { useState } from "react";
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
import { SearchIcon, PlusCircle, MoreHorizontal, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modules } from "@/types/auth";
import { Checkbox } from "@/components/ui/checkbox";

// Mock roles data
const roles = [
  {
    id: 1,
    name: "ADMIN",
    description: "Full system access",
    userCount: 1,
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

const Roles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewPermissionsRole, setViewPermissionsRole] = useState<any | null>(null);
  
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewPermissions = (role: any) => {
    setViewPermissionsRole(role);
  };

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
          
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Role</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Manage roles and their permissions within the system
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                          <DropdownMenuItem>Edit Role</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate Role</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
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
                    No roles found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

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
    </div>
  );
};

export default Roles;
