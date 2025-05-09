
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import { createCaseJourneyEntry } from "@/services/caseJourneyService";
import { UserInfo } from "@/types/caseJourney";
import JourneyForm, { JourneyFormData } from "@/components/matters/journey/JourneyForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { toServiceStatus, toServiceUserInfo } from "@/services/journey/journeyTypeAdapter";

const AddCaseJourneyForm = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleSubmit = async (data: JourneyFormData) => {
    if (!caseId || !user) return;
    
    try {
      // Convert user data to UserInfo format
      const userInfo: UserInfo = {
        id: user.username || user.id || "", // Use username or id as id
        name: user.name || user.username || "", // Use name or username as name
        role: user.roles?.[0] || "User" // Use first role or default to "User"
      };
      
      // Format date to string
      const formattedDate = format(data.date, "yyyy-MM-dd'T'HH:mm:ss");
      
      // Create the journey entry - ensuring all required fields are provided
      const journeyData = {
        title: data.title,
        description: data.description,
        status: toServiceStatus(data.status), // Convert string to enum
        date: formattedDate,
        caseId,
        attachments: [],
        createdBy: toServiceUserInfo(userInfo),
        updatedBy: toServiceUserInfo(userInfo),
      };
      
      const response = await createCaseJourneyEntry(journeyData);
      
      toast({
        title: "Success",
        description: "Journey entry created successfully",
      });
      
      // Navigate back to journey list
      navigate(`/cases/${caseId}/journey`);
    } catch (error: any) {
      console.error("Error creating journey entry:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create journey entry",
        variant: "destructive",
      });
    }
  };
  
  const handleCancel = () => {
    navigate(`/cases/${caseId}/journey`);
  };
  
  return (
    <div className="container py-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Add Journey Entry</CardTitle>
          <CardDescription>
            Record a new event in the case timeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JourneyForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEdit={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCaseJourneyForm;
