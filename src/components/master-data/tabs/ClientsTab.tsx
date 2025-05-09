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
import { ClientData } from "@/services/master-data";

interface ClientsTabProps {
  clients: ClientData[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const ClientsTab: React.FC<ClientsTabProps> = ({
  clients,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Industry</TableHead>
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
        ) : clients.length > 0 ? (
          clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-mono text-xs">{client.id}</TableCell>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.industry}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(client.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(client.id, client.name)}
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
              No clients found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTab;
