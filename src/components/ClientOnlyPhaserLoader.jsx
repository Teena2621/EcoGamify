 "use client"; // <--- THIS IS THE REQUIRED FIX

import React, { useEffect, useRef, useState } from 'react';
// This assumes your game initialization logic is correctly imported here
import startPhaserGame from '@/app/dashboard/games/phaser-game/startPhaserGame';

export default function ClientOnlyPhaserLoader() {
  // State to track if the component has mounted on the client side
  const [isClient, setIsClient] = useState(false);
  
  const gameContainerRef = useRef(null);
  const gameRef = useRef(null); 

  // 1. Check for client mount status
  useEffect(() => {
    // This runs only once, immediately after the component mounts in the browser
    setIsClient(true);
  }, []);

  // 2. Initialize Phaser only AFTER client mount
  useEffect(() => {
    // Only run this logic if we are definitely on the client and the game hasn't started
    if (isClient && gameContainerRef.current && !gameRef.current) {
      console.log("Initializing Phaser Game...");
      
      // Initialize the Phaser game and store the instance
      gameRef.current = startPhaserGame(gameContainerRef.current);
    }

    // Cleanup function: Destroys the Phaser game instance on unmount
    return () => {
      if (gameRef.current) {
        console.log("Destroying Phaser Game...");
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [isClient]); 

  if (!isClient) {
    // Show a loader or fallback UI while running on the server or loading
    return (
      <div className="flex justify-center items-center h-[600px] w-[800px] bg-white rounded-lg shadow-lg">
        <p className="text-xl text-gray-600 animate-pulse">Loading Game...</p>
      </div>
    );
  }

  // Once isClient is true, render the container where Phaser attaches the canvas
  return (
    <div className="flex justify-center items-center p-4 bg-gray-900 min-h-[640px] rounded-xl shadow-2xl">
      <div 
        ref={gameContainerRef} 
        id="phaser-game-container" 
        className="w-[800px] h-[600px] overflow-hidden rounded-lg border-4 border-teal-500"
      />
    </div>
  );
}