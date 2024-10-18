// Cars Cars Cars
// Muntaha Chowdhury
// Occt 18, 2024
// ADD SOMETHING HERE

let carSize = 50;
let truckSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);
  // drawRoad();
  drawVehicle(0, width/2, height/2);
}



function drawRoad() {
  // draw road with line
  fill(0);
  rect(width/2, height/2, width, height*(2/4));

  fill('yellow');
  noStroke();
  for (let i = 0; i < width ; i+=25) {
    rect(i, height/2, 15, 3);
  }
}


function drawVehicle(choice, x, y) {
  // draw 0-car 1-truck
  if (choice === 0) {           //car

    fill('brown');
    rect(x, y, carSize+carSize/2, carSize, 6);
    fill(0);
    rect(x+carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 2);      //front window
    rect(x-carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 2);   //back window
    arc(x, y-carSize/2.5, carSize, 10, 0, PI);             //left window
    arc(x, y+carSize/2.5, carSize, 10, PI, 0);             //left window

  }
  else if (choice === 1) {      //truck

  }
}