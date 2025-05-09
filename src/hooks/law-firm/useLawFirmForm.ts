import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createLawFirm,
  updateLawFirm,
  fetchLawFirmById,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchPlans
} from '@/redux/slices/law-firm';
import { toast } from "@/hooks/use-toast";
import { LawFirmFormData } from "@/types/lawFirm";
import { formSchema } from "./schemas/lawFirmValidation";
import { formSteps } from "./config/formSteps";
import { useFormValidation } from "./useFormValidation";
import { useFileHandling } from "./useFileHandling";

export function useLawFirmForm(mode: "create" | "edit" | "view") {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { 
    selectedLawFirm, 
    loading, 
    countries, 
    states, 
    cities, 
    plans 
  } = useSelector((state: RootState) => state.lawFirm);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const form = useForm<LawFirmFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
      firmType: "LLP",
      taxId: "",
      barAssociation: "",
      establishmentYear: new Date().getFullYear(),
      primaryContactName: "",
      primaryContactNumber: "",
      alternativeEmail: "",
      alternativeNumber: "",
      website: "",
      country: "US",
      state: "CA",
      city: "LA",
      officeAddress: "",
      zipCode: "",
      adminName: "",
      adminEmail: "",
      adminPhone: "",
      plan: "basic",
    },
    mode: "onChange",
  });

  const { validateCurrentStep } = useFormValidation(form);
  const { registrationFile, logoFile, handleFileChange } = useFileHandling();

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPlans());
  }, [dispatch]);

  useEffect(() => {
    const countryValue = form.watch("country");
    if (countryValue) {
      dispatch(fetchStates(countryValue));
    }
  }, [dispatch, form.watch("country")]);

  useEffect(() => {
    const stateValue = form.watch("state");
    if (stateValue) {
      dispatch(fetchCities(stateValue));
    }
  }, [dispatch, form.watch("state")]);

  useEffect(() => {
    if ((isEditMode || isViewMode) && id) {
      dispatch(fetchLawFirmById(id));
    }
  }, [dispatch, id, isEditMode, isViewMode]);

  useEffect(() => {
    if (selectedLawFirm && (isEditMode || isViewMode)) {
      form.reset({
        ...selectedLawFirm,
        // Ensure all optional fields are handled
        barAssociation: selectedLawFirm.barAssociation || "",
        alternativeEmail: selectedLawFirm.alternativeEmail || "",
        alternativeNumber: selectedLawFirm.alternativeNumber || "",
        website: selectedLawFirm.website || "",
      });
    }
  }, [selectedLawFirm, form, isEditMode, isViewMode]);

  const handleNext = async () => {
    const isValid = await validateCurrentStep(currentStep);
    
    if (isValid && currentStep < formSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      toast({
        title: "Step Completed",
        description: `Moving to ${formSteps[currentStep + 1].title}`
      });
    } else if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: LawFirmFormData) => {
    const isValid = await validateCurrentStep(currentStep);
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    if (registrationFile) {
      data.registrationCertificate = registrationFile;
    }
    
    if (logoFile) {
      data.logo = logoFile;
    }
    
    try {
      if (isEditMode && id) {
        await dispatch(updateLawFirm({ id, data })).unwrap();
        toast({
          title: "Success",
          description: "Law firm updated successfully"
        });
      } else {
        await dispatch(createLawFirm(data)).unwrap();
        toast({
          title: "Success",
          description: "New law firm created successfully"
        });
      }
      navigate('/law-firms');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: typeof error === 'string' ? error : "There was an error processing your request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditRedirect = () => {
    if (id) {
      navigate(`/law-firms/edit/${id}`);
    }
  };

  return {
    form,
    formState: form.formState,
    isViewMode,
    isEditMode, 
    loading,
    currentStep,
    countries: Array.isArray(countries) ? countries : [],
    states: Array.isArray(states) ? states : [], 
    cities: Array.isArray(cities) ? cities : [],
    plans: Array.isArray(plans) ? plans : [],
    selectedLawFirm,
    registrationFile,
    logoFile,
    isSubmitting,
    validateCurrentStep,
    handleNext,
    handlePrevious,
    onSubmit,
    handleFileChange,
    handleEditRedirect,
    id
  };
}
