
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers } from "lucide-react"; // Added Layers icon
import { Logo } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground animate-subtle-gradient">
      <PublicNavbar />

      <main className="flex-grow flex items-center justify-center text-center px-4 py-16 md:py-24 animate-in fade-in-0 slide-in-from-top-12 duration-1000">
        <div className="max-w-3xl">
          <Logo 
            className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-8 text-primary animate-in fade-in-0 zoom-in-50 delay-300 duration-700" 
            sizes="(max-width: 767px) 80px, 96px" 
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight animate-in fade-in-0 slide-in-from-top-10 delay-200 duration-700">
            Welcome
            <br />
            to
            <br />
            <span className="text-primary">Retaliate CRM</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in-0 slide-in-from-top-8 delay-400 duration-700">
            Streamline your customer relationships with an elegant and powerful platform.<br />Access all features instantly, completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in-0 slide-in-from-bottom-10 delay-500 duration-700">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow text-lg">
              <Link href="/dashboard">
                Access The App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-accent/20 transition-shadow text-lg">
              <Link href="/integrations">
                Explore Integrations
                <Layers className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
