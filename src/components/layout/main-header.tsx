
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';
import { mainNavItems, secondaryNavItems } from "./sidebar-nav-items";

export function MainHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    const allNavItems = [...mainNavItems, ...secondaryNavItems];
    const currentNavItem = allNavItems.find(item => pathname.startsWith(item.href));
    if (currentNavItem) {
      return currentNavItem.label;
    }
    if (pathname === "/") return "Overview"; 
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      return segments[segments.length -1].charAt(0).toUpperCase() + segments[segments.length -1].slice(1);
    }
    return "Retaliate CRM";
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      {/* Removed md:hidden to make SidebarTrigger visible on desktop */}
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold font-headline">{getPageTitle()}</h1>
      </div>
      {/* UserNav removed as authentication is removed */}
    </header>
  );
}
