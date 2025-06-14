
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Users } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4 text-primary">Retaliate CRM Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Retaliate CRM can empower your business with its comprehensive suite of tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl">
                <Users className="mr-3 h-7 w-7 text-primary" />
                Customer Management
              </CardTitle>
              <CardDescription>
                Keep all your customer information organized and accessible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Detailed customer profiles and history.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Log interactions like calls, emails, and meetings.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Tag and segment customers for targeted campaigns.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl">
                <Zap className="mr-3 h-7 w-7 text-primary" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Leverage artificial intelligence to enhance your strategies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> AI Engagement Analyzer for optimal communication.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> AI Quick Assist for instant support queries.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> (Future) Predictive analytics for sales forecasting.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-2xl">
                <CheckCircle className="mr-3 h-7 w-7 text-primary" />
                Task & Integration Hub
              </CardTitle>
              <CardDescription>
                Streamline workflows and connect your favorite tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Visual task boards to manage projects and deadlines.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Seamless integrations with popular services.</p>
              <p className="flex items-start"><CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" /> Cloud library sync for centralized document access.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12 py-8 border-t">
            <h2 className="text-2xl font-semibold font-headline mb-4">And Much More!</h2>
            <p className="text-muted-foreground">
                Retaliate CRM is constantly evolving. Explore the demo to see these features in action.
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
