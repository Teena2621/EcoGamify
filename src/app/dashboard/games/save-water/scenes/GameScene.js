 import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.score = 0;
    this.timeLeft = 30;
  }

  create() {
    const { width, height } = this.scale;

     
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(width, height);

     
    this.bucket = this.physics.add.sprite(width / 2, height - 50, "bucket");
    this.bucket.setCollideWorldBounds(true);

     
    this.waterGroup = this.physics.add.group();

     
    this.oilGroup = this.physics.add.group();

     
    this.time.addEvent({
      delay: 1000,
      callback: this.spawnDrops,
      callbackScope: this,
      loop: true,
    });

     
    this.physics.add.overlap(this.bucket, this.waterGroup, this.collectWater, null, this);

    
    this.physics.add.overlap(this.bucket, this.oilGroup, this.hitOil, null, this);

    
    this.cursors = this.input.keyboard.createCursorKeys();

     
    this.scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "24px", color: "#fff" });

     
    this.timerText = this.add.text(16, 50, `Time: ${this.timeLeft}`, { fontSize: "24px", color: "#fff" });

     
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}`);
        if (this.timeLeft <= 0) {
          this.scene.start("GameOverScene", { score: this.score });
        }
      },
      loop: true,
    });
  }

  update() {
    
    if (this.cursors.left.isDown) {
      this.bucket.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.bucket.setVelocityX(300);
    } else {
      this.bucket.setVelocityX(0);
    }
  }

  spawnDrops() {
    const { width } = this.scale;

    
    const waterX = Phaser.Math.Between(50, width - 50);
    const water = this.waterGroup.create(waterX, 0, "waterDrop");
    water.setVelocityY(200);
    water.setCollideWorldBounds(false);
    water.setScale(0.5);  

     
    if (Phaser.Math.Between(1, 10) <= 3) {
      const oilX = Phaser.Math.Between(50, width - 50);
      const oil = this.oilGroup.create(oilX, 0, "oilDrop");
      oil.setVelocityY(200);
      oil.setCollideWorldBounds(false);
      oil.setScale(0.5);
    }
  }

  collectWater(bucket, drop) {
    drop.destroy();
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  hitOil(bucket, oil) {
    oil.destroy();
    this.score = Math.max(this.score - 10, 0);  
    this.scoreText.setText(`Score: ${this.score}`);
  }
}
