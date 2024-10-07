// Basic Transformations Sandbox
//    Translation,               Rotation,              Scale
//    modifies x,y               rotating           changing size


// Notes:
// Translation resets back to regular coordinate system at the top of draw
// Data structure called Stack
// Order in which yo apply them drastically affects the outcome
// These happen with respect to Origin
// Order of rotation and scale don't make a difference

let originalSpacing = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawBasicGrid(220);

  // //transformation one: TRANSLATION
  // push();       //makes a copy of current coordinate system
  // translate(120, 120);      //moves the origin 120, 120
  // drawBasicGrid(150);
  // rectangleRed(40, 20);
  // pop();       //revert back to previous coordinate system
  // rectangleBlue(40, 20);
  // //add push()  pop()




  // //transformation two: SCALE
  // push();
  // rectMode(CORNER);
  // rectangleRed(40, 0)
  // SCALE FACTORS:
  // 1 - no change            <1 smaller             >1 larger
  // let scaleAmount = 2.5;
  // scale(scaleAmount);
  // translate(100, 0);
  // drawBasicGrid(100);
  // rectangleBlue(0,0);   //50px square
  // rectMode(CENTER);
  // translate(40, 40);
  // let scaleAmount = map(mouseX, 0, width, 0, 4);
  // scale(scaleAmount);
  // drawBasicGrid(150);
  // rectangleRed(0, 0);
  // pop();

  // // transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees! Functions can help with the conversion...
  //can use angleMode(DEGREES) if we like
  angleMode(DEGREES);         //normally put in setup
  // push()
  // rectangleRed(20, 20);
  // translate(200, 200);
  // drawBasicGrid(180);
  // rotate(frameCount%360);
  // drawBasicGrid(140);
  // face(0,0);
  // pop()

  // //Combinations of Transformations
  // push();
  // scale(5);
  // rotate(45);
  // translate(100, 100);
  // face(0,0);
  // pop();



  // Drawing Challenge
  // let scaleAmount = map(mouseX, 0, width, 1, 4);
  let numSpokes = map(mouseX, 0, width, 0, 360);
  numSpokes = floor(numSpokes);
  
  translate(width/2, height/2);
  // scale(scaleAmount);
  circle(0, 0, 150);
  rotate(frameCount);
  for (let l = 0; l < numSpokes; l++) {
    rotate(360/numSpokes);
    line(0, 0, 75, 0);
    print(numSpokes, 360/numSpokes);
  }
}


function face(x, y) {
  //draw a face at x,y
  push();
  translate(x,y);
  ellipseMode(CENTER);
  fill(200,200,0);
  stroke(0);
  ellipse(0,0,80,80);
  fill(90, 140, 30, 220);
  triangle(-20, 20, 20, 20, 0, 30);
  fill(0);
  ellipse(-25,0,10,10);
  ellipse(25,0,10,10);
  strokeWeight(5);
  line(-30,-10,30,-10);
  strokeWeight(1);
  pop();

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }

  //Draw "X" at the origin
  strokeWeight(3);
  stroke(0);
  line(-5,0,5,0);
  line(0,5,0,-5);
  strokeWeight(1);
}