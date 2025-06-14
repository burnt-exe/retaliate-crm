
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Users, Goal } from "lucide-react";
import { Logo } from "@/components/icons";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <Logo 
            className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 text-primary" 
            sizes="(max-width: 767px) 64px, 80px" 
          />
          <h1 className="text-4xl font-bold font-headline mb-4 text-primary">About Retaliate CRM</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Retaliate CRM is a demonstration project showcasing a modern Customer Relationship Management application.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center font-headline">
                <Info className="mr-2 h-6 w-6 text-primary" /> Our Genesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This CRM was conceptualized as a portfolio piece by <span className="text-primary font-semibold">Skunkworks</span> for <span className="text-primary font-semibold">Cyber Retaliator Solutions</span> to demonstrate capabilities in building full-stack web applications with modern technologies. It embodies best practices in UI/UX, AI integration, and responsive design.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center font-headline">
                <Goal className="mr-2 h-6 w-6 text-primary" /> Our Mission (for this Demo)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide a tangible example of a feature-rich CRM platform, highlighting seamless user experience, powerful integrations (mocked), and the potential of AI in enhancing customer relationships and business workflows.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center font-headline">
                <Users className="mr-2 h-6 w-6 text-primary" /> Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                While this is a demo, it's built with features that would appeal to sales teams, customer support agents, and business managers looking for an intuitive and efficient way to manage their customer interactions and data.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-center">Technology Stack</CardTitle>
                <CardDescription className="text-center">
                Built with a modern, scalable, and developer-friendly technology stack.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">Next.js</span> (App Router)</li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">React</span></li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">TypeScript</span></li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">Tailwind CSS</span></li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">ShadCN UI</span></li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">Genkit</span> (for AI)</li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">Firebase</span> (App Hosting)</li>
                    <li className="p-3 bg-muted rounded-md"><span className="font-semibold">Lucide Icons</span></li>
                </ul>
            </CardContent>
        </Card>
        
        <div className="text-center mt-12 py-8 border-t">
            <p className="text-muted-foreground">
                Thank you for exploring Retaliate CRM. This project is for demonstration purposes only.
            </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
