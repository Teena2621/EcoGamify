'use server';

import { generateGamifiedIcon } from '@/ai/flows/generate-gamified-icon';
import { z } from 'zod';

const GamifiedIconSchema = z.object({
  theme: z.string(),
  gameElement: z.string(),
});

export async function getGamifiedIcon(input: z.infer<typeof GamifiedIconSchema>) {
  try {
    const result = await generateGamifiedIcon(input);
    return result.iconDataUri;
  } catch (error) {
    console.error('Error generating gamified icon:', error);
    // In case of an error, we can return a fallback SVG icon.
    // This is a simple green leaf SVG.
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3N0RENzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1sZWFmIj48cGF0aCBkPSJNMjAgMTBXMTAuNSAzIDIxIDRjMCA0LjUtNiAxMC02IDEwWiIvPjxwYXRoIGQ9Ik00IDIwcy0xLTggNi0xMCA2IDEwLTQgMTBaIi8+PC9zdmc+';
  }
}
