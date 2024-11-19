// Balloon tree
// Muntaha Chowdhury
// 13 November, 2024
// Ballon tree whose spread depends on mouse and leaves depend on Z/X

let scale = 20;
let leavesDepth = 5;
let depthStart = 6;
let seed; 



function setup() {
  createCanvas(windowWidth, windowHeight);
  seed = random(60);
}


function draw() {
  background(255);
  randomSeed(seed); //to stop randomizing every frame
  drawTree(width / 2, height, 90, depthStart);
}



// Drawing Funtions --------------------------------------------------------------------------------

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
    
    //for a 3-branch tree whose spread is dependent on mouseX
    let controlAngle = map(mouseX, 0, width, 10, 40);
    drawTree(x2, y2, angle - controlAngle, depth - 1);
    drawTree(x2, y2, angle               , depth - 1);
    drawTree(x2, y2, angle + controlAngle, depth - 1);
    
    // draw the leaf for this branch
    drawLeaf(x2, y2, depth);
  }
  // implicit base
}


function drawLeaf(x, y, depth) {
  // draws leaf with a gradient, only if allowed (by leavesDepth)
  if (depth < leavesDepth ) {
    let size = random(35, 40);
    gradientFill(x, y, size);
    circle(x, y, (size*depth)/3.75);
  }
}



// Color and Interactive Spread -------------------------------------------------------------------------------

function gradientFill(x, y, s) {
  // make a linear gradient for the balloons
  let gradient = drawingContext.createLinearGradient(x-s, y-s, x+s, y+s);
  let colorFill = color(random(255), random(255), random(255));

  gradient.addColorStop(0, color(255, 249, 240));
  gradient.addColorStop(0.5, colorFill);
  gradient.addColorStop(1, colorFill);

  drawingContext.fillStyle = gradient;
}


function keyPressed() {
  // change up to which depth the leaves appear
  if (keyCode === 90 && leavesDepth !== 1) {
    leavesDepth--;
  }
  if (keyCode === 88 && leavesDepth !== depthStart+1) {
    leavesDepth++;
  }
}
