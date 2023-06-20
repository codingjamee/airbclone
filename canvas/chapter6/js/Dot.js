import Vector from "./Vector.js";

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.gravity = new Vector(0, 1);
    this.friction = 0.97;

    this.pinned = false;
    this.mass = 1;
  }
  update(mouse) {
    if (this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldPos);
    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);

    this.pos.add(vel);
    // console.log(this.pos);

    let { x: dx, x: dy } = Vector.sub(mouse.pos, this.pos);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > mouse.radius) return;
    // console.log(mouse.radius);

    const direction = new Vector(dx / dist, dy / dist); //방향벡터
    const force = (mouse.radius - dist) / mouse.radius; //마우스 힘

    if (force > 0.3) this.pos.setXY(mouse.pos.x, mouse.pos.y);
    else this.pos.add(direction.mult(force).mult(3));

    console.log(force);
  }
  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

//현재 프레임이 실행되기 전에
