import CanvasOption from "./js/CanvasOption.js";
import Particle from "./js/Particle.js";
import Tail from "./js/Tail.js";
import Spark from "./js/Spark.js";

import { hypotenuse, randomNumBetween } from "./js/utils.js";

let canvasWidth, canvasHeight;

class Canvas extends CanvasOption {
  constructor() {
    super();

    this.tails = [];
    this.particles = [];
    this.sparks = [];
  }
  //canvas초기화
  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;

    this.canvas.style.width = this.canvasWidth + "px";
    this.canvas.style.height = this.canvasHeight + "px";

    this.ctx.scale(this.dpr, this.dpr);
    console.log(this.dpr);
    this.createParticles();
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8);
    const vy = this.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
    const color = "255, 255, 255";
    this.tails.push(new Tail(x, vy, color));
  }

  createParticles(x, y, color) {
    const PARTICLE_NUM = 1000;

    for (let i = 0; i < PARTICLE_NUM; i++) {
      //innerHeight와 innerWidth값을 토대로 화면이 작아져도 그것에 맞게
      const r =
        randomNumBetween(2, 70) * hypotenuse(innerWidth, innerHeight) * 0.0001; //자연스럽게
      // console.log(hypotenuse(innerWidth, innerHeight));
      const angle = (Math.PI / 180) * randomNumBetween(0, 360);

      const vx = r * Math.cos(angle);
      const vy = r * Math.sin(angle);
      const opacity = randomNumBetween(0.1, 1);
      this.particles.push(new Particle(x, y, vx, vy, opacity));
    }
  }

  //fps작업
  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      //this.bgColor로 fill을 해서 전체화면을 그려줌(지워주는 효과)
      //bgColor에 숫자를 붙이면 #00000030 알파값 transparency값
      //여러번 칠해줘야 화면이 검정색이 되므로 꼬리를 남긴것같은 효과
      this.ctx.fillStyle = this.bgColor + "10";
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      //tail을 적은 횟수로 만들어주기 위해
      if (Math.random() < 0.03) this.createTail();

      //tails배열에 담긴 tail을 업데이트 후 그려주기
      this.tails.forEach((tail, index) => {
        tail.update();
        tail.draw();

        //tail이 다 올라가면 없애주기
        if (tail.vy > -0.7) {
          this.tails.splice(index, 1);
          this.createParticles(tail.x, tail.y, tail.color);
        }
      });

      //particles의 배열에 담긴 particles를 업데이트후 그려주기
      this.particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        //particles를 그릴 떄 같이 해당 지점에 spark를 생성
        if (Math.random() < 0.1) {
          this.sparks.push(new Spark(particle.x, particle.y, 0.3));
        }

        //particle이 완전 투명해지면 없애주기
        if (particle.opacity < 0) {
          this.particles.splice(index, 1);
        }
      });

      then = now - (delta % this.interval);

      this.sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();

        if (spark.opacity < 0) {
          this.sparks.splice(index, 1);
        }
      });
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

//화면 로드 되었을 때 초기화와 렌더작업
window.addEventListener("load", () => {
  canvas.init();
  canvas.render();
});

//리사이즈 될때마다 초기화 재설정
window.addEventListener("resize", () => {
  canvas.init();
});
