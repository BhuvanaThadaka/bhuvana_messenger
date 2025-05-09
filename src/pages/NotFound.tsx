
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: Page not found:", location.pathname);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        
        <p className="text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center pt-2">
          <Button onClick={() => navigate("/")} className="px-6">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
