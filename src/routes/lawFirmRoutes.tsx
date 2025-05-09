
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// Law firm pages
import LawFirms from "@/pages/law-firm/LawFirms";
import CreateLawFirm from "@/pages/law-firm/CreateLawFirm";
import EditLawFirm from "@/pages/law-firm/EditLawFirm";
import ViewLawFirm from "@/pages/law-firm/ViewLawFirm";

export const lawFirmRoutes: RouteObject[] = [
  {
    path: "/law-firms",
    element: (
      <PrivateRoute requiredModule={Modules.LawFirmManagement} requiredAction="VIEW">
        <LawFirms />
      </PrivateRoute>
    )
  },
  {
    path: "/law-firms/create",
    element: (
      <PrivateRoute requiredModule={Modules.LawFirmManagement} requiredAction="CREATE">
        <CreateLawFirm />
      </PrivateRoute>
    )
  },
  {
    path: "/law-firms/edit/:id",
    element: (
      <PrivateRoute requiredModule={Modules.LawFirmManagement} requiredAction="EDIT">
        <EditLawFirm />
      </PrivateRoute>
    )
  },
  {
    path: "/law-firms/view/:id",
    element: (
      <PrivateRoute requiredModule={Modules.LawFirmManagement} requiredAction="VIEW">
        <ViewLawFirm />
      </PrivateRoute>
    )
  }
];
