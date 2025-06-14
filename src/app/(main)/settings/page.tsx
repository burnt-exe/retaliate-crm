
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Palette, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/theme-provider";

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const handleNotificationSettingChange = (settingName: string, value: any) => {
    toast({
      title: "Setting Updated (Mock)",
      description: `${settingName} updated to ${value}. (This is a mock action)`,
    });
  };

  return (
    <div className="container mx-auto py-2 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Application Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and configurations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" /> Notifications</CardTitle>
            <CardDescription>Configure your notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked onCheckedChange={(checked) => handleNotificationSettingChange("Email Notifications", checked)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-notifications">In-App Notifications</Label>
              <Switch id="app-notifications" defaultChecked onCheckedChange={(checked) => handleNotificationSettingChange("In-App Notifications", checked)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Alerts (Feature not active)</Label>
              <Switch id="sms-notifications" disabled onCheckedChange={(checked) => handleNotificationSettingChange("SMS Alerts", checked)} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" /> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme-select">Theme</Label>
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div>
              <Label htmlFor="font-size">Font Size (Current: {fontSize}px)</Label>
              <Input 
                id="font-size" 
                type="number" 
                value={fontSize} 
                min="10" 
                max="24" 
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))} 
              />
               <p className="text-xs text-muted-foreground mt-1">Adjusts base font size (affects rem units). Recommended: 12px-20px.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Lock className="mr-2 h-5 w-5 text-primary" /> Security & Privacy</CardTitle>
            <CardDescription>Manage security settings and data preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={() => handleNotificationSettingChange("Change Password", "Initiated")}>
              Change Password
            </Button>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              <Switch id="two-factor-auth" onCheckedChange={(checked) => handleNotificationSettingChange("Two-Factor Authentication", checked)} />
            </div>
            <Button variant="link" className="p-0 h-auto text-primary" onClick={() => handleNotificationSettingChange("Export Data", "Requested")}>
              Export My Data
            </Button>
          </CardContent>
        </Card>
      </div>
       <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Advanced Settings</CardTitle>
            <CardDescription>Configure advanced options for your CRM experience (placeholders).</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">More settings related to data synchronization, API access, or experimental features would appear here.</p>
          </CardContent>
        </Card>
    </div>
  );
}

