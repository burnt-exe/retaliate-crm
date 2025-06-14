
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpenText className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Retaliate CRM Documentation</h1>
          <p className="text-muted-foreground">Your comprehensive guide to using Retaliate CRM.</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Welcome to the Documentation Hub</CardTitle>
          <CardDescription>
            This section is currently under development. In a live application, you would find detailed guides, tutorials, API references, and FAQs here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-12">
            <BookOpenText className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Documentation Coming Soon!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We are working hard to bring you a complete set of documentation. 
              Please check back later for updates.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              For immediate assistance, please visit our <a href="/support" className="text-primary hover:underline">Support Page</a>.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Anticipated Sections:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Getting Started Guide</li>
              <li>Account Management</li>
              <li>Customer Relationship Management Features</li>
              <li>Integrations Setup</li>
              <li>AI Tools Usage</li>
              <li>Troubleshooting & FAQs</li>
              <li>API Reference (for developers)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
