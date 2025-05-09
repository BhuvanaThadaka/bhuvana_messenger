import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { fetchLawFirms } from '@/redux/slices/law-firm';
import LawFirmList from "@/components/law-firm/LawFirmList";
import CrudLayout from "@/components/crud/CrudLayout";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LawFirms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    // Initial load of law firms with any search param
    dispatch(fetchLawFirms({ search }));
  }, [dispatch, search]);

  const handleSearch = (query: string) => {
    setSearch(query);
    dispatch(fetchLawFirms({ search: query }));
    
    if (query) {
      toast({
        title: "Search",
        description: `Searching for "${query}"`,
      });
    }
  };

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    // We would typically filter by date here
    // For now, this is just UI since our mock doesn't support date filtering
    if (selectedDate?.from) {
      toast({
        title: "Date Filter Applied",
        description: "Filtering law firms by date range",
      });
    }
  };

  const handleAddNew = () => {
    navigate("/law-firms/create");
    toast({
      title: "Navigation",
      description: "Create a new law firm",
    });
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <CrudLayout 
      title="Law Firm Management"
      description="Manage all registered law firms and their subscriptions"
      searchPlaceholder="Search law firms..."
      onSearch={handleSearch}
      onAdd={handleAddNew}
      addButtonText="Add Law Firm"
      searchValue={search}
    >
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={handleFilterToggle}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters {filterOpen ? '(Hide)' : '(Show)'}
          </Button>
        </div>
        
        {filterOpen && (
          <div className="p-4 border rounded-md bg-background shadow-sm">
            <h3 className="text-md font-medium mb-3">Filter By Date</h3>
            <DatePickerWithRange 
              date={date} 
              onDateChange={handleDateChange}
            />
          </div>
        )}
        
        <LawFirmList />
      </div>
    </CrudLayout>
  );
};

export default LawFirms;
