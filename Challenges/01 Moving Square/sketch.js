// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let size = 20;
let moveBy = 20;
let xPos = 0;
let yPos = 0;
let direc = 0;
// 0 right/ 1 down/ 2 left/ 3 up

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  drawSquare()
}


function drawSquare() {

  // drawing the square
  fill(200);
  rect(xPos, yPos, size);
  moveSquare();

}


function moveSquare() {
  if (direc === 0) xPos += moveBy;
  else if (direc === 1) yPos += moveBy;
  else if (direc === 2) xPos -= moveBy;
  else if (direc === 3) yPos -= moveBy;
  checkPos();
}


function checkPos() {
  if (direc === 0 && xPos >= (width - (size)))  direc = 1; 
  else if (direc === 1 && yPos >= (height - (size)))  direc = 2; 
  else if (direc === 2 && xPos <= (0))  direc = 3; 
  else if (direc === 3 && yPos <= (0))  direc = 0; 
}

function keyPressed() {
  if (key === 'A') size -= 4;
  else if (key === 'D') size += 4;

  if (key === 'S' && moveBy > 4) moveBy -= 4;
  else if (key === 'W' && moveBy < 30) moveBy += 4;
}