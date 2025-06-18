
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Tender, TenderStatus } from "@/lib/mock-data";
import { format, parseISO } from 'date-fns';
import { Gavel, Building, CalendarClock, Info, FileText, UserCircle, DollarSign, CalendarCheck, Clock } from "lucide-react";

interface TenderDetailsDialogProps {
  tender: Tender | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function TenderDetailsDialog({ tender, isOpen, onOpenChange }: TenderDetailsDialogProps) {
  if (!tender) return null;

  const getStatusBadgeVariant = (status: TenderStatus) => {
    switch (status) {
      case "New Alert": return "default";
      case "Processing": return "secondary";
      case "Response Submitted": return "outline";
      case "Awarded": return "default"; 
      case "Lost": return "destructive";
      case "Archived": return "outline";
      default: return "default";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Gavel className="mr-3 h-6 w-6 text-primary" />
            {tender.title}
          </DialogTitle>
          <DialogDescription>
            Detailed information for tender: {tender.reference || tender.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-3 text-sm">
          
          <div className="flex items-center">
            <Building className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Issuer:</span>
            <span className="ml-2 text-foreground">{tender.issuer}</span>
          </div>

          {tender.reference && (
            <div className="flex items-center">
                <Info className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Reference ID:</span>
                <span className="ml-2 text-foreground">{tender.reference}</span>
            </div>
          )}

          <div className="flex items-center">
            <CalendarClock className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Deadline:</span>
            <span className="ml-2 text-foreground">{format(parseISO(tender.deadline), 'PPPp')}</span>
          </div>
          
          <div className="flex items-center">
            <Info className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Status:</span>
            <Badge variant={getStatusBadgeVariant(tender.status)} className="ml-2">{tender.status}</Badge>
          </div>

          {tender.value && (
             <div className="flex items-center">
                <DollarSign className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Estimated Value:</span>
                <span className="ml-2 text-foreground">{tender.value.toLocaleString()} {tender.currency}</span>
            </div>
          )}

          {tender.assignedTo && (
            <div className="flex items-center">
                <UserCircle className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Assigned To:</span>
                <span className="ml-2 text-foreground">{tender.assignedTo}</span>
            </div>
          )}
          
          {tender.submissionDate && (
            <div className="flex items-center">
                <CalendarCheck className="mr-3 h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">Submission Date:</span>
                <span className="ml-2 text-foreground">{format(parseISO(tender.submissionDate), 'PPP')}</span>
            </div>
          )}


          <div className="flex items-start">
            <FileText className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
             <div>
                <span className="font-medium text-foreground">Description / Notes:</span>
                <p className="mt-1 text-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap">{tender.description || "No description provided."}</p>
            </div>
          </div>

           <div className="flex items-start pt-3 border-t">
            <Clock className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
             <div>
                <span className="font-medium text-foreground">Last Updated:</span>
                <p className="mt-1 text-muted-foreground">{format(parseISO(tender.lastUpdated), 'PPPp')}</p>
            </div>
          </div>
           <div className="flex items-start pt-1">
            <Info className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
             <div>
                <span className="font-medium text-foreground">Internal ID:</span>
                <p className="mt-1 text-muted-foreground text-xs font-mono">{tender.id}</p>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
