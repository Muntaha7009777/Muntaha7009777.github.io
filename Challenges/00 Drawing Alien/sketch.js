// Challenge: Drawing an Alien
// Muntaha Chowdhury
// Sep 13, 2024
// Use Shapes to draw an alien that is scalable and movable



/*

Plan:

- introduce variables
  → x (reference point)
  → radius (also used as rectangle height and doubled to be rectangle width)  [!!!ask through browser]
  → moveX, moveY

- create shapes
  → circle
  → rectangle
  → 2x rectangle (legs)
  → eyes
  → mouth

- introduce scalability
  → function that changes size [!!!add a button]

- functions for moving
  → keyboard and mouse

*/


let radius = 100;                      // main reference length for scalability

function setup() {
  createCanvas(windowWidth, windowHeight);
}

//----Variables for interactions
let refX = width/2, refY = height/2;  // reference point
let moveX = 10, moveY = 10;           // movement


function draw() {
  background(220);
  drawShape();
  // moveAlien();
}


function drawShape() {
  // draws alien

  //---body
  fill(170, 255, 170);
  noStroke();

  // legs
  rect((width/2)-50, height/2, 10, 75);   //my left
  rect((width/2)+50, height/2, -10, 75);  //my right

  // body
  rect((width/2)-50, height/2, 100, 100/2);

  // head (circle)
  circle(width/2, height/2, radius);

  //---facial features
  fill(0);

  // eyes
  circle((width/2)-25, height/2, 10);   //my left
  circle((width/2)+25, height/2, 10);   //my right

  // mouth
  rect((width/2), (height/2)+25, 20, 5, 5);
}



// function moveAlien() {

// }

