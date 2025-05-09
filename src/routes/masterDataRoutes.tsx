
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// Master data pages
import MasterData from "@/pages/MasterData";

export const masterDataRoutes: RouteObject[] = [
  {
    path: "/master-data",
    element: (
      <PrivateRoute requiredModule={Modules.MasterDataManagement} requiredAction="VIEW">
        <MasterData />
      </PrivateRoute>
    )
  }
];
