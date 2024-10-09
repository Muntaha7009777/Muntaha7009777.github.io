// Drawing with Nested Loops
// Muntaha Chowdhury
// October 9, 2024

// Global Variable
let gridSpacing = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  renderGrid();
}


function circleDistance(x1, y1, x2, y2) {
  // takes in two endpoints and returns the straightline distance between them
  // Our answer will be rounded...
  let a = abs(x1 - x2);
  let b = abs(y1 - y2);
  let c = sqrt(pow(a, 2) + pow(b, 2));
  return round(c);
}


function loopReview() {
  // quick nested loop practice (x,y)
  for (let x = 0; x < 4; x++) {  //x: 0, 1, 2, 3
    for (let y = 0; y < 4; y++) { //y: 0, 1, 2, 3
      print(x, y);
    }
  }
}



function renderGrid() {
  // use nested loops to create a grid of shapes...
  for (let x = 0; x < width; x = x + gridSpacing) {
    for (let y = 0; y < height; y = y + gridSpacing) {
      
      let d = circleDistance(x, y, mouseX, mouseY);

      if (d > 150) {      //set fill for color according to mouse proximity
        fill(0);
      } 
      else {
        fill(200, 50, 120);
      }
      circle(x, y, gridSpacing);  //


      fill(200);                  //display distance of each circle to the mouse
      textSize(gridSpacing / 2);
      textAlign(CENTER, CENTER);
      text(d, x, y);
    }
  }
}