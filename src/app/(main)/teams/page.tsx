
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings } from "lucide-react";

export default function TeamsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <MessageSquare className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold font-headline">Microsoft Teams Integration</h1>
        </div>
        <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure Teams
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Seamless Collaboration with Teams</CardTitle>
          <CardDescription>
            Integrate Microsoft Teams to streamline communication, manage team activities, and enhance productivity directly within Retaliate CRM.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Sync team conversations and channels related to specific customers or deals.</li>
              <li>Receive real-time notifications from Teams within the CRM.</li>
              <li>Initiate Teams calls or meetings directly from a customer profile.</li>
              <li>Share CRM records and insights effortlessly into Teams channels.</li>
            </ul>
          </div>
          <div className="text-center">
            <img 
              src="https://placehold.co/800x400.png" 
              alt="Microsoft Teams collaboration placeholder" 
              className="rounded-md inline-block shadow-md"
              data-ai-hint="collaboration software" 
            />
            <p className="text-sm text-muted-foreground mt-2">Visualize your team's synergy.</p>
          </div>
           <Button className="w-full sm:w-auto">
             Connect Microsoft Teams
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}
