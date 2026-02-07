 import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    const { width, height } = this.scale;

    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 20, width / 2, 40);

    
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4 + 10, height / 2 - 10, (width / 2 - 20) * value, 20);
    });

    
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    
    this.load.image("background", "/assets/water-game/background.png");
    this.load.image("bucket", "/assets/water-game/bucket.png");
    this.load.image("waterDrop", "/assets/water-game/water-drop.png");
    this.load.image("oilDrop", "/assets/water-game/oil-drop.png");
  }

  create() {
    
    this.scene.start("GameScene");
  }
}
