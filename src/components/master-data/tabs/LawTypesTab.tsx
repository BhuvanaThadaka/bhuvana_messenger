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
import { Edit, Trash2 } from "lucide-react";
import { LawTypeData } from "@/services/master-data";

interface LawTypesTabProps {
  lawTypes: LawTypeData[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const LawTypesTab: React.FC<LawTypesTabProps> = ({
  lawTypes,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Law Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center h-24">
              Loading...
            </TableCell>
          </TableRow>
        ) : lawTypes.length > 0 ? (
          lawTypes.map((lawType) => (
            <TableRow key={lawType.id}>
              <TableCell className="font-mono text-xs">{lawType.id}</TableCell>
              <TableCell className="font-medium">{lawType.name}</TableCell>
              <TableCell>
                {lawType.description.length > 100 
                  ? `${lawType.description.substring(0, 100)}...` 
                  : lawType.description}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(lawType.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(lawType.id, lawType.name)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center h-24">
              No law types found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LawTypesTab;
