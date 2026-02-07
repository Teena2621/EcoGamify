 import React from 'react';
import GameCard from '@/components/GameCard'; 

// --- Placeholder Components ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

const Button = ({ children, className, href }) => (
  <a href={href} className={`inline-flex items-center justify-center px-8 py-3 rounded-xl text-lg font-semibold transition-colors duration-200 border-2 border-gray-300 text-gray-800 hover:bg-gray-50 shadow-md ${className || ''}`}>
    {children}
  </a>
);
// --- End of Placeholder Components ---

// --- UPDATED MOCK GAME DATA (Now each game has a unique id) ---
const gamesData = [
  {
    id: 'waste-sort',
    title: 'Waste Sort Challenge',
    image: '', 
    xpAward: 50,
    progress: 75,
    statusText: 'Last Played: Yesterday',
    link: '/dashboard/games/waste-sort', 
    placeholderText: 'RECYCLE'
  },
  {
    id: 'save-water',  
    title: 'Save the Water Drops',
    description: 'Catch clean water drops and avoid oil to protect nature.',
    image: '',
    xpAward: 60,
    progress: 0,
    statusText: 'New Game!',
    link: '/dashboard/games/save-water', 
    placeholderText: 'SAVE WATER'
  },
];

export default function GameCardGrid() {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4 mb-8">
        <a href="/dashboard" className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
          <ArrowLeftIcon />
        </a>
        <h1 className="text-3xl font-bold text-gray-900">
          Game Arcade
        </h1>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {gamesData.map((game) => (
          <GameCard key={game.id} game={game} /> // ✅ now all keys are unique
        ))}
      </div>

      {/* Back Button at the bottom */}
      <div className="flex justify-center pt-8">
        <Button href="/dashboard" className="shadow-lg">
          <ArrowLeftIcon />
          Back
        </Button>
      </div>
    </div>
  );
}
