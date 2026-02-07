import React, { useEffect, useRef } from 'react';
// Assuming startPhaserGame is placed at the root of your project or in a clearly accessible path
import startPhaserGame from '@/app/dashboard/games/phaser-game/startPhaserGame';

export default function PhaserWrapper() {
  const gameContainerRef = useRef(null);
  const gameRef = useRef(null); 

  useEffect(() => {
    if (gameContainerRef.current && !gameRef.current) {
      // Initialize the Phaser game and store the instance
      gameRef.current = startPhaserGame(gameContainerRef.current);
    }

    // Cleanup function: Destroys the Phaser game instance on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []); 

  return (
    <div className="flex justify-center items-center p-4 bg-gray-900 min-h-[640px] rounded-xl shadow-2xl">
      {/* This container will hold the game canvas */}
      <div 
        ref={gameContainerRef} 
        id="phaser-game-container" 
        className="w-[800px] h-[600px] overflow-hidden rounded-lg border-4 border-teal-500"
      />
    </div>
  );
}