 "use client";

export default function startPhaserGame(container) {
  if (typeof window === "undefined") return; 

  import("phaser").then(Phaser => {
    import("@/app/dashboard/games/phaser-game/GameScene").then(({ default: WasteSortGame }) => {
      const config = {
        type: Phaser.AUTO,
        parent: container,
        width: 800,
        height: 600,
        backgroundColor: "#222",
        scene: [WasteSortGame],
        physics: {
          default: "arcade",       
          arcade: {
            gravity: { y: 0 },     
            debug: false
          }
        }
      };

      new Phaser.Game(config);
    });
  });
}
