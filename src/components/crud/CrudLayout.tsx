
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CrudLayoutProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  addButtonText?: string;
  children: ReactNode;
  searchValue?: string;
  showAddButton?: boolean;
}

const CrudLayout = ({
  title,
  description,
  searchPlaceholder = "Search...",
  onSearch,
  onAdd,
  addButtonText = "Add New",
  children,
  searchValue = "",
  showAddButton = true,
}: CrudLayoutProps) => {
  return (
    <div className="flex-1 space-y-4 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="flex w-full sm:w-auto gap-2">
          {onSearch && (
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className="w-full sm:w-[250px] pl-8"
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}

          {showAddButton && onAdd && (
            <Button 
              onClick={onAdd} 
              className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
            >
              <PlusCircle className="h-4 w-4" />
              <span>{addButtonText}</span>
            </Button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default CrudLayout;
