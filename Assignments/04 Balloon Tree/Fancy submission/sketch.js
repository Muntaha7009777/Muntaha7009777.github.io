// Balloon tree
// Muntaha Chowdhury
// 13 November, 2024
// Ballon tree that changes based on keypresses and mouse movements

let scale = 20;
let noLeavesDepth = 5;
let depthStart = 6;
let seed;
let pic;

function preload() {
  pic = loadImage('/assets/images/leaf.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  seed = random(60);
}

function draw() {
  background(255);
  randomSeed(seed);
  drawTree(width / 2, height, 90, depthStart);
}

function drawLine(x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  strokeWeight(depth);
  line(x1, y1, x2, y2);
  strokeWeight(1);
}




function drawTree(x1, y1, angle, depth) {
  // Recursive function that draws branches and balloon leaves
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle)) * depth * scale); //calculate endpoints of current branch
    let y2 = y1 - (sin(radians(angle)) * depth * scale); //using trig ratios. Get shorter based on depth
    drawLine(x1, y1, x2, y2, depth);
    
    //for a 3-branch tree:
    let controlAngle = map(mouseX, 0, width, 10, 40);
    drawTree(x2, y2, angle - controlAngle, depth - 1);
    drawTree(x2, y2, angle               , depth - 1);
    drawTree(x2, y2, angle + controlAngle, depth - 1);
    
    drawLeaf(x2, y2, depth);
  }
}

function drawLeaf(x, y, depth) {
  if (depth < noLeavesDepth ) {
    let size = random(10, 12);
    tint(random(255), random(255), random(255));
    imageMode(CENTER);
    image(pic, x, y, depth*size*2, depth*size*2);;
  }
  // implicit base
}

function gradientFill(x, y, s) {
  // make a linear gradient for the balloons
  let gradient = drawingContext.createLinearGradient(x-s, y-s, x+s, y+s);
  let colorFill = color(random(255), random(255), random(255));

  gradient.addColorStop(0, color(255, 249, 240));
  gradient.addColorStop(0.5, colorFill);
  gradient.addColorStop(1, colorFill);

  drawingContext.fillStyle = gradient;
  return colorFill;
}

function keyPressed() {
  // change at what level the leaves stop appearing
  if (keyCode === 90 && noLeavesDepth !== 1) {
    noLeavesDepth--;
  }
  if (keyCode === 88 && noLeavesDepth !== depthStart+1) {
    noLeavesDepth++;
  }
}