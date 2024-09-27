// Perlin Noise Demo
// Muntaha Chowdhury
// Sept 27, 2024
// noise() vs random()


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2);
}

function draw() {
  background(255);
  line(width/2, 0, width/2, height);

  //random()
  randomCircle()

  //noise()
}



function randomCircle() {
  // draw a circle on the screen, using random values for the diameter (later, color)
  let cSize = random(10, 200);
  circle(width*0.25, height/2, cSize);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(round(cSize), width*0.25, height/2);
}