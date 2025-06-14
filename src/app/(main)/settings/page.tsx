
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Palette, Lock, RefreshCw, SlidersHorizontal, PackageCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme/theme-provider";

const generateMockApiKey = () => {
  return `sk_live_${[...Array(24)].map(() => Math.random().toString(36)[2]).join('')}`;
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const [syncFrequency, setSyncFrequency] = useState("realtime");
  const [apiKey, setApiKey] = useState(generateMockApiKey());
  const [experimentalAnalytics, setExperimentalAnalytics] = useState(false);


  const handleSettingChange = (settingName: string, value: any) => {
    toast({
      title: "Setting Updated",
      description: `${settingName} set to ${value}. (This is a mock action)`,
    });
  };
  
  const handleRegenerateApiKey = () => {
    const newKey = generateMockApiKey();
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated (Mock)",
      description: "A new API key has been generated and displayed. Old key is invalidated.",
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
              <Switch id="email-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("Email Notifications", checked)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-notifications">In-App Notifications</Label>
              <Switch id="app-notifications" defaultChecked onCheckedChange={(checked) => handleSettingChange("In-App Notifications", checked)} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Alerts (Feature not active)</Label>
              <Switch id="sms-notifications" disabled onCheckedChange={(checked) => handleSettingChange("SMS Alerts", checked)} />
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
            <Button variant="outline" className="w-full" onClick={() => handleSettingChange("Change Password", "Initiated")}>
              Change Password
            </Button>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              <Switch id="two-factor-auth" onCheckedChange={(checked) => handleSettingChange("Two-Factor Authentication", checked)} />
            </div>
            <Button variant="link" className="p-0 h-auto text-primary" onClick={() => handleSettingChange("Export Data", "Requested")}>
              Export My Data
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5 text-primary"/> Advanced Settings</CardTitle>
            <CardDescription>Configure advanced options for your CRM experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Data Synchronization Frequency</Label>
              <Select value={syncFrequency} onValueChange={(value) => {
                setSyncFrequency(value);
                handleSettingChange("Data Sync Frequency", value);
              }}>
                <SelectTrigger id="sync-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time (default)</SelectItem>
                  <SelectItem value="15min">Every 15 Minutes</SelectItem>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Determines how often data is synced with external services (mock).</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center">
                <PackageCheck className="mr-2 h-4 w-4 text-muted-foreground"/> API Key Management
              </Label>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                <Input id="api-key" value={apiKey} readOnly className="flex-grow border-0 bg-transparent text-xs" />
                <Button variant="ghost" size="icon" onClick={handleRegenerateApiKey} title="Regenerate API Key">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Use this key for external API access (mock). Treat it like a password.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="experimental-analytics" className="text-base">Enable Experimental Analytics</Label>
                <p className="text-xs text-muted-foreground">Try out the new, unreleased analytics dashboard (mock).</p>
              </div>
              <Switch 
                id="experimental-analytics" 
                checked={experimentalAnalytics} 
                onCheckedChange={(checked) => {
                  setExperimentalAnalytics(checked);
                  handleSettingChange("Experimental Analytics", checked ? "Enabled" : "Disabled");
                }} 
              />
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

