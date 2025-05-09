
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { getCaseJourneyEntry, updateCaseJourneyEntry } from "@/services/caseJourneyService";
import { CaseJourneyEntry, UserInfo } from "@/types/caseJourney";
import JourneyForm, { JourneyFormData } from "@/components/matters/journey/JourneyForm";
import { LoadingState } from "@/components/matters/journey/LoadingState";
import ErrorState from "@/components/matters/journey/ErrorState";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { toUIJourneyEntry, toServiceStatus, toServiceUserInfo } from "@/services/journey/journeyTypeAdapter";

const EditCaseJourneyForm = () => {
  const { caseId, journeyId } = useParams<{ caseId: string; journeyId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [journeyEntry, setJourneyEntry] = useState<CaseJourneyEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!journeyId) {
        setError("Journey ID is missing");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const entryData = await getCaseJourneyEntry(journeyId);
        // Use the type adapter to convert the service model to UI model
        const uiJourneyEntry = toUIJourneyEntry(entryData);
        setJourneyEntry(uiJourneyEntry);
      } catch (err: any) {
        console.error("Error fetching journey entry:", err);
        setError(err.message || "Failed to load journey entry");
        toast({
          title: "Error",
          description: "Failed to load case journey entry",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [journeyId, toast]);
  
  const handleSubmit = async (data: JourneyFormData) => {
    if (!caseId || !journeyId || !user || !journeyEntry) return;
    
    try {
      // Convert user data to UserInfo format
      const userInfo: UserInfo = {
        id: user.username || user.id || "", // Use username or id as id
        name: user.name || user.username || "", // Use name or username as name
        role: user.roles?.[0] || "User", // Use first role or default to "User"
      };
      
      // Format date to string
      const formattedDate = format(data.date, "yyyy-MM-dd'T'HH:mm:ss");
      
      // Convert status string to enum
      const statusEnum = toServiceStatus(data.status);
      
      // Create the update payload
      const updateData = {
        id: journeyId,
        caseId: caseId,
        title: data.title,
        description: data.description,
        status: statusEnum,
        date: formattedDate,
        updatedBy: toServiceUserInfo(userInfo)
      };
      
      await updateCaseJourneyEntry(journeyId, updateData);
      
      toast({
        title: "Success",
        description: "Journey entry updated successfully",
      });
      
      // Navigate back to journey detail
      navigate(`/cases/${caseId}/journey/${journeyId}`);
    } catch (error: any) {
      console.error("Error updating journey entry:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update journey entry",
        variant: "destructive",
      });
    }
  };
  
  const handleCancel = () => {
    navigate(`/cases/${caseId}/journey/${journeyId}`);
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  if (error || !journeyEntry || !caseId) {
    return <ErrorState error={error || "Journey entry not found"} backUrl={`/cases/${caseId}/journey`} />;
  }
  
  return (
    <div className="container py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Journey Entry</CardTitle>
          <CardDescription>
            Update the details of this journey entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JourneyForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEdit={true}
            initialData={{
              title: journeyEntry.title,
              description: journeyEntry.description,
              status: journeyEntry.status,
              date: new Date(journeyEntry.date)
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCaseJourneyForm;
