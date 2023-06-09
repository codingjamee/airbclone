import CanvasOption from "./CanvasOption";

class Spark extends CanvasOption {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  update() {}
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = "gold";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
