
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Linkedin, Twitter, Github, Link as LinkIcon } from "lucide-react"; // Assuming 'Twitter' is X

export function SocialLinksCard() {
  const { toast } = useToast();
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  const handleSaveChanges = () => {
    // In a real app, save to backend
    console.log({ linkedin, twitter, github, website });
    toast({
      title: "Social Links Updated",
      description: "Your social media links have been saved.",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Social Media Links</CardTitle>
        <CardDescription>Connect your social profiles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
           <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" className="pl-10"/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter (X) Profile URL</Label>
          <div className="relative">
            <Twitter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://x.com/yourprofile" className="pl-10"/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile URL</Label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="github" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/yourusername" className="pl-10"/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Personal Website/Portfolio</Label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" className="pl-10"/>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} className="w-full">Save Social Links</Button>
      </CardFooter>
    </Card>
  );
}
