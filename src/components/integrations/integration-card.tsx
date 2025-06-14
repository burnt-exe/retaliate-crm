
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Integration } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const [isConnected, setIsConnected] = useState(integration.connected);
  const { toast } = useToast();

  const handleToggleConnection = () => {
    const newConnectedState = !isConnected;
    setIsConnected(newConnectedState);
    // Here you would typically call an API to update the connection status

    if (newConnectedState) {
      toast({
        title: `Connecting to ${integration.name}`,
        description: `Attempting to link ${integration.name} and sync data with Retaliate CRM. This is a mock action.`,
      });
    } else {
      toast({
        title: `Disconnecting ${integration.name}`,
        description: `Connection to ${integration.name} is being terminated. This is a mock action.`,
      });
    }
  };

  const handleButtonClick = () => {
    // If not connected, clicking the button should initiate connection
    // If already connected, clicking "Manage" could open a settings dialog (mocked for now)
    if (!isConnected) {
      handleToggleConnection(); // This will also show the toast
    } else {
      toast({
        title: `Managing ${integration.name}`,
        description: `Options to manage your ${integration.name} integration settings would appear here. This is a mock action.`,
      });
    }
  };


  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03]">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
          <integration.icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold font-headline">{integration.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{integration.category}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{integration.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 border-t pt-4 sm:flex-row sm:justify-between sm:gap-2">
        <div className="flex items-center space-x-2">
          <Switch
            id={`connect-${integration.id}`}
            checked={isConnected}
            onCheckedChange={handleToggleConnection}
            aria-label={`Connect ${integration.name}`}
          />
          <label htmlFor={`connect-${integration.id}`} className={cn("text-sm font-medium", isConnected ? "text-primary" : "text-muted-foreground")}>
            {isConnected ? "Connected" : "Disconnected"}
          </label>
        </div>
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          onClick={handleButtonClick}
          className="w-full sm:w-auto"
        >
          {isConnected ? "Manage" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}

