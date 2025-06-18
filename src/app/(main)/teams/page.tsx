
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/icons"; // Assuming /crs-logo.png is the Retaliate CRM logo

export default function TeamsPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleToggleConnection = () => {
    if (isConnected) {
      // Simulate disconnection
      setIsConnected(false);
      toast({
        title: "Microsoft Teams Disconnected",
        description: "Your Microsoft Teams integration has been disconnected.",
      });
    } else {
      setIsConnecting(true);
      toast({
        title: "Connecting to Microsoft Teams...",
        description: "You would typically be redirected to Microsoft to sign in. This is a mock flow.",
      });
      // Simulate authentication delay
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        toast({
          title: "Microsoft Teams Connected!",
          description: "You can now leverage Teams features within the CRM.",
          variant: "default",
        });
      }, 2500);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-10 w-10 text-primary" />
          <div>
            <h1 className="text-3xl font-bold font-headline">Microsoft Teams Integration</h1>
            <p className="text-muted-foreground">
              {isConnected ? "Manage your Microsoft Teams connection." : "Connect to Microsoft Teams to enhance collaboration."}
            </p>
          </div>
        </div>
        {isConnected && (
            <Button variant="outline" onClick={() => toast({ title: "Configure Teams (Mock)", description: "Configuration settings would appear here."})}>
                <Settings className="mr-2 h-4 w-4" />
                Configure Teams
            </Button>
        )}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            {isConnected ? "Seamless Collaboration with Teams - Connected!" : "Seamless Collaboration with Teams"}
          </CardTitle>
          <CardDescription>
            {isConnected
              ? "Your Microsoft Teams account is linked. Start collaborating directly from Retaliate CRM."
              : "Integrate Microsoft Teams to streamline communication, manage team activities, and enhance productivity directly within Retaliate CRM."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isConnected ? (
            <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Successfully Connected to Microsoft Teams!</h3>
              <p className="text-muted-foreground mt-2">
                You can now access Teams related features. (Further UI for specific features would be built here).
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features (once connected):</h3>
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
                  {/* Using a placeholder as Logo component is not directly usable in SVG. You might need to inline SVG for your logo or use an actual image path */}
                  <image xlinkHref="/crs-logo.png" x="50" y="125" height="150" width="150" data-ai-hint="company logo" />


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
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleToggleConnection}
            disabled={isConnecting}
            className={`w-full sm:w-auto ${isConnected ? "bg-destructive hover:bg-destructive/90" : ""}`}
          >
            {isConnecting ? (
              "Connecting..."
            ) : isConnected ? (
              <>
                <XCircle className="mr-2 h-4 w-4" /> Disconnect Microsoft Teams
              </>
            ) : (
              "Connect Microsoft Teams"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
