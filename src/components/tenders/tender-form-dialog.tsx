
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tender, TenderStatus } from "@/lib/mock-data";
import { mockTenders, tenderStatuses } from "@/lib/mock-data"; // Corrected import
import { PlusCircle, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TenderFormDialogProps {
  tender?: Tender | null;
  onSave: (tender: Tender) => void;
  triggerButton?: React.ReactNode;
}

export function TenderFormDialog({ tender, onSave, triggerButton }: TenderFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [reference, setReference] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<TenderStatus>("New Alert");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState("USD");
  const [assignedTo, setAssignedTo] = useState("");


  useEffect(() => {
    if (isOpen) {
      if (tender) {
        setTitle(tender.title);
        setIssuer(tender.issuer);
        setReference(tender.reference || "");
        setDeadline(tender.deadline ? new Date(tender.deadline) : new Date());
        setStatus(tender.status);
        setDescription(tender.description);
        setValue(tender.value);
        setCurrency(tender.currency || "USD");
        setAssignedTo(tender.assignedTo || "");
      } else {
        setTitle("");
        setIssuer("");
        setReference("");
        setDeadline(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default to one week from now
        setStatus("New Alert");
        setDescription("");
        setValue(undefined);
        setCurrency("USD");
        setAssignedTo("");
      }
    }
  }, [tender, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !issuer || !deadline) {
        toast({ title: "Missing Fields", description: "Title, Issuer, and Deadline are required.", variant: "destructive"});
        return;
    }
    const newOrUpdatedTender: Tender = {
      id: tender?.id || `tender-${Date.now()}`,
      title,
      issuer,
      reference: reference || undefined,
      deadline: deadline.toISOString().split("T")[0],
      status,
      description,
      value: value || undefined,
      currency: value ? currency : undefined,
      assignedTo: assignedTo || undefined,
      lastUpdated: new Date().toISOString(),
      submissionDate: tender?.submissionDate // Preserve existing submission date if editing
    };
    onSave(newOrUpdatedTender);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton ? triggerButton : (
            tender ? (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit Tender</span>
                </Button>
            ) : (
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Tender Alert
                </Button>
            )
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tender ? "Edit Tender" : "Add New Tender Alert"}</DialogTitle>
          <DialogDescription>
            {tender ? "Update the tender's details." : "Fill in the details for the new tender or RFQ."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-3">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="issuer">Issuer</Label>
              <Input id="issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reference">Reference / ID</Label>
              <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="deadline">Deadline</Label>
              <DatePicker date={deadline} onDateChange={setDeadline} className="w-full" />
            </div>
             <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(val) => setStatus(val as TenderStatus)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {tenderStatuses.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="value">Estimated Value (Optional)</Label>
                    <Input id="value" type="number" value={value === undefined ? "" : value} onChange={(e) => setValue(e.target.value === "" ? undefined : parseFloat(e.target.value))} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="e.g. USD, EUR" />
                </div>
            </div>
             <div className="space-y-1">
              <Label htmlFor="assignedTo">Assigned To (Optional)</Label>
              <Input id="assignedTo" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="e.g. Sales Team, Jane Doe"/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Description / Notes</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="min-h-[100px]" 
                placeholder="Key details, requirements, scope..."
                required
              />
            </div>
          </div>
          <DialogFooter className="pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">{tender ? "Save Changes" : "Create Tender Alert"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
