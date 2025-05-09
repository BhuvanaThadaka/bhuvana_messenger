
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  CalendarDays, 
  ChevronDown, 
  Upload, 
  Download,
  Eye,
  FileText, 
  Check, 
  X, 
  AlertCircle, 
  InfoIcon,
  Trash2,
  Pencil,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mock data and form schemas
const clientSearchSchema = z.object({
  searchTerm: z.string().min(1, "Please enter a search term"),
  searchType: z.enum(["name", "phone", "aadhaar", "case"]),
});

const documentGenerationSchema = z.object({
  district: z.string().min(1, "District is required"),
  petitionerName: z.string().min(1, "Petitioner name is required"),
  petitionerAddress: z.string().min(1, "Petitioner address is required"),
  respondentName: z.string().min(1, "Respondent name is required"),
  respondentAddress: z.string().min(1, "Respondent address is required"),
  factsAndGrounds: z.string().min(10, "Facts and grounds should be at least 10 characters"),
  mainPrayer: z.string().min(10, "Main prayer should be at least 10 characters"),
  interimPrayer: z.string().optional(),
  verification: z.string().min(1, "Verification is required"),
  purposeOfDocument: z.string().min(1, "Purpose is required"),
  documentsToGenerate: z.array(z.string()).min(1, "Select at least one document"),
});

// Mock clients
const mockClients = [
  { 
    id: "1", 
    name: "John Smith", 
    phone: "9876543210", 
    aadhaar: "123456789012",
    cases: [
      { id: "case-001", number: "CIV-2023-001", court: "High Court", type: "Civil" },
      { id: "case-002", number: "CIV-2023-002", court: "District Court", type: "Family" }
    ]
  },
  { 
    id: "2", 
    name: "Jane Doe", 
    phone: "8765432109", 
    aadhaar: "234567890123",
    cases: [
      { id: "case-003", number: "CRM-2023-001", court: "Supreme Court", type: "Criminal" }
    ]
  }
];

// Document templates
const documentTemplates = [
  { id: "1", name: "Plaint", type: "Civil", required: true },
  { id: "2", name: "Written Statement", type: "Civil", required: false },
  { id: "3", name: "Affidavit", type: "All", required: true },
  { id: "4", name: "Vakalatnama", type: "All", required: true },
  { id: "5", name: "Notice", type: "Civil", required: false },
  { id: "6", name: "FIR Copy Request", type: "Criminal", required: false },
  { id: "7", name: "Bail Application", type: "Criminal", required: false },
];

// Document status enum
type DocumentStatus = "Draft" | "Vetting" | "Review" | "Approved";

type GeneratedDocument = {
  id: string;
  name: string;
  generatedOn: string;
  status: DocumentStatus;
  canEdit: boolean;
};

