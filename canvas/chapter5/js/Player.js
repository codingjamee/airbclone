import App from "./App.js";
import BoundingBox from "./BoundingBox.js";

export default class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 130;
    //이미지파일 비율 : 세로/가로 = 96/140
    this.height = (96 / 140) * this.width;

    this.boundingBox = new BoundingBox(
      this.x + 10,
      this.y + 16,
      this.width - 17,
      this.height - 20
    );

    this.counter = 0;
    this.frameX = 0;

    this.vy = -12;
    this.gravity = 0.25;
    App.canvas.addEventListener("click", () => {
      this.vy += -5;
    });
  }
  update() {
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 15;
    }
    // if (this.frameX === 15) this.frameX = 0;
    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 16;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 15) * this.frameX,
      0,
      this.img.width / 15,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.boundingBox.draw();
  }
}
