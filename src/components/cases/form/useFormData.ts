import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CaseFormValues, CaseFormData, caseFormSchema, getDefaultValues } from "./types";
import { getCaseById, createCase, updateCase } from "@/services/mockCaseService";

export const useFormData = (mode: "create" | "edit") => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onBlur"
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchCaseData = async () => {
        try {
          setLoading(true);
          const response = await getCaseById(id);
          
          if (response && 'data' in response && response.data) {
            const data = response.data;
            form.reset({
              title: data.title,
              client: data.client || "",
              clientId: data.clientId || "",
              status: data.status as "Open" | "Pending" | "Closed" | "Draft",
              priority: data.priority as "High" | "Medium" | "Low",
              type: data.type,
              assignedTo: data.assignedTo || "",
              assignedUserId: data.assignedUserId || "",
              description: data.description || "",
              court: data.court || "",
              filingDate: data.filingDate ? new Date(data.filingDate) : undefined,
              hearingDate: data.hearingDate ? new Date(data.hearingDate) : undefined,
              notes: data.notes || "",
              tags: data.tags || []
            });
          } else {
            toast({
              title: "Error",
              description: "Failed to fetch case data",
              variant: "destructive",
            });
            navigate('/cases');
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch case data",
            variant: "destructive",
          });
          navigate('/cases');
        } finally {
          setLoading(false);
        }
      };

      fetchCaseData();
    }
  }, [id, mode, form, navigate, toast]);

  const prepareFormData = (values: CaseFormValues): CaseFormData => {
    return {
      title: values.title,
      client: values.client,
      clientId: values.clientId,
      status: values.status,
      priority: values.priority,
      type: values.type,
      assignedTo: values.assignedTo,
      assignedUserId: values.assignedUserId,
      description: values.description || "", 
      court: values.court,
      filingDate: values.filingDate ? values.filingDate.toISOString().split('T')[0] : undefined,
      hearingDate: values.hearingDate ? values.hearingDate.toISOString().split('T')[0] : undefined,
      notes: values.notes || "",
      tags: values.tags
    };
  };

  return {
    form,
    loading,
    saving,
    showSuccessDialog,
    setShowSuccessDialog,
    onSubmit: async (values: CaseFormValues) => {
      try {
        setSaving(true);
        const formData = prepareFormData(values);
        
        if (mode === "create") {
          await createCase(formData);
          form.reset(getDefaultValues());
          setShowSuccessDialog(true);
        } else if (mode === "edit" && id) {
          await updateCase(id, formData);
          setShowSuccessDialog(true);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to ${mode === "create" ? "create" : "update"} case`,
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    },
    handleSuccessDialogClose: () => {
      setShowSuccessDialog(false);
      navigate('/cases');
    },
    navigate
  };
};
