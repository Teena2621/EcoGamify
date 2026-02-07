 import React from 'react';
import ClientOnlyPhaserLoader from '@/components/ClientOnlyPhaserLoader'; 

export default function WasteSortGamePage() {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-4">Waste Management Game</h1>
      
      <ClientOnlyPhaserLoader />
    </div>
  );
}