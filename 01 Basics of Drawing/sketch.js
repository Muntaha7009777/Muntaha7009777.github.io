// Basics of Drawing
// Muntaha Chowdhury
// Sept 11. 2024
//
// 2D Primitives, color, animation, mouse/keyboard events


function setup() {
  //Happens once, at the *very* start
  createCanvas(500, 400);   //width → width of canvas
                            //height → height of canvas
}

function draw() {
  //when possible, try to keep draw() clean...
  background(220);
  drawCircles();
}

function drawCircles() {
  //contains the code to draw 5 circles
  fill(70, 160, 255);
  circle(0,0,50);

  fill(150, 255, 90); // rgb
  circle(100, 50, 30);
  
  // Challenge part: Draw 5 circles
  fill(160, 70, 255);
  circle(0, 0, 50);

  fill(255, 160, 75);
  circle(0, height, 50);

  fill(70, 253, 160);
  circle(width, 0, 50);

  fill(10, 91, 200);
  circle(width, height, 50);

  fill(70, 160, 255);
  circle((width/2), (height/2), 50);  

  //draw a circle 2/3 across the screen horizontally
  fill(155, 255, 255);
  circle((width*0.66), (height/2), 50);
}
