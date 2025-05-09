
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LockIcon, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="rounded-full bg-red-100 p-3 w-16 h-16 flex items-center justify-center mx-auto">
          <LockIcon className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
        
        <p className="text-gray-600">
          You don't have permission to access this page. Please contact your 
          administrator if you believe this is a mistake.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button onClick={() => navigate("/")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
