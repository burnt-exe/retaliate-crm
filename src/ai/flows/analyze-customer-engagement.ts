'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing customer engagement and suggesting optimal interaction strategies.
 *
 * - analyzeCustomerEngagement - Analyzes customer interactions and suggests the optimal tone and content for future engagement.
 * - AnalyzeCustomerEngagementInput - The input type for the analyzeCustomerEngagement function.
 * - AnalyzeCustomerEngagementOutput - The return type for the analyzeCustomerEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCustomerEngagementInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  interactionHistory: z
    .string()
    .describe('A detailed history of interactions with the customer.'),
  currentGoal: z
    .string()
    .describe('The current goal of the interaction with the customer.'),
});

export type AnalyzeCustomerEngagementInput = z.infer<
  typeof AnalyzeCustomerEngagementInputSchema
>;

const AnalyzeCustomerEngagementOutputSchema = z.object({
  suggestedTone: z
    .string()
    .describe('The suggested tone for the next interaction (e.g., formal, friendly, urgent).'),
  suggestedContent: z
    .string()
    .describe('Suggested content points or topics to cover in the next interaction.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested tone and content.'),
});

export type AnalyzeCustomerEngagementOutput = z.infer<
  typeof AnalyzeCustomerEngagementOutputSchema
>;

export async function analyzeCustomerEngagement(
  input: AnalyzeCustomerEngagementInput
): Promise<AnalyzeCustomerEngagementOutput> {
  return analyzeCustomerEngagementFlow(input);
}

const analyzeCustomerEngagementPrompt = ai.definePrompt({
  name: 'analyzeCustomerEngagementPrompt',
  input: {schema: AnalyzeCustomerEngagementInputSchema},
  output: {schema: AnalyzeCustomerEngagementOutputSchema},
  prompt: `You are an AI-powered sales engagement analyst. Your task is to analyze past customer interactions and suggest the optimal tone and content for the next interaction to improve engagement and close deals.

  Customer Name: {{customerName}}
  Interaction History: {{interactionHistory}}
  Current Goal: {{currentGoal}}

  Based on this information, suggest the most appropriate tone and content for the next interaction. Explain your reasoning.

  {{output}}
  `,
});

const analyzeCustomerEngagementFlow = ai.defineFlow(
  {
    name: 'analyzeCustomerEngagementFlow',
    inputSchema: AnalyzeCustomerEngagementInputSchema,
    outputSchema: AnalyzeCustomerEngagementOutputSchema,
  },
  async input => {
    const {output} = await analyzeCustomerEngagementPrompt(input);
    return output!;
  }
);
