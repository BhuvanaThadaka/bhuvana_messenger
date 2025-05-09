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
import { CourtData } from "@/services/master-data";

interface CourtsTabProps {
  courts: CourtData[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const CourtsTab: React.FC<CourtsTabProps> = ({
  courts,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Court Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-24">
              Loading...
            </TableCell>
          </TableRow>
        ) : courts.length > 0 ? (
          courts.map((court) => (
            <TableRow key={court.id}>
              <TableCell className="font-mono text-xs">{court.id}</TableCell>
              <TableCell className="font-medium">{court.name}</TableCell>
              <TableCell>{court.location}</TableCell>
              <TableCell>{court.type}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(court.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(court.id, court.name)}
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
            <TableCell colSpan={5} className="text-center h-24">
              No courts found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CourtsTab;
