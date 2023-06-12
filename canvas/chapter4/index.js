import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//dpr이 너무 크면 성능이슈가 생길 수 있으므로 최대 2로 해줌
const dpr = window.devicePixelRatio > 1 ? 2 : 1;

const fps = 60;
const interval = 1000 / fps;
const particles = [];

let canvasWidth;
let canvasHeight;

const init = () => {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;

  //canvas css style
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  //canvas js
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.scale(dpr, dpr);
};

const createRing = () => {
  const PARTICLE_NUM = 10;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
};

const render = () => {
  let then = Date.now();
  let now, delta;

  const x = innerWidth / 2;
  let y = innerHeight / 2;
  let widthAlpha = 0;
  const width = 50;
  const height = 50;
  let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    widthAlpha += 0.1;
    deg += 0.1;
    y += 1;
    // console.log("requestAnimation");

    ctx.translate(x + width, y + height);
    ctx.rotate(deg);
    ctx.translate(-x - width, -y - height);

    ctx.fillStyle = "red";
    ctx.fillRect(
      x,
      y,
      width * Math.cos(widthAlpha),
      height * Math.sin(widthAlpha)
    );

    particles.forEach((particle) => {
      particle.draw(ctx);
    });

    ctx.resetTransform();

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
});

window.addEventListener("click", () => {
  createRing();
});
