// External Libraries + CSS Centering
// Muntaha Chowdhury
// 22 Nov, 2024

let started = false;
let pos; let vel;
let totalBounces = 0;

function setup() {
  createCanvas(300, 200);
  textSize(30);
  textAlign(CENTER, CENTER);
  
  pos = createVector(width/2, height/2);
  vel = createVector(5, 3);

  if(localStorage.getItem("bounce") === null) {
    localStorage.setItem("bounce", 0);
  }
  else {
    totalBounces = int(localStorage.getItem("bounce"));
  }
}

function draw() {
  background(220);
  if (started === false) {
    text("Click to begin", width/2, height/2);
    if (mouseIsPressed) {
      started = true;
    }
  }
  else {
    text(totalBounces, width/2, height/2);
    updateBall();
  }
}

function updateBall() {
  pos.add(vel);
  if (pos.x < 0 || pos.x > width) {
    totalBounces++;
    vel.x *= -1;
    localStorage.setItem("bounce", totalBounces);
  }
  if (pos.y < 0 || pos.y > height) {
    totalBounces++;
    vel.y *= -1;
    localStorage.setItem("bounce", totalBounces);
  }
  circle(pos.x, pos.y, 20);
}