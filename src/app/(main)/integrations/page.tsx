import { IntegrationCard } from "@/components/integrations/integration-card";
import { mockIntegrations } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IntegrationsPage() {
  const categories = ["All", ...new Set(mockIntegrations.map(int => int.category))];

  return (
    <div className="container mx-auto">
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
