
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// Settings pages
import Settings from "@/pages/Settings";

export const settingsRoutes: RouteObject[] = [
  {
    path: "/settings",
    element: (
      <PrivateRoute requiredModule={Modules.Settings} requiredAction="VIEW">
        <Settings />
      </PrivateRoute>
    )
  }
];
