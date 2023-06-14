import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
import { randomNumBetween } from "./util.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // 'BIG', 'SMALL'
    switch (this.type) {
      case "BIG":
        this.sizeX = 19 / 30; //30개 타일 중에 19개
        this.sx = this.img.width * (11 / 30);
        break;
      case "SMALL":
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (2 / 30);
        break;
    }
    this.width = App.height * this.sizeX;
    this.height = App.height;
    this.gapY = randomNumBetween(App.height * 0.3, App.height * 0.5);
    this.x = App.width;

    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 60);
    this.y2 = this.y1 + this.height + this.gapY;

    this.vx = -6;
    this.generatedNext = false;
    //this.y1의 최솟값 : -this.height
    //최댓값 : App.height - this.gapY - this.height
    this.gapNextX = App.width * randomNumBetween(0.4, 0.5);

    console.log(this.x, this.y);

    this.boundingBox1 = new BoundingBox(
      this.x + 30,
      this.y1 + 30,
      this.width - 60,
      this.height - 60
    );
    this.boundingBox2 = new BoundingBox(
      this.x + 30,
      this.y2 + 60,
      this.width - 60,
      this.height - 60
    );
  }
  get isOutside() {
    return this.x + this.width < 0;
  }

  get canGenerateNext() {
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }
  isColliding(target) {
    return (
      this.boundingBox1.isColliding(target) ||
      this.boundingBox2.isColliding(target)
    );
  }
  update() {
    this.x += this.vx;
    this.boundingBox1.x = this.x + 30;
    this.boundingBox2.x = this.x + 30;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y1,
      this.width,
      this.height
    );

    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y2,
      this.width,
      this.height
    );

    // this.boundingBox1.draw();
    // this.boundingBox2.draw();
  }
}
