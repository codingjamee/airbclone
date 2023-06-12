import { randomNumBetween } from "./util.js";

export default class Particle {
  constructor() {
    //마찰값이 1보다 작은 경우는 0으로 수렴하므로 사라지지 않게됨...
    this.rFriction = randomNumBetween(0.95, 1.01);
    this.r = innerHeight / 4;

    this.angleFriction = randomNumBetween(0.97, 0.99);
    this.angle = randomNumBetween(0, 360);
    this.rAlpha = randomNumBetween(0, 5);
    this.angleAlpha = randomNumBetween(1, 2);
    this.opacity = randomNumBetween(0, 1);
  }

  update() {
    this.rAlpha *= this.rFriction;
    this.angleAlpha *= this.angleFriction;
    this.r += this.rAlpha;
    this.angle += this.angleAlpha;

    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);

    this.opacity -= 0.003;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    console.log(this.x, this.y);
    ctx.fillStyle = `rgba(255,255,255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}
