import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super();
    this.x = x;
    //tail이 시작하는 위치
    this.y = this.canvasHeight;
    this.vy = vy;
    this.color = color;
    this.angle = randomNumBetween(0, 100);
    this.friction = 0.985;
  }
  update() {
    //점점 올라가는 모습
    this.vy *= this.friction;
    this.y += this.vy;
    this.x += Math.cos(this.angle) * this.vy * 0.2;

    this.angle += 1;
    this.opacity = -this.vy * 0.1;
  }
  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
