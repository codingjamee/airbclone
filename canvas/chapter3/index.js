const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;
const fps = 60;
const interval = 1000 / fps;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

ctx.scale(dpr, dpr);

let then = Date.now();
let now, delta;

const frame = () => {
  requestAnimationFrame(frame);
  delta = now - then;
  if (delta < interval) return;

  console.log("frame");

  then = now - (delta % interval);
};

requestAnimationFrame(frame);
