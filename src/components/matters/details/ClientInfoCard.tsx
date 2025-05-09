
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface ClientInfoCardProps {
  clientName: string;
  clientId?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  className?: string;
}

const ClientInfoCard: React.FC<ClientInfoCardProps> = ({
  clientName,
  clientId,
  clientEmail,
  clientPhone,
  clientAddress,
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-3">
          <div className="bg-muted rounded-full p-2">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-medium">{clientName}</h4>
            {clientId && (
              <p className="text-sm text-muted-foreground mt-1">Client ID: {clientId}</p>
            )}
            {clientEmail && (
              <p className="text-sm mt-2">{clientEmail}</p>
            )}
            {clientPhone && (
              <p className="text-sm text-muted-foreground">{clientPhone}</p>
            )}
            {clientAddress && (
              <p className="text-sm text-muted-foreground mt-1">{clientAddress}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfoCard;
