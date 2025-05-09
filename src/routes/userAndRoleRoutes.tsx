
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// User and role management pages
import Users from "@/pages/Users";
import Roles from "@/pages/Roles";
import UserManagement from "@/pages/users/UserManagement";
import RoleManagement from "@/pages/roles/RoleManagement";
import CompanyProfile from "@/pages/CompanyProfile";

export const userAndRoleRoutes: RouteObject[] = [
  {
    path: "/users-management",
    element: (
      <PrivateRoute requiredModule={Modules.UserManagement} requiredAction="VIEW">
        <UserManagement />
      </PrivateRoute>
    )
  },
  {
    path: "/roles-management",
    element: (
      <PrivateRoute requiredModule={Modules.RoleManagement} requiredAction="VIEW">
        <RoleManagement />
      </PrivateRoute>
    )
  },
  {
    path: "/users",
    element: (
      <PrivateRoute requiredModule={Modules.UserManagement} requiredAction="VIEW">
        <Users />
      </PrivateRoute>
    )
  },
  {
    path: "/roles",
    element: (
      <PrivateRoute requiredModule={Modules.RoleManagement} requiredAction="VIEW">
        <Roles />
      </PrivateRoute>
    )
  },
  {
    path: "/company-profile",
    element: (
      <PrivateRoute requiredModule={Modules.CompanyProfile} requiredAction="VIEW">
        <CompanyProfile />
      </PrivateRoute>
    )
  },
  {
    path: "/staff-management",
    element: (
      <PrivateRoute requiredModule={Modules.StaffManagement} requiredAction="VIEW">
        <Users />
      </PrivateRoute>
    )
  }
];
