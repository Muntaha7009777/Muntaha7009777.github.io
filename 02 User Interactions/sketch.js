// User Events
// Muntaha Chowdhury
// Sept.12.2024
// Short summary here

let tSize = 40;
let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //Mouse Section
  // if (mouseIsPressed) tSize = random(20, 80);
  fill(0);
  textSize(tSize);
  text((mouseX + ", " + mouseY), mouseX, mouseY);

  //SHAPES
  fill(255, 0, 0);
  circle(width*0.5, height*0.5, 100);

  fill(0, 255, 0);

  x = x + 10;
  if (x > width) x = 0;
  rect(x, height/2, 60);
}

function mousePressed() {
  //this is called AUTOMATICALLY!!!
  tSize = random(20,80);
}