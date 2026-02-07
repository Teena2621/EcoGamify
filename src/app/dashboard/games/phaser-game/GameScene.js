import * as Phaser from "phaser";

class WasteSortGame extends Phaser.Scene {
  constructor() {
    super("WasteSortGame");
    this.score = 0;
    this.timeLeft = 45;
    this.gameStarted = false;
  }

  preload() {
    
    this.load.image("background", "/assets/bg.png"); 
    this.load.image("trashBin", "/assets/trashBin.png"); 
    this.load.image("recycleBin", "/assets/recycleBin.png"); 

    
    this.load.image("apple", "/assets/apple.png");
    this.load.image("banana", "/assets/banana.png");
    this.load.image("can", "/assets/can.png");
    this.load.image("diaper", "/assets/diaper.png");
    this.load.image("paper", "/assets/paper.png");
    this.load.image("plasticBottle", "/assets/plasticBottle.png");
    this.load.image("plasticContainer", "/assets/plasticContainer.png");
    this.load.image("cardboard", "/assets/cardboard.png");
    this.load.image("brush", "/assets/brush.png");
  }

  create() {
    
    this.add.image(400, 300, "background").setDisplaySize(800, 600);

    
    this.recycleBin = this.physics.add.image(150, 500, "recycleBin").setScale(0.5);
    this.trashBin = this.physics.add.image(650, 500, "trashBin").setScale(0.5);

    
    this.scoreText = this.add.text(20, 20, "Score: 0", { fontSize: "22px", fill: "#fff" });
    this.timerText = this.add.text(650, 20, "Time: 45", { fontSize: "22px", fill: "#fff" });
    this.feedbackText = this.add.text(300, 50, "", { fontSize: "24px", fill: "#ffeb3b" });

    
    this.startButton = this.add.text(300, 300, "▶ Start Game", { fontSize: "32px", fill: "#0f0", backgroundColor: "#000" })
      .setInteractive()
      .on("pointerdown", () => this.startGame());
  }

  startGame() {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.startButton.destroy();

    
    this.items = [
      { key: "apple", bin: "trash" },
      { key: "banana", bin: "trash" },
      { key: "diaper", bin: "trash" },
      { key: "brush", bin: "trash" },
      { key: "can", bin: "recycle" },
      { key: "paper", bin: "recycle" },
      { key: "cardboard", bin: "recycle" },
      { key: "plasticBottle", bin: "recycle" },
      { key: "plasticContainer", bin: "recycle" },
    ];

    this.createWasteItems();

    
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
  }

  createWasteItems() {
    this.wasteGroup = this.physics.add.group();

    this.items.forEach((item) => {
      let sprite = this.wasteGroup.create(
        Phaser.Math.Between(100, 700),
        Phaser.Math.Between(100, 300),
        item.key
      );
      sprite.setScale(0.4);
      sprite.setInteractive({ draggable: true });
      sprite.binType = item.bin;

      this.input.setDraggable(sprite);

      sprite.on("drag", (pointer, dragX, dragY) => {
        sprite.x = dragX;
        sprite.y = dragY;
      });

      sprite.on("dragend", () => {
        this.checkDrop(sprite);
      });
    });
  }

  checkDrop(sprite) {
    const recycleZone = this.recycleBin.getBounds();
    const trashZone = this.trashBin.getBounds();

    let correct = false;

    if (Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), recycleZone) && sprite.binType === "recycle") {
      correct = true;
    } else if (Phaser.Geom.Intersects.RectangleToRectangle(sprite.getBounds(), trashZone) && sprite.binType === "trash") {
      correct = true;
    }

    if (correct) {
      this.score += 10;
      this.feedbackText.setText("✅ Correct!");
      this.feedbackText.setColor("#00ff00");
      sprite.destroy();
    } else {
      this.score -= 5;
      this.feedbackText.setText("❌ Wrong!");
      this.feedbackText.setColor("#ff0000");
      sprite.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 300));
    }

    this.scoreText.setText("Score: " + this.score);
    this.time.delayedCall(700, () => this.feedbackText.setText(""));

    
    if (this.wasteGroup.countActive() === 0) {
      this.endGame(true); 
    }
  }

  updateTimer() {
    this.timeLeft--;
    this.timerText.setText("Time: " + this.timeLeft);
    if (this.timeLeft <= 0) {
      this.endGame(false); 
    }
  }

  endGame(completed) {
  
    if (this.timerEvent) {
      this.timerEvent.remove(false);
    }

    
    if (this.wasteGroup) {
      this.wasteGroup.children.each((item) => item.disableInteractive());
    }

    const message = completed ? "🎉 Game Completed!" : "🧩 Game Over!";
    const color = completed ? "#00ff00" : "#fff";

    
    this.add.rectangle(400, 300, 400, 200, 0x000000, 0.8);
    this.add.text(260, 260, message, { fontSize: "36px", fill: color });
    this.add.text(320, 320, `Final Score: ${this.score}`, { fontSize: "28px", fill: "#ffeb3b" });
  }
}

export default WasteSortGame;
