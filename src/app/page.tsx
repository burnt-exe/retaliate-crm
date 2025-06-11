
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Users, BarChart3, Target, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary mb-3" />,
    title: "Streamlined Workflow",
    description: "Automate tasks and manage your sales pipeline efficiently.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary mb-3" />,
    title: "360° Customer View",
    description: "Get a complete picture of every customer interaction and history.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary mb-3" />,
    title: "Actionable Insights",
    description: "Leverage analytics to make data-driven decisions.",
  },
];

const benefits = [
  "Boost sales productivity",
  "Enhance customer satisfaction",
  "Improve team collaboration",
  "Make data-driven decisions",
  "Scale your business effectively",
  "Centralize all customer data",
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:pr-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight">
                  Empower Your <span className="text-primary">Customer Relationships</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-10">
                  Retaliate CRM helps you streamline sales, marketing, and support with an intuitive and powerful platform. All completely free and accessible.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow px-8 py-3">
                    <Link href="/dashboard">
                      Access The App
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/30 transition-shadow px-8 py-3">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto md:min-h-[400px] rounded-xl overflow-hidden shadow-2xl">
                 <Image 
                    src="https://placehold.co/800x600.png" 
                    alt="CRM dashboard illustration"
                    fill
                    style={{objectFit: 'cover'}}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    data-ai-hint="modern dashboard"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Core Capabilities</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Discover the tools that will transform your customer interactions and drive growth.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center bg-card">
                  <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Unlock Your Business Potential</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Retaliate CRM isn't just software; it's a growth engine. We provide the features you need to succeed, all within an accessible and user-friendly platform.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-lg">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                 <Button size="lg" asChild className="mt-10 shadow-lg hover:shadow-primary/30 transition-shadow">
                    <Link href="/dashboard">Get Started For Free</Link>
                  </Button>
              </div>
              <div className="relative h-80 md:h-auto md:min-h-[450px] rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://placehold.co/800x600.png" 
                  alt="Team collaborating with Retaliate CRM"
                  fill
                  style={{objectFit: 'cover'}}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  data-ai-hint="team collaboration"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Target className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
              Ready to Elevate Your Customer Management?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Access all features instantly, no credit card required. Streamline your workflow today.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-shadow">
              <Link href="/dashboard">Access Retaliate CRM Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
