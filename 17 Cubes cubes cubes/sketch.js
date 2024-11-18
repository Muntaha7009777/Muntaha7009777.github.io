// 3d Basics + CSS Centering
// Muntaha Chowdhury
// 18 November 2025

// let angle = 5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  rotateY(frameCount);
  for (let i = 0; i < 360; i+=45) {
    push();
    rotateY(i);
    boxes(40);
    pop();
  }
}

function boxes(size) {
  // recursive function for creating 3D boxes
  if (size > 3) {
    let angle = map(mouseX, 0, width, -10, 10);
    rotateZ(angle);
    translate(size*1.5, 0);
    box(size);

    boxes(size*0.8);
  }
  // base case
}