
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Image as ImageIcon, PlusCircle, Trash2 } from "lucide-react";

export function UserProfileCard() {
  const { toast } = useToast();
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo.user@example.com");
  const [phone, setPhone] = useState("555-123-4567");
  const [avatarUrl, setAvatarUrl] = useState("https://placehold.co/100x100.png?text=DU");
  const [secondaryEmails, setSecondaryEmails] = useState<string[]>([""]);

  const handleSaveChanges = () => {
    // In a real app, you'd save this to a backend
    console.log({ name, email, phone, avatarUrl, secondaryEmails: secondaryEmails.filter(e => e.trim() !== "") });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleAddSecondaryEmail = () => {
    setSecondaryEmails([...secondaryEmails, ""]);
  };

  const handleSecondaryEmailChange = (index: number, value: string) => {
    const updatedEmails = [...secondaryEmails];
    updatedEmails[index] = value;
    setSecondaryEmails(updatedEmails);
  };

  const handleRemoveSecondaryEmail = (index: number) => {
    setSecondaryEmails(secondaryEmails.filter((_, i) => i !== index));
  };
  
  const getInitials = (nameStr: string) => {
    return nameStr
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">User Profile</CardTitle>
        <CardDescription>Update your personal information and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl} alt={name} data-ai-hint="person avatar" />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-1">
            <Label htmlFor="avatarUrl">Profile Picture URL</Label>
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.png"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Primary Email</Label>
           <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="pl-10"/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" className="pl-10"/>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Secondary Emails</Label>
          {secondaryEmails.map((secEmail, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="email"
                value={secEmail}
                onChange={(e) => handleSecondaryEmailChange(index, e.target.value)}
                placeholder="secondary.email@example.com"
              />
              <Button variant="ghost" size="icon" onClick={() => handleRemoveSecondaryEmail(index)} disabled={secondaryEmails.length === 1 && secEmail === ""}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddSecondaryEmail} className="mt-2">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Secondary Email
          </Button>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
