
import { Gavel } from "lucide-react";
import { TenderListClient } from "@/components/tenders/tender-list-client";

export default function TendersPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Gavel className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Tenders & RFQs Management</h1>
          <p className="text-muted-foreground">Manage tender alerts, responses, submissions, and reporting.</p>
        </div>
      </div>
      <TenderListClient />
    </div>
  );
}
