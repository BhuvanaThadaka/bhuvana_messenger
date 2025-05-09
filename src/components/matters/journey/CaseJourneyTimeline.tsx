
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaseJourneyList } from "@/services/caseJourneyService";
import { CaseJourneyEntry } from "@/types/caseJourney";
import { useToast } from "@/hooks/useToast";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { toUIJourneyEntry } from "@/services/journey/journeyTypeAdapter";

const CaseJourneyTimeline: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [journeyEntries, setJourneyEntries] = useState<CaseJourneyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const canEditJourney = user?.roles.some(role => ["LAWYER", "ADMIN"].includes(role)) || false;
  
  useEffect(() => {
    const fetchJourneyEntries = async () => {
      if (!caseId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const entries = await getCaseJourneyList(caseId);
        // Convert service model to UI model
        const uiEntries = entries.map(entry => toUIJourneyEntry(entry));
        setJourneyEntries(uiEntries);
      } catch (err: any) {
        console.error("Error fetching journey entries:", err);
        setError(err.message || "Failed to load journey entries");
        toast({
          title: "Error",
          description: "Failed to load case journey entries",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchJourneyEntries();
  }, [caseId, toast]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "adjourned":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-700 flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error Loading Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{error}</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (journeyEntries.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Journey Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This case doesn't have any journey entries yet.
          </p>
        </CardContent>
        {canEditJourney && (
          <CardFooter>
            <Button onClick={() => navigate(`/cases/${caseId}/journey/add`)}>
              Add First Entry
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {journeyEntries.map((entry) => (
        <Card key={entry.id} className="w-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-semibold">{entry.title}</CardTitle>
              <Badge className={getStatusColor(entry.status)}>
                {entry.status.replace("-", " ")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{format(parseISO(entry.date), "PPP")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>Updated: {format(parseISO(entry.updatedAt), "PPP")}</span>
              </div>
              {entry.attachments && entry.attachments.length > 0 && (
                <div className="flex items-center">
                  <FileText className="mr-1 h-3 w-3" />
                  <span>{entry.attachments.length} attachment(s)</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/cases/${caseId}/journey/view/${entry.id}`)}
            >
              View Details
            </Button>
            
            {canEditJourney && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/cases/${caseId}/journey/edit/${entry.id}`)}
              >
                Edit
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CaseJourneyTimeline;
