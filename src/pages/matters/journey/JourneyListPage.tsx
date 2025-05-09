
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import CaseJourneyTimeline from "@/components/matters/journey/CaseJourneyTimeline";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { getCaseById } from "@/services/cases";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/useToast";

const JourneyListPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [caseData, setCaseData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const canEditJourney = user?.roles.some(role => ["LAWYER", "ADMIN"].includes(role)) || false;
  
  useEffect(() => {
    const fetchCaseData = async () => {
      if (!caseId) {
        setError("No case ID provided");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await getCaseById(caseId);
        
        if (response) {
          setCaseData(response);
        } else {
          setError("Failed to fetch case details");
          toast({
            title: "Error",
            description: "Could not load case information",
            variant: "destructive",
          });
        }
      } catch (err: any) {
        console.error("Error fetching case data:", err);
        setError(err.message || "An error occurred");
        toast({
          title: "Error",
          description: "Failed to load case data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseData();
  }, [caseId, toast]);
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/matters/${caseId}`)}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {loading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                caseData?.title || "Case Journey"
              )}
            </h1>
            <p className="text-muted-foreground">
              {loading ? (
                <Skeleton className="h-4 w-32 mt-1" />
              ) : (
                `Journey Timeline for Case ${caseId}`
              )}
            </p>
          </div>
        </div>
        
        {canEditJourney && (
          <Button onClick={() => navigate(`/cases/${caseId}/journey/add`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Entry
          </Button>
        )}
      </div>
      
      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Error Loading Case</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <CaseJourneyTimeline />
      )}
    </div>
  );
};

export default JourneyListPage;
