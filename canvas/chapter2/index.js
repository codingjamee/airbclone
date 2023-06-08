let canvasWidth, canvasHeight;

class Canvas extends CanvasOption {
  constructor() {
    super();
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

      this.ctx.fillRect(100, 100, 200, 200);

      then = now - (delta % this.interval);
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
