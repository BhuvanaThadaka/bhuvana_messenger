
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Case } from "@/services/mockCaseService";
import { FileText, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";

interface CaseTableProps {
  cases: Case[];
  loading: boolean;
  onUpdateStatus: (caseItem: { id: string; status: "Open" | "Closed" | "Pending" }) => void;
  onDelete: (id: string) => void;
}

const CaseTable = ({ 
  cases, 
  loading, 
  onUpdateStatus, 
  onDelete 
}: CaseTableProps) => {
  const navigate = useNavigate();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'Pending':
        return 'outline';
      case 'Closed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="mt-4 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : cases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No cases found.
              </TableCell>
            </TableRow>
          ) : (
            cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{caseItem.title}</span>
                  </div>
                </TableCell>
                <TableCell>{caseItem.client}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityBadgeVariant(caseItem.priority)}>
                    {caseItem.priority}
                  </Badge>
                </TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell>{caseItem.assignedTo}</TableCell>
                <TableCell>{caseItem.lastUpdated}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/cases/view/${caseItem.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/cases/edit/${caseItem.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit case
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onUpdateStatus({
                          id: caseItem.id,
                          status: caseItem.status as "Open" | "Closed" | "Pending"
                        })}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Update status
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive" 
                        onClick={() => onDelete(caseItem.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CaseTable;
