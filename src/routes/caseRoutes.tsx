
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// Case management pages
import Cases from "@/pages/Cases";
import CasesManagement from "@/pages/cases/CasesManagement";
import CreateCase from "@/pages/cases/CreateCase";
import EditCase from "@/pages/cases/EditCase";
import ViewCase from "@/pages/cases/ViewCase";

export const caseRoutes: RouteObject[] = [
  {
    path: "/cases",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CasesManagement />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/create",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="CREATE">
        <CreateCase />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/edit/:id",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="UPDATE">
        <EditCase />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/view/:id",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <ViewCase />
      </PrivateRoute>
    )
  },
  {
    path: "/cases-old",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <Cases />
      </PrivateRoute>
    )
  }
];
