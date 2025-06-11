
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground animate-subtle-gradient">
      <PublicNavbar />

      <main className="flex-grow flex items-center justify-center text-center px-4 py-16 md:py-24 animate-in fade-in-0 slide-in-from-top-12 duration-1000">
        <div className="max-w-3xl">
          <Logo 
            className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-8 text-primary animate-in fade-in-0 zoom-in-50 delay-300 duration-700" 
            sizes="(max-width: 767px) 64px, 80px" 
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight animate-in fade-in-0 slide-in-from-top-10 delay-200 duration-700">
            Welcome to <span className="text-primary">Retaliate CRM</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-in fade-in-0 slide-in-from-top-8 delay-400 duration-700">
            Streamline your customer relationships with an elegant and powerful platform.
            Access all features instantly, completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in-0 slide-in-from-bottom-10 delay-500 duration-700">
            <Button size="lg" asChild className="shadow-lg hover:shadow-primary/30 transition-shadow px-10 py-3 text-lg">
              <Link href="/dashboard">
                Access The App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
