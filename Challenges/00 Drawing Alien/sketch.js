// Challenge: Drawing an Alien
// Muntaha Chowdhury
// Sep 13, 2024
// Use Shapes to draw an alien that is scalable and movable


//----Variables for interactions
let radius = 100;                      // main reference length for scalability
let refX, refY;                        // reference point
let moveX = 5, moveY = 5;            // movement


function setup() {
  createCanvas(windowWidth, windowHeight);
  refX = width / 2;
  refY = height / 2;
}


function draw() {
  background(220);
  instructions();
  drawShape();
  moveAlien();  // keyPressed() wasn't used to allow smoother movement
}



function instructions() {
  textSize(10);
  text('Use Keyboard/mouse to move', 20, 20);

  let scaler = createButton('Change alien size');
  scaler.style('font-size', '10px');
  scaler.style('color', color(0, 120, 200));
  scaler.position(20, 30);
  scaler.mousePressed(changeSize);
}

function changeSize() {
  radius = prompt('Enter a number');
  print(radius);
}



function drawShape() {
  // draws alien

  //body----------------------------------------------------------
  fill(170, 255, 170);
  noStroke();

  // legs
  rect(refX - (radius / 2), refY, radius / 10, radius * 3 / 4);   //my left
  rect(refX + (radius / 2), refY, -radius / 10, radius * 3 / 4);  //my right

  // body
  rect(refX - (radius / 2), refY, radius, radius / 2);

  // head (circle)
  circle(refX, refY, radius);


  //facial features-----------------------------------------------
  fill(0);

  // eyes
  circle(refX - (radius / 4), refY, radius / 10);   //my left
  circle(refX + (radius / 4), refY, radius / 10);   //my right

  // mouth
  rect(refX, (refY) + (radius / 4), radius / 4, radius / 20, 5);
}



function moveAlien() {
  // function for moving alien by mouse and keyboard

  //KeyBoard----------------------------------------------------
  if (keyIsPressed) {
    // X-axis
    if (keyCode === LEFT_ARROW) {
      refX -= moveX;
    } else if (keyCode === RIGHT_ARROW) {
      refX += moveX;
    }

    // Y-axis
    if (keyCode === UP_ARROW) {
      refY -= moveY;
    } else if (keyCode === DOWN_ARROW) {
      refY += moveY;
    }
  }


  //Mouse----------------------------------------------------
  if (mouseIsPressed) {
    let distanceX = mouseX - refX;
    let distanceY = mouseY - refY;
    refX += distanceX;
    refY += distanceY;
  }


  //Fix position-------------------------------------------
  if (refX > width) refX = 0;
  if (refX < 0) refX = width;
  if (refY > height) refY = 0;
  if (refY < 0) refY = height;
}