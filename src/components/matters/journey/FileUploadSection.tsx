
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export const FileUploadSection: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file-upload" className="w-full cursor-pointer">
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, XLSX, images (MAX. 10MB)
                </p>
              </div>
              <input id="file-upload" type="file" className="hidden" disabled />
            </div>
          </label>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          File upload functionality will be implemented with backend integration
        </p>
      </CardContent>
    </Card>
  );
};
