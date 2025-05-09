
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Clock } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AssignmentInfoCardProps {
  assignedUser: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  assignedDate: string;
  className?: string;
}

const AssignmentInfoCard: React.FC<AssignmentInfoCardProps> = ({
  assignedUser,
  assignedDate,
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Assigned To</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <Avatar>
            {assignedUser.avatar ? (
              <AvatarImage src={assignedUser.avatar} alt={assignedUser.name} />
            ) : (
              <AvatarFallback>
                {assignedUser.name.split(" ").map(part => part[0]).join("").toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h4 className="font-medium">{assignedUser.name}</h4>
            {assignedUser.role && (
              <p className="text-xs text-muted-foreground">{assignedUser.role}</p>
            )}
            {assignedUser.email && (
              <p className="text-sm text-muted-foreground mt-1">{assignedUser.email}</p>
            )}
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Assigned on {format(new Date(assignedDate), "PPP")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentInfoCard;
