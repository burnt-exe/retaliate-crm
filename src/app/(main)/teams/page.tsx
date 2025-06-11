
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
            <svg 
              width="800" 
              height="400" 
              viewBox="0 0 800 400" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              className="rounded-md inline-block shadow-md"
              data-ai-hint="collaboration software integration"
              aria-labelledby="teamsIntegrationTitle"
              role="img"
            >
              <title id="teamsIntegrationTitle">Retaliate CRM and Microsoft Teams Integration Visual</title>
              <desc>A visual representation showing Retaliate CRM logo and Microsoft Teams logo connected, symbolizing integration.</desc>
              <rect width="100%" height="100%" fill="hsl(var(--card))" rx="8"/>

              {/* Retaliate CRM Logo (ensure /crs-logo.png exists in public folder) */}
              <image xlinkHref="/crs-logo.png" x="50" y="125" height="150" width="150" />

              {/* Connecting Plus Sign */}
              <path d="M395 150 v100 M345 200 h100" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" />
              
              {/* Simplified Teams Logo */}
              <g transform="translate(520 120)">
                {/* Darker purple background elements for depth (shadows) */}
                <rect x="5" y="5" width="120" height="120" rx="20" fill="#3A367E" />
                <rect x="130" y="65" width="40" height="70" rx="10" fill="#5A54A3" transform="translate(5 5)" />
                <circle cx="195" cy="55" r="18" fill="#5A54A3" transform="translate(5 5)" />


                {/* Main Teams Icon Elements */}
                <rect x="0" y="0" width="120" height="120" rx="20" fill="#4F52B5" />
                <text x="60" y="85" fontFamily="Inter, Arial, sans-serif" fontSize="70" fontWeight="bold" fill="white" textAnchor="middle">T</text>
                
                {/* Person 1 */}
                <rect x="130" y="65" width="40" height="70" rx="10" fill="#7879F1" />
                <circle cx="150" cy="45" r="20" fill="#7879F1" />
                
                {/* Person 2 (slightly smaller, lighter, and offset) */}
                <rect x="175" y="75" width="36" height="60" rx="9" fill="#A09DEF" />
                <circle cx="193" cy="55" r="18" fill="#A09DEF" />
              </g>
            </svg>
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
