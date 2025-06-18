
import { DollarSign } from "lucide-react";
import { CommissionsTrackerClient } from "@/components/commissions/commissions-tracker-client";

export default function CommissionsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Commissions Tracker</h1>
          <p className="text-muted-foreground">Monitor sales commissions, track performance, and manage targets.</p>
        </div>
      </div>
      <CommissionsTrackerClient />
    </div>
  );
}
