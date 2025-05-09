import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearSelectedLawFirm } from '@/redux/slices/law-firm';
import LawFirmForm from "@/components/law-firm/LawFirmForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateLawFirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Clear any previously selected law firm when creating a new one
  useEffect(() => {
    dispatch(clearSelectedLawFirm());
  }, [dispatch]);

  const handleBackToLawFirms = () => {
    navigate('/law-firms');
    toast({
      title: "Navigation",
      description: "Returned to law firms list",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackToLawFirms}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Law Firms
        </Button>
      </div>

      <div className="bg-background p-6 border rounded-lg shadow-sm">
        <LawFirmForm mode="create" />
      </div>
    </div>
  );
};

export default CreateLawFirm;
