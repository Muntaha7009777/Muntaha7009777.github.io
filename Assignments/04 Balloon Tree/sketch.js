// Balloon tree
// Muntaha Chowdhury
// 13 November, 2024
// Ballon tree that changes based on keypresses and mouse movements
/* eslint-disable no-extra-parens */


let scale = 20;
let noLeavesDepth = 5;
let depthStart = 6;
let seed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  seed = random(60);
}

function draw() {
  background(255);
  randomSeed(seed);
  // drawTree(width / 2, height*0.9, 90, 6);
  drawTree(width / 2, height, 90, depthStart);
}

function drawLine(x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  strokeWeight(depth);
  line(x1, y1, x2, y2);
  strokeWeight(1);
}

function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle)) * depth * scale); //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle)) * depth * scale); //using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth);
    
    let controlAngle = map(mouseX, 0, width, 10, 60);
    //for a 3-branch tree:
    drawTree(x2, y2, angle - controlAngle, depth - 1);
    drawTree(x2, y2, angle               , depth - 1);
    drawTree(x2, y2, angle + controlAngle, depth - 1);
    
    drawLeaf(x2, y2, depth);
  }
}


function drawLeaf(x, y, depth) {
  if (depth < noLeavesDepth ) {
    fill(random(255), random(255), random(255));
    let size = (random(10, 12));
    let gradient = drawingContext.createRadialGradient(x, y, size/3, x, y, size);
    fill(gradient);
    circle(x, y, size*depth);
  }
  // implicit base
}


function keyPressed() {
  if (keyCode === 90 && noLeavesDepth !== 1) {
    noLeavesDepth--;
  }
  if (keyCode === 88 && noLeavesDepth !== depthStart+1) {
    noLeavesDepth++;
  }
}