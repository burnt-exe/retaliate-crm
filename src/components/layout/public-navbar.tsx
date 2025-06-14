
"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// Updated nav links
const navLinks = [
  { href: "/dashboard", label: "App Demo" },
  { href: "/about", label: "About" }, 
  { href: "/features", label: "Features" }, 
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-8 w-8 text-primary" sizes="32px"/>
          <span className="font-bold sm:inline-block font-headline text-lg text-primary">
            Retaliate CRM
          </span>
        </Link>
        <nav className="hidden flex-1 items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/dashboard">Access The App</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-primary text-primary hover:bg-primary/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-6 border-b border-border">
                   <Link href="/" className="flex items-center space-x-2">
                      <Logo className="h-8 w-8 text-primary" sizes="32px"/>
                      <SheetTitle className="font-bold font-headline text-lg text-primary">Retaliate CRM</SheetTitle>
                    </Link>
                </SheetHeader>
                <nav className="flex flex-col gap-4 p-6 flex-grow">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg p-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t border-border">
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/dashboard">Access The App</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
