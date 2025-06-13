
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Customer } from "@/lib/mock-data";
import { format } from 'date-fns';
import { User, Mail, Phone, BuildingIcon, CalendarDays, Tag, StickyNote, Info } from "lucide-react"; // Changed Building to BuildingIcon for clarity

interface CustomerDetailsDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function CustomerDetailsDialog({ customer, isOpen, onOpenChange }: CustomerDetailsDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <User className="mr-3 h-6 w-6 text-primary" />
            {customer.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information for {customer.company ? `${customer.company} (${customer.name})` : customer.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-3 text-sm">
          
          <div className="flex items-center">
            <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Email:</span>
            <span className="ml-2 text-foreground">{customer.email}</span>
          </div>

          <div className="flex items-center">
            <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Phone:</span>
            <span className="ml-2 text-foreground">{customer.phone || "N/A"}</span>
          </div>

          <div className="flex items-center">
            <BuildingIcon className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Company:</span>
            <span className="ml-2 text-foreground">{customer.company || "N/A"}</span>
          </div>

          <div className="flex items-center">
            <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Last Contact:</span>
            <span className="ml-2 text-foreground">{format(new Date(customer.lastContact), 'PPP')}</span>
          </div>
          
          <div className="flex items-start">
            <Tag className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
                <span className="font-medium text-foreground">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                {customer.tags.length > 0 ? customer.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                )) : <span className="text-muted-foreground italic">No tags</span>}
                </div>
            </div>
          </div>

          <div className="flex items-start">
            <StickyNote className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
             <div>
                <span className="font-medium text-foreground">Notes:</span>
                {customer.notes ? (
                    <p className="mt-1 text-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap">{customer.notes}</p>
                ) : (
                    <p className="mt-1 text-muted-foreground italic">No notes recorded.</p>
                )}
            </div>
          </div>

           <div className="flex items-start pt-3 border-t">
            <Info className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
             <div>
                <span className="font-medium text-foreground">Customer ID:</span>
                <p className="mt-1 text-muted-foreground text-xs font-mono">{customer.id}</p>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  );
}
