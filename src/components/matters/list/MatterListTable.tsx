
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LegalCase } from "@/types/matter";
import StatusBadge from "@/components/crud/StatusBadge";
import { Edit, Trash2, History } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MatterListTableProps {
  matters: LegalCase[];
  isLoading: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort: (column: string) => void;
  navigate: (path: string) => void;
  onDelete: (caseItem: LegalCase) => void;
  onViewJourney: (caseItem: LegalCase) => void;
}

const MatterListTable: React.FC<MatterListTableProps> = ({
  matters,
  isLoading,
  sortBy,
  sortOrder,
  onSort,
  navigate,
  onDelete,
  onViewJourney
}) => {
  // Function to render sort indicator
  const renderSortIndicator = (column: string) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  // Function to handle column header click for sorting
  const handleHeaderClick = (column: string) => {
    onSort(column);
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case Number</TableHead>
              <TableHead>Case Title</TableHead>
              <TableHead>Advocate</TableHead>
              <TableHead>Court Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-32" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (matters.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-muted-foreground">No cases found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleHeaderClick("caseNumber")}>
              Case Number {renderSortIndicator("caseNumber")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleHeaderClick("caseTitle")}>
              Case Title {renderSortIndicator("caseTitle")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleHeaderClick("advocateName")}>
              Advocate {renderSortIndicator("advocateName")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleHeaderClick("courtType")}>
              Court Type {renderSortIndicator("courtType")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleHeaderClick("caseStage")}>
              Status {renderSortIndicator("caseStage")}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matters.map((caseItem) => (
            <TableRow key={caseItem.id}>
              <TableCell>{caseItem.caseNumber}</TableCell>
              <TableCell className="font-medium">{caseItem.caseTitle}</TableCell>
              <TableCell>{caseItem.advocateName}</TableCell>
              <TableCell>{caseItem.courtType}</TableCell>
              <TableCell>
                <StatusBadge status={caseItem.caseStage} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/matters/${caseItem.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewJourney(caseItem)}
                  >
                    <History className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(caseItem)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatterListTable;
