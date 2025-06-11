
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Users, Trash2, Share2, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
}

const initialLeads: Lead[] = [
  { id: "lead-1", name: "Alpha Prospect", email: "alpha@example.com", company: "Alpha Inc.", status: "New" },
  { id: "lead-2", name: "Bravo Client", email: "bravo@example.com", company: "Bravo Co.", status: "Contacted" },
];

export function LeadManagementCard() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Partial<Lead>>({});
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);


  const handleSaveLead = () => {
    if (!currentLead.name || !currentLead.email) {
      toast({ title: "Missing Information", description: "Lead name and email are required.", variant: "destructive" });
      return;
    }

    if (editingLeadId) {
        setLeads(leads.map(lead => lead.id === editingLeadId ? {...lead, ...currentLead} as Lead : lead));
        toast({ title: "Lead Updated", description: `${currentLead.name} has been updated.`});
    } else {
        const newLead: Lead = {
            id: `lead-${Date.now()}`,
            name: currentLead.name,
            email: currentLead.email,
            company: currentLead.company || "",
            status: currentLead.status || "New",
        };
        setLeads([newLead, ...leads]);
        toast({ title: "Lead Added", description: `${newLead.name} has been added to your private leads.`});
    }
    
    setIsFormOpen(false);
    setCurrentLead({});
    setEditingLeadId(null);
  };
  
  const handleEditLead = (lead: Lead) => {
    setCurrentLead(lead);
    setEditingLeadId(lead.id);
    setIsFormOpen(true);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
    toast({ title: "Lead Deleted", description: "The lead has been removed."});
  };
  
  const handleShareLead = (leadName: string) => {
    toast({ title: "Share Lead (Mock)", description: `Sharing options for ${leadName} would appear here in a real app.`});
  };

  const getStatusBadgeVariant = (status: Lead["status"]) => {
    switch (status) {
      case "New": return "outline";
      case "Contacted": return "secondary";
      case "Qualified": return "default";
      case "Lost": return "destructive";
      default: return "default";
    }
  };


  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline text-xl">My Private Leads</CardTitle>
          <CardDescription>Manage your personal leads. Only visible to you unless shared.</CardDescription>
        </div>
        <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
            setIsFormOpen(isOpen);
            if (!isOpen) {
                setCurrentLead({});
                setEditingLeadId(null);
            }
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> {editingLeadId ? "Edit Lead" : "Add Lead"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLeadId ? "Edit Lead" : "Add New Lead"}</DialogTitle>
              <DialogDescription>
                {editingLeadId ? "Update the details for this lead." : "Enter the details for your new private lead."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="leadName">Lead Name</Label>
                <Input id="leadName" value={currentLead.name || ""} onChange={(e) => setCurrentLead({...currentLead, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="leadEmail">Email</Label>
                <Input id="leadEmail" type="email" value={currentLead.email || ""} onChange={(e) => setCurrentLead({...currentLead, email: e.target.value})} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="leadCompany">Company</Label>
                <Input id="leadCompany" value={currentLead.company || ""} onChange={(e) => setCurrentLead({...currentLead, company: e.target.value})} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="leadStatus">Status</Label>
                 <select
                    id="leadStatus"
                    value={currentLead.status || "New"}
                    onChange={(e) => setCurrentLead({...currentLead, status: e.target.value as Lead["status"]})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsFormOpen(false); setCurrentLead({}); setEditingLeadId(null);}}>Cancel</Button>
              <Button onClick={handleSaveLead}>{editingLeadId ? "Save Changes" : "Add Lead"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {leads.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell><Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge></TableCell>
                    <TableCell className="text-right space-x-1">
                       <Button variant="ghost" size="icon" onClick={() => handleEditLead(lead)} className="h-8 w-8">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleShareLead(lead.name)} className="h-8 w-8">
                        <Share2 className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteLead(lead.id)} className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Users className="mx-auto h-12 w-12 mb-4" />
            <p>You haven&apos;t added any private leads yet.</p>
            <p className="text-sm">Click &quot;Add Lead&quot; to get started.</p>
          </div>
        )}
      </CardContent>
       <CardFooter className="text-xs text-muted-foreground">
        These leads are private to your account. Click the share icon to (mock) share with colleagues.
      </CardFooter>
    </Card>
  );
}
