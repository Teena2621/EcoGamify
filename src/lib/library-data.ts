
export type LibraryResource = {
  id: string;
  title: string;
  description: string;
  topic: 'Renewable Energy' | 'Ocean Conservation' | 'Forest Ecosystem' | 'Climate Change';
  type: 'Article' | 'Video' | 'Infographic';
  content: string;
  xp: number;
};

// This data is now used as the initial state for the library store.
export const libraryResources: LibraryResource[] = [
  {
    id: 'renewable-basics',
    title: 'Basics of Renewable Energy',
    description: 'An introductory article on solar, wind, and hydropower.',
    topic: 'Renewable Energy',
    type: 'Article',
    content: 'This is the full content of the article about the basics of renewable energy...',
    xp: 20,
  },
  {
    id: 'ocean-plastic-video',
    title: 'The Problem with Plastics',
    description: 'A short video explaining the impact of plastic on marine life.',
    topic: 'Ocean Conservation',
    type: 'Video',
    content: 'This is where a video embed would go, explaining the problem with plastics in our oceans.',
    xp: 30,
  },
  {
    id: 'forest-infographic',
    title: 'Value of Our Forests',
    description: 'An infographic showcasing the vital role of forests in our ecosystem.',
    topic: 'Forest Ecosystem',
    type: 'Infographic',
    content: 'This is the full content of an infographic about the value of forests...',
    xp: 15,
  },
  {
    id: 'climate-change-intro',
    title: 'Understanding Climate Change',
    description: 'A beginner\'s guide to the causes and effects of climate change.',
    topic: 'Climate Change',
    type: 'Article',
    content: 'This is the full content of the article about understanding climate change...',
    xp: 25,
  },
];
