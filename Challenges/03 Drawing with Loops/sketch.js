// Drawing with Loops
// Muntaha Chowdhury
// October 9, 2024

let originPointX;
let originPointY;
let CIRCLE_SPACING_X;
let CIRCLE_SPACING_Y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  originPointX = width/2;
  originPointY = height/2;
  CIRCLE_SPACING_X = width/12;
  CIRCLE_SPACING_Y = width/12;
}

function draw() {
  background(220);
  drawCircles();
  drawConnectCircle();
}


function drawCircles() {
  // 4 loops that draw the circles
  
  // top row
  for (let x = 0; x <= width; x+=CIRCLE_SPACING_X) {
    circle(x, 0, 40);
    drawControlLine(x, 0, originPointX, originPointY);
  }

  // left row
  for (let y = 0; y <= height; y+=CIRCLE_SPACING_Y) {
    circle(0, y, 40);
    drawControlLine(0, y, originPointX, originPointY);
  }
  
  // bottom row
  for (let x = 0; x <= width; x+=CIRCLE_SPACING_X) {
    circle(x, height, 40);
    drawControlLine(x, height, originPointX, originPointY);
  }

  // right row
  for (let y = 0; y <= height; y+=CIRCLE_SPACING_Y) {
    circle(width, y, 40);
    drawControlLine(width, y, originPointX, originPointY);
  }

}

function drawConnectCircle() {
  circle(originPointX, originPointY, 20);

  if (mouseIsPressed) {
    originPointX = mouseX;
    originPointY = mouseY;
  }
}

function drawControlLine(x1, y1, x2, y2) {
  // line(x1, y1, x2, y2);
  line(x1, y1, x2, y2, x1+OR, y1,);
}