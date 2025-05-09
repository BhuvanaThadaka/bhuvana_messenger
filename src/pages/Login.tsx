import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth, getFirstAccessibleModule } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Users, User, Shield } from "lucide-react";
import { Modules } from "@/types/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginStart, loginSuccess, loginFailure, loginAsync } from "@/redux/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);
  const { isLoading, error } = authState;

  if (isAuthenticated && user) {
    const firstModule = getFirstAccessibleModule(user);
    let redirectPath = "/dashboard";
    
    switch (firstModule) {
      case Modules.Dashboard:
        redirectPath = "/dashboard";
        break;
      case Modules.CaseManagement:
        redirectPath = "/cases";
        break;
      case Modules.UserProfile:
        redirectPath = "/profile";
        break;
      case Modules.MasterDataManagement:
        redirectPath = "/master-data";
        break;
      case Modules.UserManagement:
        redirectPath = "/users";
        break;
      case Modules.RoleManagement:
        redirectPath = "/roles";
        break;
    }
    
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted", username, password);
    
    try {
      dispatch(loginAsync({ username, password }));
      await login(username, password);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleQuickLogin = async (userType: string) => {
    let demoUsername = "";
    let demoPassword = "password";
    
    switch (userType) {
      case "admin":
        demoUsername = "admin";
        break;
      case "organisation":
        demoUsername = "company";
        break;
      case "individual":
        demoUsername = "saikoti";
        break;
    }
    
    setUsername(demoUsername);
    setPassword(demoPassword);
    
    try {
      dispatch(loginAsync({ username: demoUsername, password: demoPassword }));
      await login(demoUsername, demoPassword);
    } catch (err) {
      console.error("Quick login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">VakeelPro Legal Management</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your legal workspace
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username / Email</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="pt-2">
              <p className="text-sm text-center mb-2">Demo Quick Login</p>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center justify-center" 
                  onClick={() => handleQuickLogin("admin")}
                  disabled={isLoading}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span className="text-xs">Admin</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={() => handleQuickLogin("organisation")}
                  disabled={isLoading}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span className="text-xs">Law Firm</span>
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={() => handleQuickLogin("individual")}
                  disabled={isLoading}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span className="text-xs">Lawyer</span>
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In to VakeelPro"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
