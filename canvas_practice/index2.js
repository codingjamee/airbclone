const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const fps = 60;
const interval = 1000 / fps;
let circle;
const circles = [];
const circle_Num = 10;

const init = () => {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  ctx.scale(dpr, dpr);
  circle = new circleDraw(100, 75);
  for (let i = 0; i < circle_Num; i++) {
    circles.push(
      new circleDraw(
        randomNumBetween(0, canvasWidth),
        randomNumBetween(0, canvasHeight)
      )
    );
  }
};

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

class circleDraw {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = randomNumBetween(2, 10);
    this.vy = randomNumBetween(2, 10);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius = 30;
    if (this.x > canvasWidth || this.x < 0) {
      this.vx *= -1;
      console.log(this.vx);
      console.log(canvasWidth);
      console.log(this.x);
    }
    if (this.y > canvasHeight || this.y < 0) {
      this.vy *= -1;
    }
  }
  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
  }
}

const render = () => {
  let then = Date.now();
  let now, delta;
  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    circle.update();
    circle.draw();

    circles.forEach((circle) => {
      circle.update();
      circle.draw();
    });
    then = now - (delta % interval);
  };
  requestAnimationFrame(frame);
};

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
  render();
});
