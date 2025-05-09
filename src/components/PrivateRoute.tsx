
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, hasAccess } from '@/contexts/AuthContext';
import { Modules } from '@/types/auth';
import { Loader2 } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredModule?: Modules;
  requiredAction?: string;
}

const PrivateRoute = ({ 
  children, 
  requiredModule,
  requiredAction 
}: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If module access check is required
  if (requiredModule) {
    const hasModuleAccess = hasAccess(user, requiredModule, requiredAction);
    
    if (!hasModuleAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
