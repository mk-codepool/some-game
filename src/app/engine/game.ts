export class MainScene extends Phaser.Scene {
green: any;
blue: any;
greenKeys: any;
blueKeys: any;

constructor() {
  super({ key: 'new' });
}

preload() {
  this.load.setBaseURL('');
  this.load.image('blueBox', 'assets/noise.png');
  this.load.image('greenBox', 'assets/images/green.png');
}

create() {
  this.blue = this.physics.add.image(100, 100, 'blueBox').setCollideWorldBounds(true);
  this.green = this.physics.add.image(300, 340, 'greenBox').setCollideWorldBounds(true);

  this.greenKeys = this.input.keyboard.createCursorKeys();
  this.blueKeys = this.input.keyboard.addKeys('a,s,d,w');

  this.physics.add.collider(this.green, this.blue, undefined);
}

  override update() {
  if (this.blueKeys.a.isDown) {
    this.blue.setVelocityX(-200);
  } else if (this.blueKeys.d.isDown) {
    this.blue.setVelocityX(200);
  } else if (this.blueKeys.w.isDown) {
    this.blue.setVelocityY(-200);
  } else if (this.blueKeys.s.isDown) {
    this.blue.setVelocityY(200);
  } else if (!this.blue.triggered) {
    this.blue.setVelocity(0);
  }

  if (this.greenKeys.left.isDown) {
    this.green.setVelocityX(-200);
  } else if (this.greenKeys.right.isDown) {
    this.green.setVelocityX(200);
  } else if (this.greenKeys.up.isDown) {
    this.green.setVelocityY(-200);
  } else if (this.greenKeys.down.isDown) {
    this.green.setVelocityY(200);
  } else if (!this.green.triggered) {
    this.green.setVelocity(0);
  }
}
}
