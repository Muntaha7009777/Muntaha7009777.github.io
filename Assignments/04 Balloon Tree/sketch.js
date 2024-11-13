// Balloon tree
// Muntaha Chowdhury
// 13 November, 2024
// ADD STATEMENT HERE
/* eslint-disable no-extra-parens */


let scale = 20;

function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  randomSeed(58);
  // drawTree(width / 2, height*0.9, 90, 6);
  drawTree(width / 2, height, 90, 6);
}

function drawLine(x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  line(x1, y1, x2, y2);
}

function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle)) * depth * scale); //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle)) * depth * scale); //using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth);
    drawLeaf(x2, y2, scale*2);


    //for a 3-branch tree:
    drawTree(x2, y2, angle - 24, depth - 1);
    drawTree(x2, y2, angle      ,depth - 1);
    drawTree(x2, y2, angle + 24, depth - 1);
  }
}


function drawLeaf(x, y, d) {
  circle(x, y, d);
}