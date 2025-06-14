
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { StorageService } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface StorageServiceCardProps {
  service: StorageService;
}

export function StorageServiceCard({ service }: StorageServiceCardProps) {
  const [isConnected, setIsConnected] = useState(service.connected);
  const { toast } = useToast();

  const handleToggleConnection = () => {
    // const newConnectedState = !isConnected; // State is toggled by button now
    // setIsConnected(newConnectedState); // State is toggled by button now
    // Toast logic moved to handleButtonClick
  };
  
  const handleButtonClick = () => {
    if (!isConnected) {
      setIsConnected(true); 
      toast({
        title: `Connecting to ${service.name}`,
        description: `Attempting to link ${service.name} and sync data. In a real app, this might open an auth flow. This is a mock action.`,
      });
    } else {
      toast({
        title: `Managing ${service.name}`,
        description: `Options to manage your ${service.name} connection and sync settings would appear here. This is a mock action.`,
      });
    }
  };

  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.03]">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
          <service.icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold font-headline">{service.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{service.category}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{service.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <div className="flex items-center space-x-2">
          <Switch
            id={`connect-${service.id}`}
            checked={isConnected}
            onCheckedChange={() => {
              // Clicking switch directly also triggers the button's logic for consistency
              // Or, if you want switch to only toggle visual state without toast, handle separately
              setIsConnected(!isConnected); 
              // Optionally add a simpler toast here or none if button is primary action
            }}
            aria-label={`Connect ${service.name}`}
          />
          <label htmlFor={`connect-${service.id}`} className={cn("text-sm font-medium", isConnected ? "text-primary" : "text-muted-foreground")}>
            {isConnected ? "Connected" : "Disconnected"}
          </label>
        </div>
        <Button 
          variant={isConnected ? "outline" : "default"} 
          size="default" 
          onClick={handleButtonClick}
          className="w-full md:w-auto md:min-w-0"
        >
          {isConnected ? "Manage" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}
