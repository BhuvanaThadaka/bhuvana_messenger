
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, FileText, Plus } from "lucide-react";

// Define Case data type
type Case = {
  id: string;
  title: string;
  client: string;
  status: "Open" | "Closed" | "Pending";
  priority: "High" | "Medium" | "Low";
  type: string;
  assignedTo: string;
  lastUpdated: string;
};

// Sample data
const data: Case[] = [
  {
    id: "CASE-1001",
    title: "Contract Dispute - ABC Corp",
    client: "ABC Corporation",
    status: "Open",
    priority: "High",
    type: "Contract",
    assignedTo: "John Doe",
    lastUpdated: "2025-04-01",
  },
  {
    id: "CASE-1002",
    title: "Intellectual Property Claim",
    client: "XYZ Tech",
    status: "Open",
    priority: "High",
    type: "Intellectual Property",
    assignedTo: "Jane Smith",
    lastUpdated: "2025-04-02",
  },
  {
    id: "CASE-1003",
    title: "Employment Termination Review",
    client: "123 Industries",
    status: "Pending",
    priority: "Medium",
    type: "Employment",
    assignedTo: "John Doe",
    lastUpdated: "2025-03-28",
  },
  {
    id: "CASE-1004",
    title: "Merger Documentation",
    client: "BigCorp Inc",
    status: "Open",
    priority: "High",
    type: "Corporate",
    assignedTo: "Sarah Johnson",
    lastUpdated: "2025-04-03",
  },
  {
    id: "CASE-1005",
    title: "Real Estate Acquisition",
    client: "Property Holdings LLC",
    status: "Closed",
    priority: "Low",
    type: "Real Estate",
    assignedTo: "Mark Williams",
    lastUpdated: "2025-03-20",
  },
  {
    id: "CASE-1006",
    title: "Compliance Review - Financial",
    client: "Finance Solutions Inc",
    status: "Pending",
    priority: "Medium",
    type: "Compliance",
    assignedTo: "Jane Smith",
    lastUpdated: "2025-03-25",
  },
  {
    id: "CASE-1007",
    title: "Patent Application",
    client: "Innovate Tech",
    status: "Open",
    priority: "Medium",
    type: "Intellectual Property",
    assignedTo: "John Doe",
    lastUpdated: "2025-04-04",
  },
  {
    id: "CASE-1008",
    title: "Tax Dispute Resolution",
    client: "Global Traders Inc",
    status: "Open",
    priority: "Medium",
    type: "Tax",
    assignedTo: "Sarah Johnson",
    lastUpdated: "2025-03-30",
  },
];

const Cases = () => {
  const { user } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Define table columns
  const columns: ColumnDef<Case>[] = [
    {
      accessorKey: "id",
      header: "Case ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("title")}</span>
        </div>
      ),
    },
    {
      accessorKey: "client",
      header: "Client",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "Open" ? "default" : status === "Pending" ? "outline" : "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as "High" | "Medium" | "Low";
        let variant: "destructive" | "default" | "outline" = "default";
        
        switch (priority) {
          case "High":
            variant = "destructive";
            break;
          case "Medium":
            variant = "default";
            break;
          case "Low":
            variant = "outline";
            break;
        }
        
        return <Badge variant={variant}>{priority}</Badge>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const caseData = row.original;

        return (
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
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit case</DropdownMenuItem>
              <DropdownMenuItem>Add document</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Close case</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Case
        </Button>
      </div>

      <div className="flex items-center justify-between pb-4">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No cases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button 
                variant="outline"
                size="sm"
                className="gap-1 pl-2.5"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                Previous
              </Button>
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index === table.getState().pagination.pageIndex}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )).slice(
              Math.max(0, table.getState().pagination.pageIndex - 1),
              Math.min(
                table.getPageCount(),
                table.getState().pagination.pageIndex + 3
              )
            )}
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 pr-2.5"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
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

export default Cases;