const DocumentGeneration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("search");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const [selectedCase, setSelectedCase] = useState<typeof mockClients[0]["cases"][0] | null>(null);
  const [searchResults, setSearchResults] = useState<typeof mockClients>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([
    { 
      id: "doc-1", 
      name: "Plaint.docx", 
      generatedOn: "2025-04-02", 
      status: "Review", 
      canEdit: true 
    },
    { 
      id: "doc-2", 
      name: "Affidavit.docx", 
      generatedOn: "2025-04-02", 
      status: "Vetting", 
      canEdit: true 
    },
    { 
      id: "doc-3", 
      name: "Vakalatnama.docx", 
      generatedOn: "2025-04-01", 
      status: "Approved", 
      canEdit: false 
    },
  ]);
  
  // Search form
  const searchForm = useForm<z.infer<typeof clientSearchSchema>>({
    resolver: zodResolver(clientSearchSchema),
    defaultValues: {
      searchTerm: "",
      searchType: "name",
    }
  });
  
  // Document generation form
  const documentForm = useForm<z.infer<typeof documentGenerationSchema>>({
    resolver: zodResolver(documentGenerationSchema),
    defaultValues: {
      district: "",
      petitionerName: "",
      petitionerAddress: "",
      respondentName: "",
      respondentAddress: "",
      factsAndGrounds: "",
      mainPrayer: "",
      interimPrayer: "",
      verification: "",
      purposeOfDocument: "",
      documentsToGenerate: ["1", "4"], // Default selected documents
    }
  });
  
  // Handle search submission
  const onSearchSubmit = (values: z.infer<typeof clientSearchSchema>) => {
    // Mock search functionality
    const results = mockClients.filter(client => {
      switch (values.searchType) {
        case "name":
          return client.name.toLowerCase().includes(values.searchTerm.toLowerCase());
        case "phone":
          return client.phone.includes(values.searchTerm);
        case "aadhaar":
          return client.aadhaar.includes(values.searchTerm);
        case "case":
          return client.cases.some(c => 
            c.number.toLowerCase().includes(values.searchTerm.toLowerCase())
          );
        default:
          return false;
      }
    });
    
    setSearchResults(results);
    setShowSearchResults(true);
  };
  
  // Handle client selection
  const handleSelectClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    if (client.cases.length === 1) {
      setSelectedCase(client.cases[0]);
      // Prefill form with client data
      documentForm.setValue("petitionerName", client.name);
    } else {
      setSelectedCase(null);
    }
    setActiveTab("generate");
  };
  
  // Handle case selection
  const handleSelectCase = (caseItem: typeof mockClients[0]["cases"][0]) => {
    setSelectedCase(caseItem);
    
    // Prefill form with case and client data if selected
    if (selectedClient) {
      documentForm.setValue("petitionerName", selectedClient.name);
      // Additional prefilling could be done here
    }
  };
  
  // Handle document generation form submission
  const onGenerateSubmit = (values: z.infer<typeof documentGenerationSchema>) => {
    console.log("Document generation form submitted:", values);
    
    // Mock API call to generate documents
    const newDocuments: GeneratedDocument[] = values.documentsToGenerate.map(docId => {
      const template = documentTemplates.find(t => t.id === docId);
      return {
        id: `doc-${Date.now()}-${docId}`,
        name: `${template?.name || "Document"}.docx`,
        generatedOn: new Date().toISOString().split('T')[0],
        status: "Draft" as DocumentStatus,
        canEdit: true
      };
    });
    
    setGeneratedDocuments(prev => [...newDocuments, ...prev]);
    
    toast({
      title: "Documents Generated",
      description: `Successfully generated ${newDocuments.length} documents.`,
    });
    
    setActiveTab("documents");
  };
  
  // Handle document status change
  const handleStatusChange = (docId: string, newStatus: DocumentStatus) => {
    setGeneratedDocuments(prev => 
      prev.map(doc => 
        doc.id === docId 
          ? { ...doc, status: newStatus, canEdit: newStatus !== "Approved" } 
          : doc
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Document has been moved to ${newStatus} status.`,
    });
  };
  
  // Handle document deletion
  const handleDeleteDocument = (docId: string) => {
    setGeneratedDocuments(prev => prev.filter(doc => doc.id !== docId));
    
    toast({
      title: "Document Deleted",
      description: "Document has been deleted successfully.",
    });
  };
  
  return (
    <div className="container py-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Court Case Document Generation</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Client Search</TabsTrigger>
          <TabsTrigger value="generate" disabled={!selectedClient}>Document Generation</TabsTrigger>
          <TabsTrigger value="documents">Generated Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Client</CardTitle>
              <CardDescription>Find a client to generate documents for their case</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...searchForm}>
                <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <FormField
                        control={searchForm.control}
                        name="searchTerm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Search Term</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter client name, phone, Aadhaar, or case number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={searchForm.control}
                        name="searchType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Search By</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Search by" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="name">Client Name</SelectItem>
                                <SelectItem value="phone">Phone Number</SelectItem>
                                <SelectItem value="aadhaar">Aadhaar Number</SelectItem>
                                <SelectItem value="case">Case Number</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </form>
              </Form>
              
              {showSearchResults && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Search Results</h3>
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map(client => (
                        <Card key={client.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSelectClient(client)}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h4 className="font-medium">{client.name}</h4>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>Phone: {client.phone}</p>
                                  <p>Aadhaar: {client.aadhaar}</p>
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <Badge className="mr-2">
                                  {client.cases.length} {client.cases.length === 1 ? 'Case' : 'Cases'}
                                </Badge>
                                <Button size="sm">
                                  Select Client
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium">No Clients Found</h3>
                      <p className="text-sm text-muted-foreground mt-1">Try a different search term or criteria</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div>
                  <CardTitle>Document Generation Form</CardTitle>
                  <CardDescription>Fill out the details for document generation</CardDescription>
                </div>
                
                {selectedClient && (
                  <div className="mt-4 md:mt-0 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">{selectedClient.name}</h4>
                    <p className="text-sm text-muted-foreground">Phone: {selectedClient.phone}</p>
                    
                    {selectedClient.cases.length > 1 && !selectedCase && (
                      <div className="mt-2">
                        <Label>Select Case:</Label>
                        <Select onValueChange={(value) => {
                          const selected = selectedClient.cases.find(c => c.id === value);
                          if (selected) handleSelectCase(selected);
                        }}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select case" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedClient.cases.map(caseItem => (
                              <SelectItem key={caseItem.id} value={caseItem.id}>
                                {caseItem.number} - {caseItem.court}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {selectedCase && (
                      <div className="mt-2">
                        <Badge className="bg-primary">{selectedCase.number}</Badge>
                        <p className="text-sm mt-1">{selectedCase.court} - {selectedCase.type}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Form {...documentForm}>
                <form onSubmit={documentForm.handleSubmit(onGenerateSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Legal Form Details</h3>
                    
                    <FormField
                      control={documentForm.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter district name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <h4 className="font-medium">Petitioner Details</h4>
                        
                        <FormField
                          control={documentForm.control}
                          name="petitionerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Petitioner Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter petitioner name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={documentForm.control}
                          name="petitionerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Petitioner Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter petitioner address" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Respondent Details</h4>
                        
                        <FormField
                          control={documentForm.control}
                          name="respondentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Respondent Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter respondent name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={documentForm.control}
                          name="respondentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Respondent Address</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter respondent address" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Case Details</h4>
                      
                      <FormField
                        control={documentForm.control}
                        name="factsAndGrounds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facts and Grounds</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter facts and grounds of the case" 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={documentForm.control}
                          name="mainPrayer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Main Prayer</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter main prayer" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={documentForm.control}
                          name="interimPrayer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interim Prayer (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Enter interim prayer if any" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <FormField
                        control={documentForm.control}
                        name="verification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deponent Verification</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter verification statement" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={documentForm.control}
                        name="purposeOfDocument"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purpose of Document</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="filing">Initial Filing</SelectItem>
                                <SelectItem value="submission">Court Submission</SelectItem>
                                <SelectItem value="evidence">Evidence Presentation</SelectItem>
                                <SelectItem value="appeal">Appeal Filing</SelectItem>
                                <SelectItem value="other">Other Purpose</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Documents to Generate</h4>
                        <Badge variant="outline">
                          {documentForm.watch("documentsToGenerate").length} selected
                        </Badge>
                      </div>
                      
                      <FormField
                        control={documentForm.control}
                        name="documentsToGenerate"
                        render={() => (
                          <FormItem>
                            <div className="space-y-3">
                              {documentTemplates.map((template) => (
                                <FormField
                                  key={template.id}
                                  control={documentForm.control}
                                  name="documentsToGenerate"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={template.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(template.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, template.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== template.id
                                                    )
                                                  )
                                            }}
                                            disabled={template.required}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="flex items-center">
                                            {template.name}
                                            {template.required && (
                                              <Badge className="ml-2" variant="secondary">Required</Badge>
                                            )}
                                          </FormLabel>
                                          <FormDescription>
                                            For {template.type} cases
                                          </FormDescription>
                                        </div>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("search")}>
                      Back to Search
                    </Button>
                    <Button type="submit">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Documents
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>View and manage your generated case documents</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedDocuments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Document Name</TableHead>
                      <TableHead>Generated On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.generatedOn}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doc.status === "Approved" ? "success" :
                              doc.status === "Review" ? "secondary" :
                              doc.status === "Vetting" ? "warning" : "outline"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {doc.canEdit && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              
                              {doc.status !== "Approved" && (
                                <Select 
                                  onValueChange={(value) => handleStatusChange(doc.id, value as DocumentStatus)}
                                  defaultValue={doc.status}
                                >
                                  <SelectTrigger className="h-9 w-[130px]">
                                    <SelectValue placeholder="Change Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Draft">Move to Draft</SelectItem>
                                    <SelectItem value="Vetting">Move to Vetting</SelectItem>
                                    <SelectItem value="Review">Move to Review</SelectItem>
                                    <SelectItem value="Approved">Approve</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium text-lg">No Documents Generated</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    You haven't generated any documents yet
                  </p>
                  <Button onClick={() => setActiveTab("generate")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Documents
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentGeneration;
