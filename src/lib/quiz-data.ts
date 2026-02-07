
export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
  timeLimit: number; // in seconds
};

// This data is now used as the initial state for the quiz store.
export const quizzes: Quiz[] = [
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Quiz',
    timeLimit: 90,
    questions: [
      {
        question: 'Which is NOT a renewable energy source?',
        options: ['Solar', 'Wind', 'Coal', 'Hydropower'],
        correctAnswer: 'Coal',
      },
      {
        question: 'What device converts sunlight into electricity?',
        options: ['Solar heater', 'Solar panel', 'Wind turbine', 'Battery'],
        correctAnswer: 'Solar panel',
      },
      {
        question: 'Which renewable energy uses moving air?',
        options: ['Biomass', 'Wind', 'Geothermal', 'Nuclear'],
        correctAnswer: 'Wind',
      },
    ],
  },
  {
    id: 'ocean-conservation',
    title: 'Ocean Conservation Quiz',
    timeLimit: 90,
    questions: [
      {
        question: 'What is the main cause of ocean plastic pollution?',
        options: ['Overfishing', 'Oil spills', 'Improper waste disposal', 'Coral bleaching'],
        correctAnswer: 'Improper waste disposal',
      },
      {
        question: 'Which marine animal is most affected by plastic bags?',
        options: ['Dolphins', 'Sea turtles', 'Sharks', 'Whales'],
        correctAnswer: 'Sea turtles',
      },
      {
        question: 'What does "marine protected area" mean?',
        options: ['Area where fishing is banned', 'Area for boating only', 'Coastal cities', 'Ship building zones'],
        correctAnswer: 'Area where fishing is banned',
      },
    ],
  },
];
