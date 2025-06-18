
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Settings, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MicrosoftIcon } from "@/components/icons";

import { MsalProvider, useMsal, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication, InteractionStatus, type AccountInfo, PopupRequest } from "@azure/msal-browser";
import { msalInstance as msalInstanceConfig, loginRequest } from "@/lib/msal-config";


function TeamsPageContent() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { toast } = useToast();
  const [activeAccount, setActiveAccount] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setActiveAccount(accounts[0]);
    } else {
      setActiveAccount(null);
    }
  }, [accounts]);

  const handleLogin = async () => {
    if (inProgress === InteractionStatus.None) {
      try {
        await instance.loginPopup(loginRequest);
        toast({
          title: "Signed In",
          description: "Successfully signed in with Microsoft.",
        });
      } catch (error) {
        console.error("MSAL Login Error:", error);
        toast({
          title: "Sign In Failed",
          description: "Could not sign in with Microsoft. Check console for details.",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = async () => {
    if (activeAccount) {
      try {
        await instance.logoutPopup({ account: activeAccount });
        toast({
          title: "Signed Out",
          description: "Successfully signed out from Microsoft.",
        });
      } catch (error) {
        console.error("MSAL Logout Error:", error);
        toast({
          title: "Sign Out Failed",
          description: "Could not sign out. Check console for details.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Example function to acquire a token silently (call Graph API later)
  const acquireTokenAndCallGraph = async () => {
    if (!activeAccount) {
      toast({ title: "Not Authenticated", description: "Please sign in first.", variant: "destructive"});
      return;
    }
    const request: PopupRequest = {
      ...loginRequest, // Use the same scopes as login
      account: activeAccount,
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      // const accessToken = response.accessToken;
      // Now you can use this accessToken to call Microsoft Graph API
      // e.g., fetchUserTeams(accessToken);
      toast({
        title: "Token Acquired (Mock)",
        description: `Successfully acquired token for ${activeAccount.name}. You can now call Graph API.`,
      });
      console.log("Acquired Token Response:", response);
    } catch (error) {
      console.error("Token Acquisition Error:", error);
      // Fallback to interactive method if silent fails
      if (error instanceof Error && (error.name === "InteractionRequiredAuthError" || error.name === "BrowserAuthError")) {
        try {
          const response = await instance.acquireTokenPopup(request);
          // const accessToken = response.accessToken;
          toast({
            title: "Token Acquired (Interactive - Mock)",
            description: `Successfully acquired token for ${activeAccount.name} via popup. You can now call Graph API.`,
          });
          console.log("Acquired Token Response (Popup):", response);
        } catch (popupError) {
          console.error("Interactive Token Acquisition Error:", popupError);
          toast({ title: "Token Acquisition Failed", description: "Could not acquire token for Graph API.", variant: "destructive"});
        }
      } else {
         toast({ title: "Token Acquisition Failed", description: "Could not acquire token for Graph API.", variant: "destructive"});
      }
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
              {isAuthenticated ? "Manage your Microsoft Teams connection." : "Connect to Microsoft Teams to enhance collaboration."}
            </p>
          </div>
        </div>
        {isAuthenticated && (
          <Button variant="outline" onClick={() => toast({ title: "Configure Teams (Mock)", description: "Configuration settings would appear here."})}>
            <Settings className="mr-2 h-4 w-4" />
            Configure Teams
          </Button>
        )}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            {isAuthenticated ? "Seamless Collaboration with Teams - Connected!" : "Seamless Collaboration with Teams"}
          </CardTitle>
          <CardDescription>
            {isAuthenticated
              ? `You are connected as ${activeAccount?.name || activeAccount?.username}. Start collaborating directly from Retaliate CRM.`
              : "Integrate Microsoft Teams to streamline communication, manage team activities, and enhance productivity directly within Retaliate CRM."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AuthenticatedTemplate>
            <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Successfully Connected to Microsoft Teams!</h3>
              <p className="text-muted-foreground mt-2">
                User: {activeAccount?.name || activeAccount?.username}
              </p>
              <p className="text-muted-foreground text-xs">
                Email: {activeAccount?.username}
              </p>
              <Button onClick={acquireTokenAndCallGraph} variant="outline" className="mt-4">
                Test Graph API Token (Mock)
              </Button>
            </div>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
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
                  {/* Placeholder for local image */}
                  <text x="125" y="200" fontFamily="Arial" fontSize="20" fill="hsl(var(--foreground))" textAnchor="middle">Logo</text>
                  <path d="M395 150 v100 M345 200 h100" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" />
                  <g transform="translate(520 120)">
                    <rect x="5" y="5" width="120" height="120" rx="20" fill="#3A367E" />
                    <rect x="130" y="65" width="40" height="70" rx="10" fill="#5A54A3" transform="translate(5 5)" />
                    <circle cx="195" cy="55" r="18" fill="#5A54A3" transform="translate(5 5)" />
                    <rect x="0" y="0" width="120" height="120" rx="20" fill="#4F52B5" />
                    <text x="60" y="85" fontFamily="Inter, Arial, sans-serif" fontSize="70" fontWeight="bold" fill="white" textAnchor="middle">T</text>
                    <rect x="130" y="65" width="40" height="70" rx="10" fill="#7879F1" />
                    <circle cx="150" cy="45" r="20" fill="#7879F1" />
                    <rect x="175" y="75" width="36" height="60" rx="9" fill="#A09DEF" />
                    <circle cx="193" cy="55" r="18" fill="#A09DEF" />
                  </g>
                </svg>
                <p className="text-sm text-muted-foreground mt-2">Visualize your team's synergy.</p>
                 <p className="text-xs text-muted-foreground mt-2">
                   Ensure you have updated <code className="bg-muted px-1 py-0.5 rounded">src/lib/msal-config.ts</code> with your Azure AD App details.
                </p>
              </div>
            </>
          </UnauthenticatedTemplate>
        </CardContent>
        <CardFooter>
          <AuthenticatedTemplate>
            <Button
              onClick={handleLogout}
              disabled={inProgress !== InteractionStatus.None}
              className="w-full sm:w-auto bg-destructive hover:bg-destructive/90"
            >
              <LogOut className="mr-2 h-4 w-4" /> Disconnect Microsoft Teams
            </Button>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
             <Button
                onClick={handleLogin}
                disabled={inProgress !== InteractionStatus.None}
                className="w-full sm:w-auto bg-[#0078D4] hover:bg-[#005A9E] text-white"
              >
                <MicrosoftIcon className="mr-2 h-5 w-5" />
                {inProgress !== InteractionStatus.None ? "Processing..." : "Connect Microsoft Teams"}
              </Button>
          </UnauthenticatedTemplate>
        </CardFooter>
      </Card>
    </div>
  );
}

// Wrap the page content with MsalProvider
export default function TeamsPage() {
  const msalInstance = new PublicClientApplication(msalInstanceConfig.auth); // Create new instance or use one from config
  return (
    <MsalProvider instance={msalInstance}>
      <TeamsPageContent />
    </MsalProvider>
  );
}
