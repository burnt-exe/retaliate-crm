
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Users, ShieldCheck, Star, Layers, Award } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PricingTier {
  name: string;
  icon: LucideIcon;
  priceDisplay: string;
  priceSuffix: string;
  annualSummary?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlight?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    icon: Star,
    priceDisplay: "$0",
    priceSuffix: "free forever",
    annualSummary: "Up to 2 seats",
    description: "For individuals looking to keep track of their work.",
    features: [
      "Free includes:",
      "Up to 3 boards",
      "Basic CRM functionalities",
      "Limited AI Engagement Analyzer access",
    ],
    ctaText: "Try for free",
    ctaLink: "/dashboard",
  },
  {
    name: "Basic",
    icon: Users,
    priceDisplay: "$9",
    priceSuffix: "seat / month",
    annualSummary: "Total $90 / month Billed annually",
    description: "Manage all your team's work in one place.",
    features: [
      "Includes free, plus:",
      "Unlimited free viewers",
      "Up to 500 customer contacts",
      "Standard Integrations (2)",
      "Email support",
    ],
    ctaText: "Try for free",
    ctaLink: "/dashboard",
  },
  {
    name: "Standard",
    icon: Zap,
    priceDisplay: "$12",
    priceSuffix: "seat / month",
    annualSummary: "Total $120 / month Billed annually",
    description: "Collaborate & optimize your work across teams.",
    features: [
      "Includes basic, plus:",
      "Timeline & Gantt views",
      "Up to 5,000 customer contacts",
      "Advanced Integrations (5)",
      "Microsoft Teams & Cloud Library Sync",
    ],
    ctaText: "Try for free",
    ctaLink: "/dashboard",
  },
  {
    name: "Pro",
    icon: Award,
    priceDisplay: "$19",
    priceSuffix: "seat / month",
    annualSummary: "Total $190 / month Billed annually",
    description: "Streamline complex workflows at scale.",
    features: [
      "Includes standard, plus:",
      "Private boards",
      "Full AI Engagement Analyzer",
      "Priority email & chat support",
    ],
    ctaText: "Try for free",
    ctaLink: "/dashboard",
    highlight: true,
  },
  {
    name: "Enterprise",
    icon: Layers, // Changed from ShieldCheck to Layers
    priceDisplay: "Custom",
    priceSuffix: "",
    annualSummary: "Get exclusive features for your organization",
    description: "Tailored solutions for large organizations with specific requirements.",
    features: [
      "Includes pro, plus:",
      "Enterprise-scale automations & workflows",
      "Unlimited customer contacts",
      "All available integrations",
      "Custom AI model tuning (mock)",
      "Dedicated account manager & SLA",
    ],
    ctaText: "Get a quote",
    ctaLink: "/support",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            Find the Right Plan for Your Business
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Affordable, transparent pricing to help you grow. Choose a plan that scales with your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                tier.highlight ? "border-2 border-primary ring-2 ring-primary/20 lg:scale-105" : ""
              }`}
            >
              {tier.highlight && (
                <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-t-md text-center">
                  Most Popular
                </div>
              )}
              <CardHeader className="items-center text-center">
                <tier.icon className={`h-10 w-10 mb-3 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 pt-0">
                <div className="text-center min-h-[100px]">
                  <p className="text-4xl font-bold">
                    {tier.priceDisplay}
                    {tier.priceSuffix && <span className="text-sm font-normal text-muted-foreground ml-1">{tier.priceSuffix}</span>}
                  </p>
                  {tier.annualSummary && <p className="text-xs text-muted-foreground mt-1">{tier.annualSummary}</p>}
                </div>
                <div className="text-center text-sm text-muted-foreground min-h-[60px] mb-4">
                  {tier.description}
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, index) => (
                    <li key={index} className={`flex items-start ${feature.startsWith("Includes") ? "mt-3" : ""}`}>
                      {!feature.startsWith("Includes") && (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.startsWith("Includes") ? "font-semibold text-foreground text-sm" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-5 border-t">
                <Button 
                  asChild 
                  className={`w-full ${tier.highlight ? '' : 'bg-primary/90 hover:bg-primary'}`} 
                  variant={tier.highlight ? 'default' : 'secondary'}
                  size="lg"
                >
                  <Link href={tier.ctaLink}>{tier.ctaText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16 py-8 border-t">
            <h2 className="text-2xl font-semibold font-headline mb-4">Need help choosing a plan?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Our team is ready to assist you in finding the perfect CRM solution for your needs.
                <br />
                All paid plans come with a 14-day money-back guarantee.
            </p>
            <Button variant="outline" size="lg" asChild>
                <Link href="/support">
                    <Star className="mr-2 h-5 w-5" /> Contact Our Experts
                </Link>
            </Button>
        </div>

      </main>
      <Footer />
    </div>
  );
}
