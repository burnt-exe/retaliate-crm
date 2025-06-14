
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Users, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Basic",
    icon: Users,
    monthlyPrice: 19,
    annualPrice: 15,
    annualBillingText: "per user/month, billed annually ($180/year)",
    description: "For individuals and small teams getting started with CRM.",
    features: [
      "Core CRM functionalities",
      "Up to 500 customer contacts",
      "Basic AI Engagement Analyzer access",
      "Standard Integrations (2)",
      "Email support",
    ],
    ctaText: "Get Started",
    ctaLink: "/dashboard", // Or a signup page
    highlight: false,
  },
  {
    name: "Standard",
    icon: Zap,
    monthlyPrice: 49,
    annualPrice: 39,
    annualBillingText: "per user/month, billed annually ($468/year)",
    description: "For growing businesses needing more power and integrations.",
    features: [
      "All Basic features",
      "Up to 5,000 customer contacts",
      "Full AI Engagement Analyzer",
      "Advanced Integrations (5)",
      "Microsoft Teams & Cloud Library Sync",
      "Priority email & chat support",
    ],
    ctaText: "Choose Standard",
    ctaLink: "/dashboard",
    highlight: true,
  },
  {
    name: "Enterprise",
    icon: ShieldCheck,
    monthlyPrice: null, // Custom
    annualPrice: null, // Custom
    annualBillingText: "Customized for your business needs",
    description: "Tailored solutions for large organizations with specific requirements.",
    features: [
      "All Standard features",
      "Unlimited customer contacts",
      "All available integrations",
      "Custom AI model tuning (mock)",
      "Dedicated account manager",
      "Premium 24/7 support & SLA",
    ],
    ctaText: "Contact Sales",
    ctaLink: "/support", // Or a contact form page
    highlight: false,
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
                tier.highlight ? "border-2 border-primary ring-2 ring-primary/20 scale-105" : ""
              }`}
            >
              {tier.highlight && (
                <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-t-md text-center">
                  Most Popular
                </div>
              )}
              <CardHeader className="items-center text-center">
                <tier.icon className={`h-12 w-12 mb-4 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                <CardDescription className="min-h-[40px]">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-6">
                <div className="text-center">
                  {tier.monthlyPrice !== null ? (
                    <>
                      <p className="text-4xl font-bold">
                        ${tier.monthlyPrice}<span className="text-sm font-normal text-muted-foreground">/user/mo</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Or ${tier.annualPrice}/user/mo billed annually
                      </p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold">Custom</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 min-h-[30px]">{tier.annualBillingText}</p>
                </div>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className={`w-full ${tier.highlight ? '' : 'bg-primary/80 hover:bg-primary/90'}`} size="lg">
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
                All plans come with a 14-day money-back guarantee.
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
