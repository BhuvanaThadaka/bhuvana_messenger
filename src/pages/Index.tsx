
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building, FileText, Users, LayoutDashboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    
    toast({
      title: "Welcome",
      description: isAuthenticated ? "Proceeding to dashboard" : "Please login to continue",
    });
  };

  const handleLawFirmManagement = () => {
    navigate('/law-firms');
    
    toast({
      title: "Law Firm Management",
      description: "Explore and manage your law firms",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Vakeel<span className="text-primary">Pro</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mb-12">
          The comprehensive legal practice management system designed for modern law firms
        </p>
        
        {isAuthenticated ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Button>
            <Button size="lg" variant="outline" onClick={handleLawFirmManagement}>
              <Building className="mr-2 h-5 w-5" />
              Manage Law Firms
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleGetStarted}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={handleLawFirmManagement}>
              Explore Law Firm Management
            </Button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Comprehensive Legal Practice Management
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Building className="h-10 w-10 text-primary" />}
            title="Law Firm Management"
            description="Effortlessly manage multiple law firms, track performance, and ensure compliance with regulatory requirements."
            onClick={handleLawFirmManagement}
          />
          
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="Case Management"
            description="Track cases from intake to resolution with powerful workflow tools, document management, and deadline tracking."
          />
          
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-primary" />}
            title="User Management"
            description="Easily manage staff, assign roles and permissions, and maintain security across your entire practice."
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your legal practice?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Join hundreds of law firms already using VakeelPro to streamline their operations.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" onClick={handleGetStarted}>
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Today'}
            </Button>
            <Button size="lg" variant="outline" onClick={handleLawFirmManagement}>
              Manage Law Firms
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ 
  icon, 
  title, 
  description,
  onClick
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  onClick?: () => void;
}) => {
  return (
    <div 
      className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default Index;
