"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket, Info, ShieldCheck } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features", icon: Rocket },
  { href: "#solutions", label: "Solutions", icon: ShieldCheck },
  { href: "#about", label: "About Us", icon: Info },
];

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="h-8 w-8" sizes="32px"/>
          <span className="font-bold sm:inline-block font-headline text-lg">
            Retaliate CRM
          </span>
        </Link>
        <nav className="hidden flex-1 items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/dashboard">Go to App</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                   <Link href="/" className="flex items-center space-x-2">
                      <Logo className="h-8 w-8" sizes="32px"/>
                      <span className="font-bold font-headline text-lg">Retaliate CRM</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 p-6 flex-grow">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 rounded-lg p-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="p-6 border-t">
                    <Button asChild className="w-full">
                        <Link href="/dashboard">Go to App</Link>
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
