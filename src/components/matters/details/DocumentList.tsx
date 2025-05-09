
import React, { useState } from "react";
import { FileText, Download, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
  type: string;
  url?: string;
  category?: string;
}

interface DocumentListProps {
  documents: Document[];
  title?: string;
  description?: string;
  onAddDocument?: () => void;
  className?: string;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  title = "Documents",
  description,
  onAddDocument,
  className = "",
}) => {
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handlePreview = (document: Document) => {
    setPreviewDocument(document);
  };

  const handleDownload = (document: Document) => {
    // In a real app, this would initiate a file download
    console.log("Downloading:", document.name);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-md">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {onAddDocument && (
          <Button size="sm" onClick={onAddDocument}>
            Add Document
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <FileText className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
            <p>No documents available</p>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between bg-muted/50 border rounded-md p-2.5"
              >
                <div className="flex items-center min-w-0">
                  <FileText className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{doc.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                      <span className="truncate">
                        {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                        {doc.category && ` • ${doc.category}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePreview(doc)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePreview(doc)}>Preview</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(doc)}>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={(open) => !open && setPreviewDocument(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            {previewDocument && (
              <DialogDescription>
                {previewDocument.name} ({formatFileSize(previewDocument.size)})
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="flex justify-center py-4">
            {previewDocument && previewDocument.type.includes("image") ? (
              <img
                src={previewDocument.url || ""}
                alt={previewDocument.name}
                className="max-h-[60vh] max-w-full object-contain rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border rounded-md w-full">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-sm text-center text-muted-foreground">
                  Preview not available for this document type
                </p>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => previewDocument && handleDownload(previewDocument)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Document
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DocumentList;
