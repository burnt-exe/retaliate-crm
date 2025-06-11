
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
    setIsConnected(!isConnected);
    toast({
      title: `${service.name} ${!isConnected ? "Connected" : "Disconnected"}`,
      description: `Connection to ${service.name} has been ${!isConnected ? "established" : "terminated"}.`,
    });
    // Here you would typically call an API to update the connection status
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
      <CardFooter className="flex flex-col items-center gap-4 border-t pt-4 sm:flex-row sm:justify-between sm:gap-2">
        <div className="flex items-center space-x-2">
          <Switch
            id={`connect-${service.id}`}
            checked={isConnected}
            onCheckedChange={handleToggleConnection}
            aria-label={`Connect ${service.name}`}
          />
          <label htmlFor={`connect-${service.id}`} className={cn("text-sm font-medium", isConnected ? "text-primary" : "text-muted-foreground")}>
            {isConnected ? "Connected" : "Disconnected"}
          </label>
        </div>
        <Button 
          variant={isConnected ? "outline" : "default"} 
          size="sm" 
          onClick={handleToggleConnection}
          className="w-full sm:w-auto"
        >
          {isConnected ? "Manage" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}
