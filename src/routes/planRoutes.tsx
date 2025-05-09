
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";
import Plans from "@/pages/plans/Plans";

export const planRoutes: RouteObject[] = [
  {
    path: "/plans",
    element: (
      <PrivateRoute requiredModule={Modules.PlanManagement} requiredAction="VIEW">
        <Plans />
      </PrivateRoute>
    )
  }
];
