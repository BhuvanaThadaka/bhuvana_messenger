
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Edit, 
  FileText, 
  Gavel, 
  Loader2, 
  MoreHorizontal, 
  Tag, 
  Trash2, 
  User
} from "lucide-react";
import { Case, getCaseById, deleteCase } from "@/services/mockCaseService";

const CaseView: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCaseData = async () => {
      if (!id) {
        navigate('/cases');
        return;
      }

      try {
        setLoading(true);
        const response = await getCaseById(id);
        if (response && response.data) {
          setCaseData(response.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch case details",
            variant: "destructive",
          });
          navigate('/cases');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch case details",
          variant: "destructive",
        });
        navigate('/cases');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id, navigate, toast]);

  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteCase(id);
      toast({
        title: "Success",
        description: "Case deleted successfully",
      });
      navigate('/cases');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete case",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "default";
      case "Pending":
        return "outline";
      case "Closed":
        return "secondary";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "outline";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading case details...</span>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold">Case Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested case could not be found.</p>
        <Button onClick={() => navigate('/cases')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/cases')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/cases/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Case
          </Button>
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Case
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the case and all associated records.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Case ID: {caseData.id}</div>
              <CardTitle className="text-2xl font-bold">{caseData.title}</CardTitle>
              <div className="flex space-x-2 mt-2">
                <Badge variant={getStatusColor(caseData.status) as any}>{caseData.status}</Badge>
                <Badge variant={getPriorityColor(caseData.priority) as any}>{caseData.priority}</Badge>
                <Badge variant="secondary">{caseData.type}</Badge>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last Updated: {caseData.lastUpdated}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Client Information</h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="font-medium">{caseData.client}</div>
                <div className="text-sm text-muted-foreground">Client ID: {caseData.clientId}</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Assigned To</h3>
              <div className="flex items-center bg-muted rounded-lg p-4">
                <User className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">{caseData.assignedTo}</div>
                  <div className="text-sm text-muted-foreground">User ID: {caseData.assignedUserId}</div>
                </div>
              </div>
            </div>

            {caseData.court && (
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Court Details</h3>
                <div className="flex items-start bg-muted rounded-lg p-4">
                  <Gavel className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>{caseData.court}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-4">
              {caseData.filingDate && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Filing Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{new Date(caseData.filingDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              {caseData.hearingDate && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Hearing Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{new Date(caseData.hearingDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <div className="bg-muted rounded-lg p-4">
              <p>{caseData.description || "No description provided."}</p>
            </div>
          </div>

          {caseData.notes && (
            <div>
              <h3 className="font-medium mb-2">Notes</h3>
              <div className="bg-muted rounded-lg p-4">
                <p>{caseData.notes}</p>
              </div>
            </div>
          )}

          {caseData.tags && caseData.tags.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {caseData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {caseData.documents && caseData.documents.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Documents</h3>
              <div className="space-y-2">
                {caseData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB · {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Created: {new Date(caseData.createdAt).toLocaleDateString()}
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate(`/cases/edit/${id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Case
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CaseView;
