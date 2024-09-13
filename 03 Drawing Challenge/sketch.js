// Drawing Challenge
// Muntaha Chowdhury
// Sept 13, 2024
// Summary here

let rX = 50; let rY = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //moving rectangle
  if (keyIsPressed) { // [alt][shift][f] (format)
    if (key === "a") {
      rY += 10; //rY = + 10; 
      if (rY > height) rY = 0;
    }
  };

  fill(50, 150, 255);
  rect(rX, rY, 70, 25, 10, 0);
}

function keyPressed() {
  //don't call this function (it's automatic)
  if (keyCode === DOWN_ARROW) {
    rY += 100; //rY = + 10; 
  }
}
