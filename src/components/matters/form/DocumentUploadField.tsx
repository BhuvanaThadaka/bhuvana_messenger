
import React, { useState } from "react";
import { FileUp, FileText, X, Eye, Download, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url?: string;
}

interface DocumentUploadFieldProps {
  label: string;
  description?: string;
  files: DocumentFile[];
  onAddFile: (file: File) => void;
  onRemoveFile: (fileId: string) => void;
  disabled?: boolean;
  accept?: string;
  maxFileSizeMB?: number;
  className?: string;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label,
  description,
  files,
  onAddFile,
  onRemoveFile,
  disabled = false,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFileSizeMB = 10,
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<DocumentFile | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxFileSizeMB}MB limit`);
      return false;
    }

    // Check file type
    const acceptedTypes = accept.split(",");
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.some(type => type === fileExtension || type === file.type)) {
      setError(`File type not accepted. Please upload: ${accept}`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onAddFile(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onAddFile(file);
      }
      // Reset the input value to allow uploading the same file again
      e.target.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "pdf";
    if (fileType.includes("doc")) return "doc";
    if (fileType.includes("image")) return "image";
    return "generic";
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      {description && <p className="text-sm text-muted-foreground mt-1 mb-3">{description}</p>}

      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragActive ? "border-primary/70 bg-primary/5" : "border-muted"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-center text-muted-foreground mb-1">
            Drag & drop a file here, or{" "}
            <span className="text-primary font-medium">browse</span>
          </p>
          <p className="text-xs text-center text-muted-foreground">
            Supports {accept} (Max {maxFileSizeMB}MB)
          </p>
          <Input
            type="file"
            id={`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
            className="hidden"
            onChange={handleFileInput}
            accept={accept}
            disabled={disabled}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            disabled={disabled}
            onClick={() => document.getElementById(`file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`)?.click()}
          >
            Select File
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive mt-2">{error}</p>}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Uploaded Documents</p>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-muted/50 border rounded-md p-2"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewFile(file)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onRemoveFile(file.id)}
                  disabled={disabled}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>{previewFile?.name}</DialogDescription>
          </DialogHeader>

          <div className="flex justify-center py-4">
            {previewFile?.type.includes("image") ? (
              <img
                src={previewFile.url || ""}
                alt={previewFile.name}
                className="max-h-96 max-w-full object-contain rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border rounded-md">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-sm text-center text-muted-foreground">
                  Preview not available for {previewFile?.type} files
                </p>
                <Button className="mt-4" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Document
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentUploadField;
