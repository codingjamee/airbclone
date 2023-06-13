import Particle from "./js/Particle.js";
import { randomNumBetween } from "./js/utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//dpr이 너무 크면 성능이슈가 생길 수 있으므로 최대 2로 해줌
const dpr = window.devicePixelRatio > 1 ? 2 : 1;

const fps = 60;
const interval = 1000 / fps;

let canvasWidth;
let canvasHeight;

const particles = [];

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

const confetti = ({ x, y, count, deg, colors, shapes, spread }) => {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread));
  }
};

const render = () => {
  let then = Date.now();
  let now, delta;
  let deg = 0;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle) => {
      particle.draw(ctx);
    });

    ctx.resetTransform();

    deg += randomNumBetween(-1, 1);
    confetti({
      x: 0.5,
      y: 0.5,
      count: 5,
      deg: 225 + deg,
      // colors: ["#FF0000"],
      spread: 1,
    });
    confetti({
      x: 0.5,
      y: 0.5,
      count: 5,
      deg: 90 + deg,
      // colors: ["#FF0000"],
      spread: 1,
    });
    confetti({
      x: 0.5,
      y: 0.5,
      count: 5,
      deg: 315 + deg,
      // colors: ["#FF0000"],
      spread: 1,
    });

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].opacity < 0) particles.splice(i, 1);
      if (particles[i].y > canvasHeight) particles.splice(i, 1);
    }

    console.log(particles.length);
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
  confetti({
    x: 0,
    y: 0.5,
    count: 10,
    deg: -50,
    // colors: ["#FF0000"],
    spread: 1,
  });
});
