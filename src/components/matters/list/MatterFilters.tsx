
import React from "react";
import { Search, Filter, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { CourtType, CaseType } from "@/types/matter";

interface MatterFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filters: {
    caseNumber: string;
    advocateName: string;
    courtType: CourtType | "";
    caseType: CaseType | "";
    dateOfFiling: {
      from: string;
      to: string;
    };
  };
  setFilters: (filters: any) => void;
  openFilters: boolean;
  setOpenFilters: (open: boolean) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const MatterFilters: React.FC<MatterFiltersProps> = ({
  search,
  setSearch,
  filters,
  setFilters,
  openFilters,
  setOpenFilters,
  resetFilters,
  applyFilters,
}) => {
  const hasActiveFilters = Object.values(filters).some(f => 
    typeof f === 'string' ? f !== '' : 
    Object.values(f).some(v => v !== '')
  );

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Popover open={openFilters} onOpenChange={setOpenFilters}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> 
                  Filters
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-primary" variant="default">Active</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Cases</h4>
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="case-number">Case Number</Label>
                    <Input
                      id="case-number"
                      placeholder="Enter case number"
                      value={filters.caseNumber}
                      onChange={(e) => setFilters({...filters, caseNumber: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="advocate-name">Advocate Name</Label>
                    <Input
                      id="advocate-name"
                      placeholder="Enter advocate name"
                      value={filters.advocateName}
                      onChange={(e) => setFilters({...filters, advocateName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="court-type">Court Type</Label>
                    <Select 
                      value={filters.courtType} 
                      onValueChange={(value) => setFilters({...filters, courtType: value as CourtType | ""})}
                    >
                      <SelectTrigger id="court-type">
                        <SelectValue placeholder="All court types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All court types</SelectItem>
                        <SelectItem value="Lower Court">Lower Court</SelectItem>
                        <SelectItem value="High Court">High Court</SelectItem>
                        <SelectItem value="Supreme Court">Supreme Court</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="case-type">Case Type</Label>
                    <Select 
                      value={filters.caseType} 
                      onValueChange={(value) => setFilters({...filters, caseType: value as CaseType | ""})}
                    >
                      <SelectTrigger id="case-type">
                        <SelectValue placeholder="All case types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All case types</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Criminal">Criminal</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Taxation">Taxation</SelectItem>
                        <SelectItem value="Property">Property</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Filing Date Range</Label>
                    <div className="flex flex-col gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="date-from" className="text-xs text-muted-foreground">From</Label>
                        <DatePicker 
                          id="date-from"
                          date={filters.dateOfFiling.from ? new Date(filters.dateOfFiling.from) : undefined}
                          onSelect={(date) => 
                            setFilters({
                              ...filters, 
                              dateOfFiling: {
                                ...filters.dateOfFiling, 
                                from: date ? date.toISOString().split('T')[0] : ""
                              }
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="date-to" className="text-xs text-muted-foreground">To</Label>
                        <DatePicker 
                          id="date-to"
                          date={filters.dateOfFiling.to ? new Date(filters.dateOfFiling.to) : undefined}
                          onSelect={(date) => 
                            setFilters({
                              ...filters, 
                              dateOfFiling: {
                                ...filters.dateOfFiling, 
                                to: date ? date.toISOString().split('T')[0] : ""
                              }
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="ghost" onClick={resetFilters}>Reset</Button>
                    <Button onClick={applyFilters}>Apply Filters</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatterFilters;
