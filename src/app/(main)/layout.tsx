
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { mainNavItems, secondaryNavItems, NavItem } from "@/components/layout/sidebar-nav-items";
import { MainHeader } from "@/components/layout/main-header";
import { LogOut, Loader2 } from "lucide-react";
import { Logo } from "@/components/icons";
import { useAuth } from "@/hooks/use-auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const isActive = (item: NavItem) => {
    if (item.href === "/dashboard" && pathname === "/") return true;
    return pathname.startsWith(item.href);
  };
  
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Logo className="h-8 w-8 text-sidebar-primary-foreground" sizes="32px" />
            <span className="font-semibold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden font-headline">Retaliate CRM</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-grow">
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive(item)}
                    tooltip={{ children: item.label, className: "bg-popover text-popover-foreground border" }}
                    className={cn(
                        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive(item) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-2">
           <SidebarMenu>
            {secondaryNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive(item)}
                    tooltip={{ children: item.label, className: "bg-popover text-popover-foreground border" }}
                     className={cn(
                        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive(item) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            {/* Logout functionality is now in UserNav */}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <MainHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
