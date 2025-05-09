
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, SearchIcon } from "lucide-react";
import { MasterDataTab } from "./hooks/useMasterDataState";

interface MasterDataHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
  activeTab: MasterDataTab;
}

const MasterDataHeader: React.FC<MasterDataHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddNew,
  activeTab,
}) => {
  const getAddButtonText = () => {
    switch (activeTab) {
      case "courts": return "Add Court";
      case "lawTypes": return "Add Law Type";
      case "clients": return "Add Client";
      default: return "Add";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Master Data Management</h2>
      
      <div className="flex w-full sm:w-auto gap-2">
        <div className="relative w-full sm:w-auto">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            className="w-full sm:w-[250px] pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Button onClick={onAddNew} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>{getAddButtonText()}</span>
        </Button>
      </div>
    </div>
  );
};

export default MasterDataHeader;
