// MouseWheel, Map, Lerp
// Muntaha Chowdury
// Sept 25, 2024
// 

let x, y;   //position of circle
let w = 50;      // width of the circle

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width/2;    y= height/2;
  noFill();
}

function draw() {
  // background(220);
  // movement
  x = lerp(x, mouseX, 0.12); 
  y = lerp(y, mouseY, 0.12);

  let r = map(x, 0, width, 0, 255);
  let g = map(y, 0, width, 0, 255);
  let b = map(x, 0, width, 255, 0);
  stroke(r,g,b);
  circle(x,y,w);
}


function mouseWheel(event){
  print(event.delta);
  if (event.delta > 0) {
    w -=10;
    if (w < 10) w = 10;
  }
  else w += 10;
  // pos: scroll down
  // neg: scroll up
}