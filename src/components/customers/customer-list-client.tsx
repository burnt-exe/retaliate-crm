
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
import { MoreHorizontal, Edit, Trash2, Filter, FileText, Activity, Brain } from "lucide-react";
import { mockCustomers, Customer, getAllUniqueCustomerTags } from "@/lib/mock-data";
import { CustomerFormDialog } from "./customer-form-dialog";
import { useToast } from "@/hooks/use-toast";

export function CustomerListClient() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All Tags");
  const { toast } = useToast();

  const allTags = useMemo(() => ["All Tags", ...getAllUniqueCustomerTags(customers)], [customers]);

  const handleSaveCustomer = (customer: Customer) => {
    setCustomers(prevCustomers => {
      const existingIndex = prevCustomers.findIndex(c => c.id === customer.id);
      if (existingIndex > -1) {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingIndex] = customer;
        return updatedCustomers;
      }
      return [customer, ...prevCustomers];
    });
    toast({ title: customer.id.startsWith('cust-') && customer.id !== `cust-${Date.now()}` ? "Customer Updated" : "Customer Added", description: `${customer.name} details have been saved.` });
  };

  const handleDeleteCustomer = (customerId: string, customerName: string) => {
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== customerId));
    toast({ title: "Customer Deleted", description: `${customerName} has been removed.`, variant: "destructive" });
  };

  const handleLogInteraction = (customerName: string) => {
    toast({ title: "Log Interaction (Mock)", description: `An interaction log for ${customerName} would be created here.` });
  };

  const handleViewDetails = (customerName: string) => {
     toast({ title: "View Details (Mock)", description: `A detailed view for ${customerName} would open here.` });
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
                      <DropdownMenuItem onClick={() => handleViewDetails(customer.name)}>
                        <FileText className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLogInteraction(customer.name)}>
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
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {filteredCustomers.length > 0 && (
         <p className="text-xs text-muted-foreground">Showing {filteredCustomers.length} of {customers.length} customers.</p>
      )}
    </div>
  );
}
