 import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
    this.score = 0;
  }

   
  init(data) {
    this.score = data.score;
  }

  create() {
    const { width, height } = this.scale;

     
    this.add
      .text(width / 2, height / 2 - 50, "Game Over", {
        fontSize: "48px",
        color: "#ff0000",
      })
      .setOrigin(0.5);

     
    this.add
      .text(width / 2, height / 2 + 10, `Your Score: ${this.score}`, {
        fontSize: "32px",
        color: "#fff",
      })
      .setOrigin(0.5);
  }
}
