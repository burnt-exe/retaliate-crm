
"use client";

import { useState, useMemo } from "react";
import { format, parseISO } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Edit, Trash2, Filter, FileText, Activity, Users, Send, FileEdit, BarChart3, PlusCircle, Eye } from "lucide-react";
import { mockTenders, Tender, TenderStatus, tenderStatuses as allStatuses } from "@/lib/mock-data";
import { TenderFormDialog } from "./tender-form-dialog";
import { useToast } from "@/hooks/use-toast";
import { TenderDetailsDialog } from "./tender-details-dialog";

export function TenderListClient() {
  const [tenders, setTenders] = useState<Tender[]>(mockTenders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All Statuses");
  const { toast } = useToast();

  const [selectedTenderForDetails, setSelectedTenderForDetails] = useState<Tender | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleSaveTender = (tender: Tender) => {
    setTenders(prevTenders => {
      const existingIndex = prevTenders.findIndex(t => t.id === tender.id);
      if (existingIndex > -1) {
        const updatedTenders = [...prevTenders];
        updatedTenders[existingIndex] = { ...tender, lastUpdated: new Date().toISOString() };
        toast({ title: "Tender Updated", description: `Tender "${tender.title}" has been saved.` });
        return updatedTenders;
      }
      toast({ title: "Tender Added", description: `Tender "${tender.title}" has been added.` });
      return [{ ...tender, lastUpdated: new Date().toISOString() }, ...prevTenders];
    });
  };

  const handleDeleteTender = (tenderId: string, tenderTitle: string) => {
    setTenders(prevTenders => prevTenders.filter(t => t.id !== tenderId));
    toast({ title: "Tender Deleted", description: `Tender "${tenderTitle}" has been removed.`, variant: "destructive" });
  };

  const handleOpenDetailsDialog = (tender: Tender) => {
    setSelectedTenderForDetails(tender);
    setIsDetailsDialogOpen(true);
  };
  
  const handleMockAction = (actionName: string, tenderTitle: string) => {
    toast({
      title: "Action Triggered (Mock)",
      description: `${actionName} for tender "${tenderTitle}" would be initiated here.`,
    });
  };

  const getStatusBadgeVariant = (status: TenderStatus) => {
    switch (status) {
      case "New Alert": return "default";
      case "Processing": return "secondary";
      case "Response Submitted": return "outline"; // Consider a specific color like blue if theme supports
      case "Awarded": return "default"; // Consider a specific color like green
      case "Lost": return "destructive";
      case "Archived": return "outline";
      default: return "default";
    }
  };


  const filteredTenders = tenders.filter(tender => {
    const matchesSearchTerm =
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tender.reference && tender.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tender.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatusFilter === "All Statuses" || tender.status === selectedStatusFilter;

    return matchesSearchTerm && matchesStatus;
  }).sort((a,b) => parseISO(b.lastUpdated).getTime() - parseISO(a.lastUpdated).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto sm:min-w-[250px]">
            <Input
              type="search"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Select value={selectedStatusFilter} onValueChange={setSelectedStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Statuses">All Statuses</SelectItem>
              {allStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TenderFormDialog onSave={handleSaveTender} />
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead className="hidden md:table-cell">Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenders.length > 0 ? filteredTenders.map((tender) => (
              <TableRow key={tender.id}>
                <TableCell className="font-medium">{tender.title}</TableCell>
                <TableCell>{tender.issuer}</TableCell>
                <TableCell className="hidden md:table-cell">{format(parseISO(tender.deadline), 'PPP')}</TableCell>
                <TableCell><Badge variant={getStatusBadgeVariant(tender.status)}>{tender.status}</Badge></TableCell>
                <TableCell className="hidden lg:table-cell">{format(parseISO(tender.lastUpdated), 'Pp')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Tender Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={() => handleOpenDetailsDialog(tender)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                       <TenderFormDialog
                        tender={tender}
                        onSave={handleSaveTender}
                        triggerButton={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Tender
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleMockAction("Prepare Response", tender.title)}>
                        <FileEdit className="mr-2 h-4 w-4" /> Prepare Response
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMockAction("Track Submission", tender.title)}>
                        <Send className="mr-2 h-4 w-4" /> Track Submission
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleMockAction("View Report", tender.title)}>
                        <BarChart3 className="mr-2 h-4 w-4" /> View Report
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteTender(tender.id, tender.title)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Tender
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="w-10 h-10 mb-2" />
                    No tenders found.
                    {searchTerm && <span className="text-xs">Try adjusting your search or filters.</span>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {filteredTenders.length > 0 && (
         <p className="text-xs text-muted-foreground">Showing {filteredTenders.length} of {tenders.length} tenders.</p>
      )}

      {selectedTenderForDetails && (
        <TenderDetailsDialog
          tender={selectedTenderForDetails}
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
    </div>
  );
}
