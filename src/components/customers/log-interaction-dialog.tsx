
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Customer } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Activity, CalendarDays, Edit3, MessageSquare, PhoneCall } from "lucide-react"; // Added more specific icons
import type { InteractionData } from "./customer-list-client";

interface LogInteractionDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: InteractionData) => void;
}

const interactionTypes = [
  { value: "Call", label: "Call", icon: PhoneCall },
  { value: "Email", label: "Email", icon: Mail },
  { value: "Meeting", label: "Meeting", icon: Users },
  { value: "Chat", label: "Chat", icon: MessageSquare },
  { value: "Note", label: "General Note", icon: Edit3 },
  { value: "Other", label: "Other", icon: Activity },
];


export function LogInteractionDialog({ customer, isOpen, onOpenChange, onSave }: LogInteractionDialogProps) {
  const [interactionType, setInteractionType] = useState<string>(interactionTypes[0].value);
  const [interactionDate, setInteractionDate] = useState<Date | undefined>(new Date());
  const [interactionNotes, setInteractionNotes] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setInteractionType(interactionTypes[0].value);
      setInteractionDate(new Date());
      setInteractionNotes("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactionDate) {
        toast({ title: "Date Missing", description: "Please select an interaction date.", variant: "destructive"});
        return;
    }
    if (!interactionNotes.trim()) {
        toast({ title: "Notes Missing", description: "Please add some notes for this interaction.", variant: "destructive"});
        return;
    }
    onSave({
      interactionType,
      interactionDate,
      interactionNotes,
    });
  };

  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
             <Activity className="mr-2 h-5 w-5 text-primary" />
            Log Interaction with {customer.name}
          </DialogTitle>
          <DialogDescription>Record details about your recent interaction.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-1">
              <Label htmlFor="interactionType">Interaction Type</Label>
              <Select value={interactionType} onValueChange={setInteractionType}>
                <SelectTrigger id="interactionType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {interactionTypes.map(type => {
                    const IconComponent = type.icon;
                    return (
                        <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                                <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                                {type.label}
                            </div>
                        </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
                <Label htmlFor="interactionDate" className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> Interaction Date
                </Label>
                <DatePicker 
                    date={interactionDate} 
                    onDateChange={setInteractionDate}
                    className="w-full"
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="interactionNotes">Notes</Label>
                <Textarea 
                    id="interactionNotes" 
                    value={interactionNotes} 
                    onChange={(e) => setInteractionNotes(e.target.value)} 
                    className="min-h-[120px]" 
                    placeholder={`Details about the ${interactionType.toLowerCase()}...`}
                    required
                />
            </div>
          </div>
          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Log Interaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Added for icon consistency, can be moved to a shared types file if needed
const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
