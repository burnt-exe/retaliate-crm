
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import ShadCN Input
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { technicalSupportAgent, type TechnicalSupportOutput } from "@/ai/flows/technical-support-agent";
import { Loader2, MessageCircleQuestion, Sparkles, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userQuery: z.string().min(10, "Please describe your issue in at least 10 characters.").max(1000, "Query is too long."),
  userName: z.string().optional(),
  userEmail: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal("")), // Allow empty string
});

type FormData = z.infer<typeof formSchema>;

export function AiSupportAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<TechnicalSupportOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userQuery: "",
      userName: "",
      userEmail: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const result = await technicalSupportAgent({
        ...data,
        userEmail: data.userEmail === "" ? undefined : data.userEmail, // Pass undefined if empty
      });
      setAiResponse(result);
      toast({
        title: "AI Assistant Responded",
        description: "Please see the suggestions below.",
      });
    } catch (error) {
      console.error("Error with AI Support Assistant:", error);
      toast({
        title: "AI Assistant Error",
        description: "Could not get a response from the AI assistant. Please try again or use another support channel.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.01]">
      <CardHeader>
        <div className="flex items-center gap-3">
            <MessageCircleQuestion className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-xl">AI Quick Assist</CardTitle>
                <CardDescription>
                Describe your issue below to get instant help from our AI assistant.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userQuery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question / Issue Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I can't log in to my account, How do I add a new customer?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email (Optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Help
            </Button>
          </form>
        </Form>
      </CardContent>

      {isLoading && (
        <CardFooter className="flex flex-col items-center justify-center border-t pt-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground">AI Assistant is thinking...</p>
        </CardFooter>
      )}

      {aiResponse && !isLoading && (
        <CardFooter className="flex-col items-start space-y-4 border-t pt-6">
          <div>
            <Label className="text-base font-semibold text-primary flex items-center">
                <Sparkles className="mr-2 h-5 w-5"/> AI Assistant's Response:
            </Label>
            <p className="text-foreground mt-1 p-3 bg-muted rounded-md text-sm">{aiResponse.initialResponse}</p>
          </div>

          {aiResponse.suggestedSteps && aiResponse.suggestedSteps.length > 0 && (
            <div>
              <Label className="text-sm font-semibold">Suggested Troubleshooting Steps:</Label>
              <ul className="list-decimal list-inside mt-1 space-y-1 p-3 bg-muted/50 rounded-md text-sm">
                {aiResponse.suggestedSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={`p-3 rounded-md text-sm w-full ${aiResponse.escalationNeeded ? 'bg-destructive/10 border border-destructive/20 text-destructive-foreground' : 'bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300'}`}>
             {aiResponse.escalationNeeded && <AlertTriangle className="inline-block mr-2 h-5 w-5 mb-0.5" />}
            <p className="font-medium">{aiResponse.furtherAssistanceMessage}</p>
            {aiResponse.escalationNeeded && aiResponse.ticketId && (
              <p className="text-xs mt-1">Mock Ticket ID: <span className="font-mono">{aiResponse.ticketId}</span></p>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
