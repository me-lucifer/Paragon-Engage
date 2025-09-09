'use server';

/**
 * @fileOverview Content recommendation AI agent.
 *
 * - recommendContent - A function that recommends content based on user profile and behavior.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The profile of the user, including their interests and demographics.'),
  userBehavior: z
    .string()
    .describe('The recent behavior of the user, including content views and engagement.'),
  contentLibrary: z
    .string()
    .describe('A description of the available content in the library.'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of content recommendations tailored to the user.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an expert content recommendation system.

  Based on the user's profile, behavior, and the available content library, provide content recommendations tailored to the user.

  User Profile: {{{userProfile}}}
  User Behavior: {{{userBehavior}}}
  Content Library: {{{contentLibrary}}}

  Provide a list of content recommendations that are most relevant and engaging to the user.
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);
    return output!;
  }
);
