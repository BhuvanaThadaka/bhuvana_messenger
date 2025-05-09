
import React from "react";
import { useParams } from "react-router-dom";
import CaseView from "@/components/cases/CaseView";
import CrudLayout from "@/components/crud/CrudLayout";

const ViewCase = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <CrudLayout
      title="Case Details"
      description={`Viewing case - ID: ${id}`}
      showAddButton={false}
    >
      <CaseView />
    </CrudLayout>
  );
};

export default ViewCase;
