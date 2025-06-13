
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Edit, Trash2, Filter, FileText, Activity, Brain, Users } from "lucide-react";
import { mockCustomers, Customer, getAllUniqueCustomerTags } from "@/lib/mock-data";
import { CustomerFormDialog } from "./customer-form-dialog";
import { useToast } from "@/hooks/use-toast";
import { CustomerDetailsDialog } from "./customer-details-dialog";
import { LogInteractionDialog } from "./log-interaction-dialog";

export interface InteractionData {
  interactionType: string;
  interactionDate: Date;
  interactionNotes: string;
}

export function CustomerListClient() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All Tags");
  const { toast } = useToast();

  const [selectedCustomerForDetails, setSelectedCustomerForDetails] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedCustomerForLog, setSelectedCustomerForLog] = useState<Customer | null>(null);
  const [isLogInteractionDialogOpen, setIsLogInteractionDialogOpen] = useState(false);


  const allTags = useMemo(() => ["All Tags", ...getAllUniqueCustomerTags(customers)], [customers]);

  const handleSaveCustomer = (customer: Customer) => {
    setCustomers(prevCustomers => {
      const existingIndex = prevCustomers.findIndex(c => c.id === customer.id);
      if (existingIndex > -1) {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingIndex] = customer;
        toast({ title: "Customer Updated", description: `${customer.name} details have been saved.` });
        return updatedCustomers;
      }
      toast({ title: "Customer Added", description: `${customer.name} has been added.` });
      return [customer, ...prevCustomers];
    });
  };

  const handleDeleteCustomer = (customerId: string, customerName: string) => {
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== customerId));
    toast({ title: "Customer Deleted", description: `${customerName} has been removed.`, variant: "destructive" });
  };

  const handleOpenDetailsDialog = (customer: Customer) => {
    setSelectedCustomerForDetails(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleOpenLogInteractionDialog = (customer: Customer) => {
    setSelectedCustomerForLog(customer);
    setIsLogInteractionDialogOpen(true);
  };

  const handleSaveInteraction = (data: InteractionData) => {
    toast({
      title: "Interaction Logged (Mock)",
      description: `${data.interactionType} with ${selectedCustomerForLog?.name} on ${format(data.interactionDate, "PPP")} has been logged. Notes: "${data.interactionNotes.substring(0,30)}..."`,
    });
    setIsLogInteractionDialogOpen(false);
  };


  const filteredCustomers = customers.filter(customer => {
    const matchesSearchTerm =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.notes && customer.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = selectedTag === "All Tags" || customer.tags.includes(selectedTag);

    return matchesSearchTerm && matchesTag;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto sm:min-w-[250px]">
            <Input
              type="search"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CustomerFormDialog onSave={handleSaveCustomer} />
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden lg:table-cell">Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Last Contact</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{customer.phone}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell className="hidden md:table-cell">{format(new Date(customer.lastContact), 'PPP')}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {customer.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs whitespace-nowrap">{tag}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Customer Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <CustomerFormDialog
                        customer={customer}
                        onSave={handleSaveCustomer}
                        triggerButton={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuItem onClick={() => handleOpenDetailsDialog(customer)}>
                        <FileText className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenLogInteractionDialog(customer)}>
                        <Activity className="mr-2 h-4 w-4" /> Log Interaction
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="/ai-analyzer"> {/* Can be enhanced to pass customer data */}
                          <Brain className="mr-2 h-4 w-4" /> Analyze Engagement
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteCustomer(customer.id, customer.name)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="w-10 h-10 mb-2" />
                    No customers found.
                    {searchTerm && <span className="text-xs">Try adjusting your search or filters.</span>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {filteredCustomers.length > 0 && (
         <p className="text-xs text-muted-foreground">Showing {filteredCustomers.length} of {customers.length} customers.</p>
      )}

      {selectedCustomerForDetails && (
        <CustomerDetailsDialog
          customer={selectedCustomerForDetails}
          isOpen={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        />
      )}
      {selectedCustomerForLog && (
        <LogInteractionDialog
          customer={selectedCustomerForLog}
          isOpen={isLogInteractionDialogOpen}
          onOpenChange={setIsLogInteractionDialogOpen}
          onSave={handleSaveInteraction}
        />
      )}
    </div>
  );
}

