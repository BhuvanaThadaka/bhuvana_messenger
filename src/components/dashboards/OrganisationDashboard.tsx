
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, 
  Briefcase, 
  Clock, 
  FileText, 
  Users,
  Building2 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const OrganisationDashboard = () => {
  const { user } = useAuth();
  const organizationName = user?.organization || "Your Organization";

  return (
    <div className="space-y-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>
            Manage your organization's information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary/10">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{organizationName}</h3>
            <p className="text-sm text-muted-foreground">
              Legal Services Organization • Since 2022
            </p>
          </div>
          <Link to="/company-profile" className="ml-auto">
            <button className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">
              Edit Profile
            </button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Active Cases"
          value="28"
          description="4 cases updated today"
          icon={Briefcase}
        />
        <DashboardCard
          title="Team Members"
          value="12"
          description="2 pending invitations"
          icon={Users}
        />
        <DashboardCard
          title="Pending Documents"
          value="7"
          description="3 require urgent attention"
          icon={FileText}
        />
        <DashboardCard
          title="Upcoming Deadlines"
          value="5"
          description="Next deadline in 2 days"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Case Activity</CardTitle>
            <CardDescription>
              Cases activity over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border rounded-md">
              <BarChart3 className="h-16 w-16 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Activity Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
            <CardDescription>
              Recent activities by your team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", action: "Created new case", case: "Contract Review #A123", time: "2h ago" },
                { name: "Jane Smith", action: "Updated document", case: "IP Dispute #B456", time: "4h ago" },
                { name: "Mark Wilson", action: "Added comment", case: "Litigation #C789", time: "1d ago" },
                { name: "Sarah Parker", action: "Set deadline", case: "Contract Review #A123", time: "2d ago" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.name}</p>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                  <p className="text-xs">
                    {item.action} on <span className="font-medium">{item.case}</span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationDashboard;
