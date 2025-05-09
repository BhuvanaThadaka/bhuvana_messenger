
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";

// Case Journey pages
import CaseJourneyManager from "@/pages/matters/CaseJourneyManager";
import AddCaseJourneyForm from "@/pages/matters/journey/AddCaseJourneyForm";
import EditCaseJourneyForm from "@/pages/matters/journey/EditCaseJourneyForm";
import CaseJourneyDetailPage from "@/pages/matters/journey/CaseJourneyDetailPage";
import CaseView from "@/pages/matters/CaseView";
import CaseForm from "@/pages/matters/CaseForm";
import DocumentGeneration from "@/pages/matters/DocumentGeneration";

export const matterRoutes: RouteObject[] = [
  // Redirect from matters to case-journey
  {
    path: "/matters",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CaseJourneyManager />
      </PrivateRoute>
    )
  },
  {
    path: "/matters/create",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="CREATE">
        <CaseForm />
      </PrivateRoute>
    )
  },
  {
    path: "/matters/edit/:id",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="UPDATE">
        <CaseForm />
      </PrivateRoute>
    )
  },
  {
    path: "/matters/:id",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CaseView />
      </PrivateRoute>
    )
  },
  // Case Journey routes - consolidated module
  {
    path: "/case-journey",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CaseJourneyManager />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/:caseId/journey",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CaseJourneyManager />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/:caseId/journey/add",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="CREATE">
        <AddCaseJourneyForm />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/:caseId/journey/edit/:journeyId",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="UPDATE">
        <EditCaseJourneyForm />
      </PrivateRoute>
    )
  },
  {
    path: "/cases/:caseId/journey/view/:journeyId",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="VIEW">
        <CaseJourneyDetailPage />
      </PrivateRoute>
    )
  },
  {
    path: "/document-generation",
    element: (
      <PrivateRoute requiredModule={Modules.CaseManagement} requiredAction="CREATE">
        <DocumentGeneration />
      </PrivateRoute>
    )
  }
];
