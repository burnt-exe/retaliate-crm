
import { LayoutDashboard, Users, Plug, Brain, Settings, LifeBuoy, MessageSquare, UserCircle, LibraryBig, Gavel, DollarSign } from "lucide-react";
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
  { href: "/tenders", label: "Tenders & RFQs", icon: Gavel, segment: "tenders" },
  { href: "/commissions", label: "Commissions", icon: DollarSign, segment: "commissions" },
  { href: "/integrations", label: "Integrations", icon: Plug, segment: "integrations" },
  { href: "/cloud-library", label: "Cloud Library", icon: LibraryBig, segment: "cloud-library" },
  { href: "/ai-analyzer", label: "AI Analyzer", icon: Brain, segment: "ai-analyzer" },
  { href: "/teams", label: "Microsoft Teams", icon: MessageSquare, segment: "teams" },
];

export const secondaryNavItems: NavItem[] = [
  { href: "/account", label: "Account", icon: UserCircle, segment: "account" },
  { href: "/settings", label: "Settings", icon: Settings, segment: "settings" },
  { href: "/support", label: "Support", icon: LifeBuoy, segment: "support" },
];
