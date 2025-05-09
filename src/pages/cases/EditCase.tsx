
import React from "react";
import { useParams } from "react-router-dom";
import CaseForm from "@/components/cases/CaseForm";
import CrudLayout from "@/components/crud/CrudLayout";

const EditCase = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <CrudLayout
      title="Edit Case"
      description={`Updating case details - ID: ${id}`}
      showAddButton={false}
    >
      <CaseForm mode="edit" />
    </CrudLayout>
  );
};

export default EditCase;
