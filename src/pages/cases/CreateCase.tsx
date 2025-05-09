
import React from "react";
import CaseForm from "@/components/cases/CaseForm";
import CrudLayout from "@/components/crud/CrudLayout";

const CreateCase = () => {
  return (
    <CrudLayout
      title="Create New Case"
      description="Add a new legal case to the system"
      showAddButton={false}
    >
      <CaseForm mode="create" />
    </CrudLayout>
  );
};

export default CreateCase;
