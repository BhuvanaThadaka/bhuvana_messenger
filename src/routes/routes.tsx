
import { Navigate, RouteObject } from "react-router-dom";
import { useAuth, getFirstAccessibleModule } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Layout from "@/components/Layout";
import { Modules } from "@/types/auth";

// Page imports
import Login from "@/pages/Login";
import Branding from "@/pages/Branding";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import CompanyProfile from "@/pages/CompanyProfile";

// Import route groups
import { caseRoutes } from "./caseRoutes";
import { userAndRoleRoutes } from "./userAndRoleRoutes";
import { masterDataRoutes } from "./masterDataRoutes";
import { lawFirmRoutes } from "./lawFirmRoutes";
import { planRoutes } from "./planRoutes";
import { settingsRoutes } from "./settingsRoutes";
import { matterRoutes } from "./matterRoutes";
import { invoiceRoutes } from "./invoiceRoutes";

const RedirectToFirstAccessible = () => {
  const { user } = useAuth();
  const firstModule = getFirstAccessibleModule(user);
  
  switch (firstModule) {
    case Modules.Dashboard:
      return <Navigate to="/dashboard" replace />;
    case Modules.CaseManagement:
      return <Navigate to="/cases" replace />;
    case Modules.UserProfile:
      return <Navigate to="/profile" replace />;
    case Modules.MasterDataManagement:
      return <Navigate to="/master-data" replace />;
    case Modules.UserManagement:
      return <Navigate to="/users-management" replace />;
    case Modules.RoleManagement:
      return <Navigate to="/roles-management" replace />;
    case Modules.LawFirmManagement:
      return <Navigate to="/law-firms" replace />;
    case Modules.PlanManagement:
      return <Navigate to="/plans" replace />;
    case Modules.CompanyProfile:
      return <Navigate to="/company-profile" replace />;
    case Modules.InvoiceManagement:
      return <Navigate to="/invoices" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Public routes (outside the main layout)
export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/branding",
    element: <Branding />
  },
  {
    path: "/",
    element: <Index />
  }
];

// Protected routes (inside the main layout)
export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/app",
        element: <RedirectToFirstAccessible />
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute requiredModule={Modules.Dashboard} requiredAction="VIEW">
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute requiredModule={Modules.UserProfile} requiredAction="VIEW">
            <Profile />
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
      // Include route groups
      ...caseRoutes,
      ...userAndRoleRoutes,
      ...masterDataRoutes,
      ...lawFirmRoutes,
      ...planRoutes,
      ...settingsRoutes,
      ...matterRoutes,
      ...invoiceRoutes,
      {
        path: "/unauthorized",
        element: <Unauthorized />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
];

// Combine all routes
export const appRoutes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes
];
