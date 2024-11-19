// Balloon tree
// Muntaha Chowdhury
// 13 November, 2024
// Ballon tree whose spread depends on mouse and leaves depend on Z/X

let scale = 20;
let noLeavesDepth = 5;
let depthStart = 6;
let seed;
let pic;




function preload() {
  // load an image beforehand
  pic = loadImage('/assets/images/leaf.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  seed = random(60);
}

function draw() {
  background(255);
  randomSeed(seed);  //to stop randomizing every frame
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
}


function drawLeaf(x, y, depth) {
  // places leaf image with a tint, only if allowed (by leavesDepth)
  if (depth < noLeavesDepth ) {
    let size = random(10, 12);
    tint(random(255), random(255), random(255));
    image(pic, x, y, depth*size*2, depth*size*2);;
  }
}




// Interactive Spread -------------------------------------------------------------------------------


function keyPressed() {
  // change up to which depth the leaves appear
  if (keyCode === 90 && noLeavesDepth !== 1) {
    noLeavesDepth--;
  }
  if (keyCode === 88 && noLeavesDepth !== depthStart+1) {
    noLeavesDepth++;
  }
}