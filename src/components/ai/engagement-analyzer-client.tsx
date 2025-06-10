"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { analyzeCustomerEngagement, type AnalyzeCustomerEngagementOutput } from "@/ai/flows/analyze-customer-engagement";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  interactionHistory: z.string().min(10, "Interaction history must be at least 10 characters"),
  currentGoal: z.string().min(5, "Current goal must be at least 5 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function EngagementAnalyzerClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeCustomerEngagementOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      interactionHistory: "",
      currentGoal: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeCustomerEngagement(data);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Customer engagement suggestions are ready.",
      });
    } catch (error) {
      console.error("Error analyzing engagement:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze customer engagement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Analyze Customer Engagement</CardTitle>
          <CardDescription>
            Enter customer details and interaction history to get AI-powered suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interactionHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interaction History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe past calls, emails, meetings..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Goal for Next Interaction</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Schedule a demo, Close deal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Analyze Engagement
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">AI Suggestions</CardTitle>
          <CardDescription>
            Recommendations based on the provided customer data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Analyzing, please wait...</p>
            </div>
          )}
          {!isLoading && !analysisResult && (
             <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <Wand2 className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Submit the form to see AI-powered suggestions here.</p>
            </div>
          )}
          {analysisResult && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-semibold text-primary">Suggested Tone</Label>
                <p className="text-foreground mt-1 p-3 bg-muted rounded-md">{analysisResult.suggestedTone}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold text-primary">Suggested Content</Label>
                <p className="text-foreground mt-1 p-3 bg-muted rounded-md whitespace-pre-line">{analysisResult.suggestedContent}</p>
              </div>
              <div>
                <Label className="text-sm font-semibold text-primary">Reasoning</Label>
                <p className="text-muted-foreground mt-1 p-3 bg-muted/50 rounded-md whitespace-pre-line">{analysisResult.reasoning}</p>
              </div>
            </div>
          )}
        </CardContent>
         <CardFooter className="text-xs text-muted-foreground">
            Powered by Genkit AI
        </CardFooter>
      </Card>
    </div>
  );
}
