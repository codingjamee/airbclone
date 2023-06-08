const canvas = document.querySelector("canvas");
console.log(canvas);

// canvas의 2d 작업도구
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
console.log(window.devicePixelRatio);

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

//canvas 사이즈 조절 (css를 통해 늘리는 방법)
//default값은 300*150 css로 늘리게 되면 배수로 늘리게 됨 줄일때도 배수로 줄어듬
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

//canvas 자체 사이즈 조절
//css와 js의 사이즈를 똑같이 맞춰서 조절
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
//내가 그린 그림의 가로와 세로에 dpr값을 곱해줌 dpr이 높을 수록 더선명해 지는 효과
ctx.scale(dpr, dpr);

//사각형 그리기
// ctx.fillRect(10, 10, 50, 50);

// device pixel ratio
//하나의 css픽셀을 그릴 때 사용되는 장치의 픽셀 수
//dpr이 높을 수록 더 선명한 그림

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }

  update() {
    this.y += this.vy;
  }

  draw() {
    //원 그리기
    //패스 시작한다는 메서드
    ctx.beginPath();
    //1도는 Math.PI/180
    //5번째 인자 그리고 싶은 호의 각도 만큼
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    //색상바꾸기
    ctx.fillStyle = "aqua";
    //색상 채워주기
    ctx.fill();
    //선으로만 그리기
    // ctx.stroke();
    //path를 끝내는 메서드
    ctx.closePath();
  }
}

const randomBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const TOTAL = 100;

const particles = [];

//TOTAL번만큼 particle을 만들어줌
for (let i = 0; i < TOTAL; i++) {
  const x = randomBetween(0, canvasWidth);
  const y = randomBetween(0, canvasHeight);
  const radius = randomBetween(0, 50);
  const vy = randomBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

console.log(particles);

//목표 1프레임당 ms값 (60으로 맞추면 좋음)
let interval = 1000 / 60;
let now, delta;

//시작시간
let then = Date.now();
console.log(then);

function animate() {
  console.log("animate");
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  //delta값이 interval보다 클 때만 애니메이션 실행
  if (delta < interval) return;
  //사각형 지우기
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  //particles에 있는 particle을 모두 draw해주기
  //vy값만큼 업데이트하고 계속 그만큼 그려주면 내려오는 효과
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomBetween(0, canvasWidth);
      particle.radius = randomBetween(0, 50);
      particle.vy = randomBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();

//fps
//초당 프레임의 횟수 (frame per second)
//1초에 request animation frame을 몇번 실행시킬 것인가.
