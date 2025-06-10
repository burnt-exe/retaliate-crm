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
import type { Customer } from "@/lib/mock-data";
import { PlusCircle, Edit } from "lucide-react";

interface CustomerFormDialogProps {
  customer?: Customer | null;
  onSave: (customer: Customer) => void;
  triggerButton?: React.ReactNode;
}

export function CustomerFormDialog({ customer, onSave, triggerButton }: CustomerFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [tags, setTags] = useState(""); // Comma-separated

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setCompany(customer.company);
      setTags(customer.tags.join(", "));
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setTags("");
    }
  }, [customer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrUpdatedCustomer: Customer = {
      id: customer?.id || `cust-${Date.now()}`,
      name,
      email,
      phone,
      company,
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
      lastContact: customer?.lastContact || new Date().toISOString().split("T")[0],
    };
    onSave(newOrUpdatedCustomer);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton ? triggerButton : (
            customer ? (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            ) : (
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
                </Button>
            )
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {customer ? "Update the customer's details." : "Fill in the details for the new customer."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">Company</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">Tags</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="col-span-3" placeholder="e.g. Lead, Enterprise"/>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">{customer ? "Save Changes" : "Create Customer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
