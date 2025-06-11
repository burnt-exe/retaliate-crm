
import { LayoutDashboard, Users, Plug, Brain, Settings, LifeBuoy, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  segment?: string | null;
};

export const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, segment: "dashboard" },
  { href: "/customers", label: "Customers", icon: Users, segment: "customers" },
  { href: "/integrations", label: "Integrations", icon: Plug, segment: "integrations" },
  { href: "/ai-analyzer", label: "AI Analyzer", icon: Brain, segment: "ai-analyzer" },
  { href: "/teams", label: "Microsoft Teams", icon: MessageSquare, segment: "teams" },
];

export const secondaryNavItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings, segment: "settings" },
  { href: "/support", label: "Support", icon: LifeBuoy, segment: "support" },
];
