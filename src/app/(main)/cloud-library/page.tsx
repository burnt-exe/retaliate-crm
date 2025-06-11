
"use client";

import { StorageServiceCard } from "@/components/cloud-library/storage-service-card";
import { mockStorageServices } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LibraryBig } from "lucide-react";

export default function CloudLibraryPage() {
  const categories = ["All", ...new Set(mockStorageServices.map(service => service.category))];

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <LibraryBig className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Cloud Library Sync</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Connect and synchronize your various cloud storage services and repositories to your internal CRM storage.
        Manage your files and documents seamlessly from one place.
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
              {mockStorageServices
                .filter(service => category === "All" || service.category === category)
                .map((service) => (
                  <StorageServiceCard key={service.id} service={service} />
              ))}
            </div>
            {mockStorageServices.filter(service => category === "All" || service.category === category).length === 0 && (
                <p className="text-center text-muted-foreground py-8 col-span-full">
                    No storage services found in this category.
                </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
