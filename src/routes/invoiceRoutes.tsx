
import { RouteObject } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import { Modules } from "@/types/auth";
import Invoices from "@/pages/Invoices";

export const invoiceRoutes: RouteObject[] = [
  {
    path: "/invoices",
    element: (
      <PrivateRoute requiredModule={Modules.InvoiceManagement} requiredAction="VIEW">
        <Invoices />
      </PrivateRoute>
    )
  }
];
