
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCaseById } from "@/services/cases";
import { useToast } from "@/hooks/useToast";

export const useJourneyData = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseData = async () => {
      if (!caseId) {
        console.error("No case ID provided");
        setError("No case ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching case data for ID:", caseId);
        const response = await getCaseById(caseId);
        
        if (response && response.data) {
          console.log("Case data retrieved successfully:", response.data);
          setCaseData(response.data);
        } else if (response) {
          // For directly returned objects without data wrapper
          console.log("Case data retrieved successfully:", response);
          setCaseData(response);
        } else {
          console.error("Case data response was empty or invalid");
          setError("Case data not found");
          toast({
            title: "Error",
            description: "Failed to fetch case details",
            variant: "destructive",
          });
        }
      } catch (err: any) {
        console.error("Error fetching case data:", err);
        setError(err.message || "An error occurred while loading the case");
        toast({
          title: "Error",
          description: "Failed to fetch case details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [caseId, navigate, toast]);

  return { caseData, loading, error };
};
