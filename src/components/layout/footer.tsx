
import Link from "next/link";
import { Logo } from "@/components/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="h-7 w-7 text-primary" sizes="28px" />
            <span className="font-semibold text-md font-headline text-primary">Retaliate CRM</span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Retaliate CRM. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
