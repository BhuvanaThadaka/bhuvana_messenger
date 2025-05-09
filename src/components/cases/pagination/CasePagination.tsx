
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CasePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const CasePagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: CasePaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {total > 0 ? (page - 1) * pageSize + 1 : 0} to{" "}
        {Math.min(page * pageSize, total)} of {total} cases
      </div>
      <div className="flex items-center space-x-6">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(parseInt(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 pl-2.5 ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => page > 1 && onPageChange(page - 1)}
              >
                <span className="sr-only">Go to previous page</span>
                Previous
              </Button>
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              if (
                index === 0 ||
                index === totalPages - 1 ||
                (index >= page - 2 && index <= page)
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index + 1 === page}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              
              if (index === 1 && page > 3) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink className="cursor-default">...</PaginationLink>
                  </PaginationItem>
                );
              }
              
              if (index === totalPages - 2 && page < totalPages - 2) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink className="cursor-default">...</PaginationLink>
                  </PaginationItem>
                );
              }
              
              return null;
            })}
            
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1 pr-2.5 ${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => page < totalPages && onPageChange(page + 1)}
              >
                <span className="sr-only">Go to next page</span>
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CasePagination;
