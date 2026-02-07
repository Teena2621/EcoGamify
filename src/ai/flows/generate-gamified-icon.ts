'use server';
/**
 * @fileOverview Generates a unique, animated environmental icon with playful game-like elements using AI.
 *
 * - generateGamifiedIcon - A function that generates the icon.
 * - GenerateGamifiedIconInput - The input type for the generateGamifiedIcon function.
 * - GenerateGamifiedIconOutput - The return type for the generateGamifiedIcon function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGamifiedIconInputSchema = z.object({
  theme: z
    .string()
    .default('environmental')
    .describe('The theme for the icon (e.g., environmental, nature, ecology).'),
  gameElement: z
    .string()
    .default('puzzle')
    .describe('A game-like element to incorporate (e.g., puzzle, challenge, reward).'),
});
export type GenerateGamifiedIconInput = z.infer<typeof GenerateGamifiedIconInputSchema>;

const GenerateGamifiedIconOutputSchema = z.object({
  iconDataUri: z
    .string()
    .describe(
      'The generated icon as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type GenerateGamifiedIconOutput = z.infer<typeof GenerateGamifiedIconOutputSchema>;

export async function generateGamifiedIcon(input: GenerateGamifiedIconInput): Promise<GenerateGamifiedIconOutput> {
  return generateGamifiedIconFlow(input);
}

const generateGamifiedIconPrompt = ai.definePrompt({
  name: 'generateGamifiedIconPrompt',
  input: {schema: GenerateGamifiedIconInputSchema},
  output: {schema: GenerateGamifiedIconOutputSchema},
  prompt: `Generate a unique, animated gamified icon with an environmental theme.  The icon should incorporate the theme of {{{theme}}} and include a {{{gameElement}}} element. Return the icon as a data URI.
`,
});

const generateGamifiedIconFlow = ai.defineFlow(
  {
    name: 'generateGamifiedIconFlow',
    inputSchema: GenerateGamifiedIconInputSchema,
    outputSchema: GenerateGamifiedIconOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: `Generate a unique, animated gamified icon with an environmental theme. The icon should incorporate the theme of ${input.theme} and include a ${input.gameElement} element. Return the icon as a data URI.`,      
      model: 'googleai/imagen-4.0-fast-generate-001',
    });

    return {
      iconDataUri: media.url,
    };
  }
);
