
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, MessageSquare, MessageCircle, Mail as MailIcon, BookOpen, ListChecks, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { AiSupportAssistant } from "@/components/support/ai-support-assistant";


const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. If you are already logged in, you can change your password in the Account settings.",
  },
  {
    question: "Where can I find my billing information?",
    answer: "Billing information and subscription details can be found under the 'Account' > 'Subscription' section (Note: Subscription section not yet implemented in this demo).",
  },
  {
    question: "How do I integrate with Microsoft Teams?",
    answer: "Navigate to the 'Microsoft Teams' section from the sidebar. You will find options to connect and configure your Teams integration.",
  },
  {
    question: "Is there a limit to how many private leads I can add?",
    answer: "For the demo version, lead storage is managed in client-side state and is effectively limited by browser performance. In a production environment, this would be based on your subscription plan.",
  },
];

const howToGuides = [
    { title: "Getting Started with Retaliate CRM", href: "#"},
    { title: "Managing Your Customer List", href: "#"},
    { title: "Using the AI Engagement Analyzer", href: "#"},
    { title: "Connecting Cloud Storage Services", href: "#"},
];

export default function SupportPage() {
  const { toast } = useToast();

  const handleSupportAction = (action: string) => {
    let description = `If this were a live app, the '${action}' process would begin now.`;
    if (action === "Teams Chat/Call" || action === "WhatsApp Chat/Call") {
      description += ` You can also reach us at +27 68 649 3591.`;
    } else {
      description += ` For critical issues, please use the contact methods provided.`;
    }
    toast({
      title: "Support Action (Mock)",
      description: description,
    });
  };

  return (
    <div className="container mx-auto py-2 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <LifeBuoy className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl font-bold font-headline">Support Center</h1>
            <p className="text-muted-foreground">Find help and resources for Retaliate CRM.</p>
        </div>
      </div>

      <AiSupportAssistant />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><HelpCircle className="mr-2 h-6 w-6 text-primary" /> Contact Human Support</CardTitle>
            <CardDescription>Reach out to our support team for direct assistance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => handleSupportAction("Teams Chat/Call")}>
              <MessageSquare className="mr-2 h-5 w-5" /> Chat/Call on Teams
            </Button>
            <Button className="w-full" onClick={() => handleSupportAction("WhatsApp Chat/Call")}>
              <MessageCircle className="mr-2 h-5 w-5" /> Chat/Call on WhatsApp
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@skunkworks.africa">
                <MailIcon className="mr-2 h-5 w-5" /> Email Support (support@skunkworks.africa)
              </a>
            </Button>
             <p className="text-xs text-muted-foreground text-center">
              Or call us directly at: <a href="tel:+27686493591" className="text-primary hover:underline">+27 68 649 3591</a>
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><BookOpen className="mr-2 h-6 w-6 text-primary" /> Knowledge Base</CardTitle>
            <CardDescription>Explore documentation, guides, and FAQs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center"><ListChecks className="mr-2 h-5 w-5 text-secondary" /> How-to Guides</h3>
              <ul className="space-y-2">
                {howToGuides.map(guide => (
                    <li key={guide.title}>
                        <Link
                          href={guide.href}
                          className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                           {guide.title}
                        </Link>
                    </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-2 flex items-center"><HelpCircle className="mr-2 h-5 w-5 text-secondary" /> Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
             <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><BookOpen className="mr-2 h-5 w-5 text-secondary" /> User Documentation</h3>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/documentation">View Full Documentation</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
