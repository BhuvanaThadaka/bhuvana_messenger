
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Clock, FileText, User, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { capitalizeFirstLetter } from "@/utils/format";

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

const IndividualDashboard = () => {
  const { user } = useAuth();
  const userName = user ? capitalizeFirstLetter(user.username) : "User";

  return (
    <div className="space-y-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welcome back, {userName}</CardTitle>
          <CardDescription>
            Here's an overview of your activity
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Individual Account • Last login: Today, 9:32 AM
            </p>
          </div>
          <button className="ml-auto rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">
            View Profile
          </button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Your Cases"
          value="6"
          description="1 active, 5 completed"
          icon={Briefcase}
        />
        <DashboardCard
          title="Documents"
          value="18"
          description="3 need your review"
          icon={FileText}
        />
        <DashboardCard
          title="Upcoming Deadlines"
          value="2"
          description="Next: Apr 12, 2025"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Case Updates</CardTitle>
            <CardDescription>
              Recent activities on your cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: FileText, title: "Document Updated", desc: "Case #1242 - Contract Amendment", time: "2h ago" },
                { icon: Briefcase, title: "Status Change", desc: "Case #1238 - Now in review", time: "1d ago" },
                { icon: Clock, title: "Deadline Updated", desc: "Case #1245 - Now due Apr 15", time: "2d ago" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Recent notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Document Review", desc: "Please review the updated contract", time: "1h ago", unread: true },
                { title: "Case Status", desc: "Your case has moved to settlement", time: "1d ago", unread: false },
                { title: "Meeting Reminder", desc: "Virtual consultation tomorrow at 10:00 AM", time: "1d ago", unread: false }
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 rounded-lg border p-3 ${item.unread ? 'bg-primary/5' : ''}`}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{item.title}</p>
                      {item.unread && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndividualDashboard;
