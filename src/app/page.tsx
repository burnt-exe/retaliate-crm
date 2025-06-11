
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase } from "lucide-react"; // Using Briefcase as a generic business icon

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />

      <main className="flex-grow flex items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <Briefcase className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-8 text-primary" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight">
            Welcome to <span className="text-primary">Retaliate CRM</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Streamline your customer relationships with an elegant and powerful platform.
            Access all features instantly, completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow px-10 py-3 text-lg">
              <Link href="/dashboard">
                Access The App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {/* You can add a secondary button here if needed, e.g., to a features page or contact */}
            {/* 
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-accent/30 transition-shadow px-10 py-3 text-lg border-primary text-primary hover:bg-primary/10">
              <Link href="#learn-more">Learn More</Link>
            </Button>
            */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
