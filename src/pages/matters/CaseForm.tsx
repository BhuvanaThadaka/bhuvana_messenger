import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Calendar,
  Trash2,
  FileCheck,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { LegalCase, CourtType, CaseType, CaseStage, DocumentStatus } from "@/types/matter";

const formSchema = z.object({
  caseTitle: z.string().min(1, "Case title is required"),
  caseNumber: z.string().min(1, "Case number is required"),
  courtType: z.enum(["Lower Court", "High Court", "Supreme Court"]),
  caseType: z.enum(["Civil", "Criminal", "Family", "Corporate", "Taxation", "Property", "Other"]),
  advocateName: z.string().min(1, "Advocate name is required"),
  dateOfFiling: z.date(),
  hearingDate: z.date().nullable().optional(),
  caseStage: z.enum(["Filing", "Initial Hearing", "Evidence", "Arguments", "Judgment", "Appeal", "Closed"]),
  documentStatus: z.enum(["Draft", "Vetting", "Review", "Approved"]),
  remarks: z.string().optional(),
  
  // Court details
  courtName: z.string().optional(),
  courtCountry: z.string().optional(),
  courtState: z.string().optional(),
  courtCity: z.string().optional(),
  courtAddress: z.string().optional(),
  
  // Legal details
  act: z.string().optional(),
  section: z.string().optional(),
  firNumber: z.string().optional(),
  firYear: z.number().int().positive().optional().nullable(),
  policeStation: z.string().optional(),
  
  // Parties
  yourParty: z.enum(["Plaintiff", "Defendant"]).optional(),
  oppositePartyAdvocate: z.string().optional(),
  
  // Additional
  clerkAssigned: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Sample advocate data
const advocates = [
  { name: "James Wilson" },
  { name: "Emily Parker" },
  { name: "David Miller" },
  { name: "Jessica Wong" },
  { name: "Robert Chen" },
  { name: "Maria Rodriguez" },
];

const CaseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("basic");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caseTitle: "",
      caseNumber: "",
      courtType: "High Court",
      caseType: "Civil",
      advocateName: "",
      dateOfFiling: new Date(),
      hearingDate: null,
      caseStage: "Filing",
      documentStatus: "Draft",
      remarks: "",
      courtName: "",
      courtCountry: "",
      courtState: "",
      courtCity: "",
      courtAddress: "",
      act: "",
      section: "",
      firNumber: "",
      firYear: null,
      policeStation: "",
      yourParty: "Plaintiff",
      oppositePartyAdvocate: "",
      clerkAssigned: "",
    },
  });
  
  // Mock data for edit mode
  const mockCase: LegalCase = {
    id: "case-001",
    caseTitle: "Smith vs Johnson",
    caseNumber: "CIV-2025-123",
    courtType: "High Court",
    caseType: "Civil",
    advocateName: "James Wilson",
    dateOfFiling: "2025-02-15",
    hearingDate: "2025-04-20",
    caseStage: "Initial Hearing",
    documentStatus: "Approved",
    remarks: "Plaintiff seeking damages for breach of contract",
    courtDetails: {
      courtName: "Central High Court",
      country: "United States",
      state: "California",
      city: "Los Angeles",
      address: "350 W 1st St, Los Angeles, CA 90012"
    },
    legalDetails: {
      act: "Contract Act",
      section: "Section 74",
      firNumber: undefined,
      firYear: undefined,
      policeStation: undefined
    },
    parties: {
      yourParty: "Plaintiff",
      oppositePartyAdvocate: "Sarah Thomas"
    },
    clerkAssigned: "Mike Peterson",
    notifications: {
      advocate: true,
      client: true,
      admin: false
    }
  };
  
  // If in edit mode, populate form with mock data
  useState(() => {
    if (isEditMode) {
      // This would typically be a useEffect with a data fetch in a real app
      const formattedHearingDate = mockCase.hearingDate ? new Date(mockCase.hearingDate) : null;
      
      form.reset({
        caseTitle: mockCase.caseTitle,
        caseNumber: mockCase.caseNumber,
        courtType: mockCase.courtType,
        caseType: mockCase.caseType,
        advocateName: mockCase.advocateName,
        dateOfFiling: new Date(mockCase.dateOfFiling),
        hearingDate: formattedHearingDate,
        caseStage: mockCase.caseStage,
        documentStatus: mockCase.documentStatus,
        remarks: mockCase.remarks,
        
        courtName: mockCase.courtDetails?.courtName,
        courtCountry: mockCase.courtDetails?.country,
        courtState: mockCase.courtDetails?.state,
        courtCity: mockCase.courtDetails?.city,
        courtAddress: mockCase.courtDetails?.address,
        
        act: mockCase.legalDetails?.act,
        section: mockCase.legalDetails?.section,
        firNumber: mockCase.legalDetails?.firNumber,
        firYear: mockCase.legalDetails?.firYear || null,
        policeStation: mockCase.legalDetails?.policeStation,
        
        yourParty: mockCase.parties?.yourParty,
        oppositePartyAdvocate: mockCase.parties?.oppositePartyAdvocate,
        
        clerkAssigned: mockCase.clerkAssigned,
      });
    }
  });
  
  const onSubmit = (values: FormValues) => {
    const formattedCase = {
      ...values,
      dateOfFiling: values.dateOfFiling.toISOString().split('T')[0],
      hearingDate: values.hearingDate ? values.hearingDate.toISOString().split('T')[0] : null,
      courtDetails: {
        courtName: values.courtName || '',
        country: values.courtCountry || '',
        state: values.courtState || '',
        city: values.courtCity || '',
        address: values.courtAddress || '',
      },
      legalDetails: {
        act: values.act || '',
        section: values.section || '',
        firNumber: values.firNumber || undefined,
        firYear: values.firYear || undefined,
        policeStation: values.policeStation || undefined,
      },
      parties: {
        yourParty: values.yourParty || 'Plaintiff',
        oppositePartyAdvocate: values.oppositePartyAdvocate || '',
      },
    };
    
    // In a real app, this would call an API
    toast({
      title: isEditMode ? "Case Updated" : "Case Created",
      description: `${values.caseTitle} has been ${isEditMode ? 'updated' : 'created'} successfully.`,
    });
    
    // Navigate back to list
    navigate("/matters");
  };
  
  // Go to next tab
  const handleNextTab = () => {
    if (activeTab === "basic") setActiveTab("court");
    else if (activeTab === "court") setActiveTab("legal");
    else if (activeTab === "legal") setActiveTab("parties");
  };
  
  // Go to previous tab
  const handlePrevTab = () => {
    if (activeTab === "parties") setActiveTab("legal");
    else if (activeTab === "legal") setActiveTab("court");
    else if (activeTab === "court") setActiveTab("basic");
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="outline" className="mb-4" onClick={() => navigate('/matters')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Matters
      </Button>
      
      <h1 className="text-2xl font-bold tracking-tight mb-6">
        {isEditMode ? "Edit Case" : "Add New Case"}
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="court">Court Details</TabsTrigger>
                  <TabsTrigger value="legal">Legal Details</TabsTrigger>
                  <TabsTrigger value="parties">Parties</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="p-4 md:p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="basic" className="mt-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="caseTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Title <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter case title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="caseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Number <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter case number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="courtType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Court Type <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select court type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Lower Court">Lower Court</SelectItem>
                                <SelectItem value="High Court">High Court</SelectItem>
                                <SelectItem value="Supreme Court">Supreme Court</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="caseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Type <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Civil">Civil</SelectItem>
                                <SelectItem value="Criminal">Criminal</SelectItem>
                                <SelectItem value="Family">Family</SelectItem>
                                <SelectItem value="Corporate">Corporate</SelectItem>
                                <SelectItem value="Taxation">Taxation</SelectItem>
                                <SelectItem value="Property">Property</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="advocateName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Advocate <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select advocate" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {advocates.map(advocate => (
                                  <SelectItem key={advocate.name} value={advocate.name}>
                                    {advocate.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="clerkAssigned"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clerk Assigned</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter clerk name (if assigned)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfFiling"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Filing Date <span className="text-destructive">*</span></FormLabel>
                            <DatePicker
                              date={field.value}
                              onSelect={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hearingDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Next Hearing Date</FormLabel>
                            <DatePicker
                              date={field.value ?? undefined}
                              onSelect={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="caseStage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Case Stage <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select case stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Filing">Filing</SelectItem>
                                <SelectItem value="Initial Hearing">Initial Hearing</SelectItem>
                                <SelectItem value="Evidence">Evidence</SelectItem>
                                <SelectItem value="Arguments">Arguments</SelectItem>
                                <SelectItem value="Judgment">Judgment</SelectItem>
                                <SelectItem value="Appeal">Appeal</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="documentStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Document Status <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select document status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Vetting">Vetting</SelectItem>
                                <SelectItem value="Review">Review</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="remarks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Remarks</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter any additional remarks about the case" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="court" className="mt-0">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="courtName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Court Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter court name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="courtCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="courtState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="courtCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="courtAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Court Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter court address" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="legal" className="mt-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="act"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Act</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter applicable act" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="section"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter applicable section" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h3 className="text-lg font-medium">FIR Details (For Criminal Cases)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FIR Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter FIR number (if applicable)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="firYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>FIR Year</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Enter FIR year (if applicable)" 
                                {...field} 
                                onChange={(e) => {
                                  const value = e.target.value;
                                  field.onChange(value ? parseInt(value, 10) : null);
                                }}
                                value={field.value === null ? '' : field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="policeStation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Police Station</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter police station (if applicable)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="parties" className="mt-0">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="yourParty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Party</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your party role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Plaintiff">Plaintiff</SelectItem>
                              <SelectItem value="Defendant">Defendant</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="oppositePartyAdvocate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Opposite Party Advocate</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter opposite party's advocate name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between p-4 md:p-6 border-t">
              {activeTab !== "basic" ? (
                <Button type="button" variant="outline" onClick={handlePrevTab}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={() => navigate('/matters')}>
                  Cancel
                </Button>
              )}
              
              {activeTab !== "parties" ? (
                <Button type="button" onClick={handleNextTab}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> {isEditMode ? "Update" : "Save"} Case
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CaseForm;
