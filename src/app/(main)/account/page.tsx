
"use client";

import { UserProfileCard } from "@/components/account/user-profile-card";
import { SocialLinksCard } from "@/components/account/social-links-card";
import { LeadManagementCard } from "@/components/account/lead-management-card";
import { PerformanceOverviewCard } from "@/components/account/performance-overview-card";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-2 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile, leads, and performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <UserProfileCard />
          <SocialLinksCard />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <LeadManagementCard />
          <PerformanceOverviewCard />
        </div>
      </div>
    </div>
  );
}
