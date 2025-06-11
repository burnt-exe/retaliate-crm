
"use client";

import { IntegrationCard } from "@/components/integrations/integration-card";
import { mockIntegrations } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plug } from "lucide-react";

export default function IntegrationsPage() {
  const categories = ["All", ...new Set(mockIntegrations.map(int => int.category))];

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Plug className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Integrations Hub</h1>
      </div>
       <p className="text-muted-foreground mb-6">
        Connect Retaliate CRM with your favorite tools and services to streamline your workflow and enhance productivity.
      </p>
      <Tabs defaultValue="All" className="space-y-4">
        <TabsList>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mockIntegrations
                .filter(int => category === "All" || int.category === category)
                .map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
             {mockIntegrations.filter(int => category === "All" || int.category === category).length === 0 && (
                <p className="text-center text-muted-foreground py-8 col-span-full">
                    No integrations found in this category.
                </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
