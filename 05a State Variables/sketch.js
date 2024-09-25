// State Variables
// Muntaha Chowdhury
// Sept 25, 2024
// 

// global variables
let currentColor = 0;  //0, 1, 2
let myColor;
let circleSize = 50;
let growing = false;  //2-star variable

function setup() {
  createCanvas(windowWidth, windowHeight);
  myColor = color(200, 120, 210);
}

function draw() {
  background(220);
  // circle code - fill color. using switch statement
  switch(currentColor) {  //branches based on currentColor
    case 0:
      fill(255,0,0);
      break;
    case 1:
      fill(myColor);
      break;
    case 2:
      fill(0, 50, 210);
      break;
  }


  if(frameCount % 30 === 0){      //true once every 10 frames
    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    currentColor +=1;
    if (currentColor > 2) currentColor = 0;
  }


  // circle-code - modify circle size
  if (growing) circleSize +=2;
  else circleSize -=2;  // holded in on itself and expanded


  //circle code - drawing the circle
  circle(width/2, height/2, circleSize);
}


function keyPressed() {   
  //gets called automatically, once per keypress
  if (key === "a") {
    growing = !growing;   // set growing to not growing...
  }
}