export default class Particle {
  constructor() {
    this.x = 300;
    this.y = 300;
    this.radian = 1;
  }

  update() {}
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }
}
