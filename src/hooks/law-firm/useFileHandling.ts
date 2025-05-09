
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useFileHandling = () => {
  const [registrationFile, setRegistrationFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleFileChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (fieldName === 'registrationFile') {
        setRegistrationFile(e.target.files[0]);
      } else if (fieldName === 'logoFile') {
        setLogoFile(e.target.files[0]);
      }
      
      toast({
        title: "File Added",
        description: fieldName === 'registrationFile' 
          ? "Registration certificate uploaded successfully" 
          : "Company logo uploaded successfully"
      });
    }
  };

  return {
    registrationFile,
    logoFile,
    handleFileChange
  };
};

