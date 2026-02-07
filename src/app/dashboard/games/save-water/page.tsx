 "use client";

import { useEffect, useRef } from "react";

export default function SaveWaterPage() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; 

    
    (async () => {
      const Phaser = (await import("phaser")).default;

      
      const PreloadScene = (await import("../save-water/scenes/preloadScene.js")).default;
      const GameScene = (await import("./scenes/GameScene.js")).default;
      const GameOverScene = (await import("./scenes/GameOverScene.js")).default;

      
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameContainerRef.current,
        physics: {
          default: "arcade",
          arcade: { gravity: { x: 0, y: 300 }, debug: false },
        },
        scene: [PreloadScene, GameScene, GameOverScene],
      };

      
      new Phaser.Game(config);
    })();

  
  }, []);

  return <div ref={gameContainerRef} style={{ width: "800px", height: "600px" }} />;
}
