import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Users, BarChart3, Target } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: "Streamlined Workflow",
    description: "Automate repetitive tasks and manage your sales pipeline efficiently, from lead to close.",
    imgSrc: "https://placehold.co/600x400.png",
    imgAlt: "Workflow illustration",
    imgHint: "abstract workflow",
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "360° Customer View",
    description: "Get a complete picture of every customer interaction, history, and preference in one place.",
    imgSrc: "https://placehold.co/600x400.png",
    imgAlt: "Customer profile interface",
    imgHint: "profile interface",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary mb-4" />,
    title: "Actionable Insights",
    description: "Leverage powerful analytics and reporting to make data-driven decisions and track performance.",
    imgSrc: "https://placehold.co/600x400.png",
    imgAlt: "Analytics dashboard",
    imgHint: "dashboard chart",
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
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6">
              Empower Your <span className="text-primary">Customer Relationships</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Retaliate CRM helps you streamline sales, marketing, and support with an intuitive and powerful platform. All completely free and accessible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow">
                <Link href="/dashboard">Access The App</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/30 transition-shadow">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Why Choose Retaliate CRM?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Discover the tools that will transform your customer interactions and drive growth.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                  <CardContent className="mt-auto">
                     <Image 
                        src={feature.imgSrc} 
                        alt={feature.imgAlt} 
                        width={600} 
                        height={400} 
                        className="rounded-lg object-cover aspect-[3/2]" 
                        data-ai-hint={feature.imgHint}
                      />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-muted/50">
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
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                 <Button size="lg" asChild className="mt-10 shadow-lg hover:shadow-primary/30 transition-shadow">
                    <Link href="/dashboard">Get Started For Free</Link>
                  </Button>
              </div>
              <div>
                <Image 
                  src="https://placehold.co/800x600.png" 
                  alt="Team collaborating with Retaliate CRM" 
                  width={800} 
                  height={600} 
                  className="rounded-xl shadow-2xl"
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
              Join thousands of businesses already thriving with a smarter CRM. Access all features instantly, no credit card required.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-shadow">
              <Link href="/dashboard">Access Retaliate CRM Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
