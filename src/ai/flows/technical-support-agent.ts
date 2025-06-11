
'use server';
/**
 * @fileOverview A Genkit flow for providing initial AI-powered technical support.
 *
 * - technicalSupportAgent - Provides an initial response to a user's technical query.
 * - TechnicalSupportInput - The input type for the technicalSupportAgent function.
 * - TechnicalSupportOutput - The return type for the technicalSupportAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TechnicalSupportInputSchema = z.object({
  userQuery: z.string().min(10, "Query must be at least 10 characters.").describe('The user\'s description of their technical problem or question.'),
  userName: z.string().optional().describe('The name of the user making the query.'),
  userEmail: z.string().email().optional().describe('The email of the user for potential follow-up.'),
});
export type TechnicalSupportInput = z.infer<typeof TechnicalSupportInputSchema>;

const TechnicalSupportOutputSchema = z.object({
  initialResponse: z.string().describe('A friendly acknowledgment or initial diagnostic question related to the query.'),
  suggestedSteps: z.array(z.string()).describe('A list of 1-3 simple troubleshooting steps the user can try. If no specific steps apply, this can be an empty array or a general suggestion.'),
  escalationNeeded: z.boolean().describe('True if the AI determines the issue likely requires human intervention, false otherwise.'),
  ticketId: z.string().optional().describe('A mock ticket ID if escalation is suggested (e.g., "CRM-TS-12345").'),
  furtherAssistanceMessage: z.string().describe('A message guiding the user on what to do next, especially if escalation is needed or if the AI provided steps.')
});
export type TechnicalSupportOutput = z.infer<typeof TechnicalSupportOutputSchema>;

export async function technicalSupportAgent(
  input: TechnicalSupportInput
): Promise<TechnicalSupportOutput> {
  return technicalSupportAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'technicalSupportAgentPrompt',
  input: {schema: TechnicalSupportInputSchema},
  output: {schema: TechnicalSupportOutputSchema},
  prompt: `You are an AI Technical Support Agent for "Retaliate CRM".
A user named {{#if userName}}{{userName}}{{else}}a user{{/if}} (email: {{userEmail_ValueOrDefault userEmail ""}}) has submitted the following technical query:
"{{userQuery}}"

Your tasks are:
1.  Acknowledge their query in a friendly and empathetic tone in the 'initialResponse' field.
2.  Based on the query, provide 1 to 3 simple, actionable troubleshooting steps in the 'suggestedSteps' array.
    Examples of common issues and potential steps (you can infer similar solutions for other issues):
    -   "Cannot log in": Suggest checking internet connection, verifying username/password (case-sensitive), trying a password reset.
    -   "Data not syncing": Suggest checking the specific integration's connection status in Retaliate CRM, ensuring the third-party service is online, or trying to manually refresh.
    -   "Page not loading correctly": Suggest clearing browser cache/cookies, trying a different browser, or checking for browser updates.
    -   "How do I use X feature?": Briefly explain how to access or use the feature if it's a common one. If complex, suggest checking the documentation.
3.  Determine if the issue likely requires human intervention. If it's a complex problem, involves billing, security concerns, or if you cannot provide specific steps, set 'escalationNeeded' to true. Otherwise, set it to false.
4.  If 'escalationNeeded' is true, generate a mock ticket ID (e.g., "CRM-TS-{{Math.floor(Math.random() * 90000) + 10000}}") for the 'ticketId' field.
5.  Provide a 'furtherAssistanceMessage'.
    - If steps were provided and escalation is false: "Please try the steps above. If the issue persists, feel free to contact our human support team using the options on this page."
    - If escalation is true: "I've logged this issue for you (Ticket ID: {{ticketId_ValueOrUndefined ticketId}}). Our support team will be able to assist you further. Please reach out to them using one of the contact methods on this page and provide your ticket ID."
    - If no specific steps but escalation is false (e.g. general "how-to" that was answered): "I hope this helps! For more detailed information, please check our documentation or contact our support team."

Keep your language clear, concise, and professional.
  `,
});

const technicalSupportAgentFlow = ai.defineFlow(
  {
    name: 'technicalSupportAgentFlow',
    inputSchema: TechnicalSupportInputSchema,
    outputSchema: TechnicalSupportOutputSchema,
  },
  async input => {
    // Helper for Handlebars to use optional values or provide defaults
    // This is a workaround because Handlebars within Genkit prompts doesn't directly support complex conditional logic or default values for missing optional fields in the same way full JS does.
    // We are pre-processing them here.
    const promptInput = {
      ...input,
      userName_ValueOrDefault: (val: string | undefined, def: string) => val || def,
      userEmail_ValueOrDefault: (val: string | undefined, def: string) => val || def,
      ticketId_ValueOrUndefined: (val: string | undefined) => val || "N/A",
      // This is a simple random number generator for ticket IDs within the prompt context
      // Note: Math.random() in a prompt template itself is not ideal as it might not be re-evaluated per call as expected.
      // A better way for true uniqueness would be to generate it in this flow logic and pass it.
      // For this example, we make it available if the prompt templating can use it.
      // A more robust solution for ticket ID generation in prompt:
      // Generate it here if needed, and pass. Let's assume the LLM handles it for now based on prompt.
    };

    const {output} = await prompt(promptInput);
    
    // Ensure ticketId is generated if escalation is needed and LLM didn't provide one
    if (output && output.escalationNeeded && !output.ticketId) {
      output.ticketId = `CRM-TS-${Math.floor(Math.random() * 90000) + 10000}`;
      // Re-craft the furtherAssistanceMessage if ticketId was missing and now added
       if (output.furtherAssistanceMessage.includes("{{ticketId_ValueOrUndefined ticketId}}") || output.furtherAssistanceMessage.includes("Ticket ID: N/A")) {
         output.furtherAssistanceMessage = `I've logged this issue for you (Ticket ID: ${output.ticketId}). Our support team will be able to assist you further. Please reach out to them using one of the contact methods on this page and provide your ticket ID.`;
       }
    }
    return output!;
  }
);
