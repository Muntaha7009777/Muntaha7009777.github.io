// Interactive Scene
// Muntaha Chowdhury
// Sep 16, 2024
// An interactive scene which can be controlled by both mouse and keyboard


let currentBack = 3;
let currentSky = 0;
let flowersCollected = 0;
let charX;
let charY;
let charSize = 50;
let moveBy = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  charX = width / 2;
  charY = height / 2;
}

function draw() {
  background(220); //fallback bg
  setSkyBg();
  setSkylineBg();
  setGardenBg();
  manageChar();
  // setFlowerCounter();
  // flowerPopup();
  // displayFlower();

  noStroke();
  fill(0);
  textSize(12);
  text('Muntaha Chowdhury', width - 120, height - 10);
  fill(0); text((mouseX + ', ' + mouseY), mouseX, mouseY);
}



// Backgorund stuff ======================================================================================================
function setGardenBg() {
  // Sets background of garden according to currentBack

  if (currentBack === 0) {
    fill(152, 242, 136);
    rect(0, height, width, -(height) * 2 / 3)
  }
  if (currentBack === 1) {
    fill(182, 147, 255);
    rect(0, height, width, -(height) * 2 / 3)
  }
  if (currentBack === 2) {
    fill(255, 237, 120);
    rect(0, height, width, -(height) * 2 / 3)
  }
  if (currentBack === 3) {
    fill(250, 250, 250);
    rect(0, height, width, -(height) * 2 / 3)
  }
}

function setSkyBg() {
  noStroke();

  if (currentSky === 0) {   //morning
    fill(199, 247, 255);
    rect(0, 0, width, height / 3);
    fill(255, 203, 0);
    circle(width / 2, 0, 200);
  }
  else {                   //night
    fill(82, 104, 130);
    rect(0, 0, width, height / 3);
    fill(255);
    circle(width / 2, 0, 200);
  }
}

function setSkylineBg() {
  randomSeed(8);

  // Green - mountains
  if (currentBack === 0) {
    fill(72, 90, 56);
    ellipse((width - width / 3), height / 3, width, height / 2);

    fill(72, 130, 56);
    ellipse(50, height / 3, width, height / 2.5);

    fill(72, 110, 56);
    ellipse(width - 50, height / 2.5, width, height / 2.5);


    for (let tree = 0; tree < 40; tree++) {
      let treeX = random(0, width);
      let treeY = random(height / 3, height / 6.5);
      fill(255 - (tree * 2), 184, 245);
      triangle(treeX - 6, treeY, treeX + 6, treeY, treeX, treeY - 20);
      fill(0);
      rect(treeX - 1, treeY, 2, 5);
    }

  }

  // Purple - city
  else if (currentBack === 1) {
    for (let i = 0; i < width; i += 50) {
      fill(40, 57, 74);
      let buidingHeight = random(40, 130);
      rect(i, height / 3, 50, -buidingHeight);
    }

    for (let i = 0; i < width; i += 50) {
      let buidingHeight = random(20, 100);
      fill(56, 81, 105);
      rect(i - 5, height / 3, 50, -buidingHeight);
    }
  }

  // yellow - desert
  else if (currentBack === 2) {

    //pattern:       (bottom right)      (bottom left)               (top)

    fill(237, 206, 114);
    triangle(width / 2, height / 3, -40, height / 3, width / 6, height / 8);
    for (let cactus = 0; cactus < 5; cactus++) {
      let cactusX = random(width / 20, width / 2.5);
      let cactusY = random(height / 3.5, height / 5);
      fill(0, 255, 0);

      rect(cactusX, cactusY, 5, 25, 4, 4, 0, 0);
      rect(cactusX - 8, cactusY + 5, 20, 5, 4);
      rect(cactusX - 8, cactusY - 10, 5, 20, 4)
      rect(cactusX + 8, cactusY, 5, 10, 4)
    }

    fill(194, 148, 50);
    triangle(width + 20, height / 3, (width / 2) - 20, height / 3, (width - width / 6), height / 5);
    for (let cactus = 0; cactus < 5; cactus++) {
      let cactusX = random(width - width / 2, width - width / 8);
      let cactusY = random(height / 3, height / 5);
      fill(0, 255, 0);

      rect(cactusX, cactusY, 5, 25, 4, 4, 0, 0);
      rect(cactusX - 8, cactusY + 5, 20, 5, 4);
      rect(cactusX - 8, cactusY - 10, 5, 20, 4)
      rect(cactusX + 8, cactusY, 5, 10, 4)
    }

  }

  // white - snow
  else {

    // Igloo
    fill(220);
    circle(width / 4, height / 3, width / 3);

    fill(230);
    rect(width / 4, height / 3, 70, (-70), 0, 0, 100, 100);
    fill(220);
    rect(width / 3.75, height / 3, 50, (-60), 0, 0, 100, 100);

    rect(width - width / 3);
  }
}


// Manages flowers ======================================================================================================


// function displayFlower(xPos, yPos) {
//   // display + keeep track --- of the flowers on the top left 

//   stroke(0);
//   fill(150, 147, 255);

//   // Petals (top-left -> goes clockwise)
//   rect(xPos, yPos, -20);
//   rect(xPos, yPos, 20, -20);
//   rect(xPos, yPos, 20);
//   rect(xPos, yPos, -20, 20);

//   // center
//   fill(236, 247, 27);
//   circle(xPos, yPos, 10);
// }
// function flowerPopup() {
//   let time = Date.now();
//   if ((time)%100 === 0){
//     let flowerX = random(0, width);
//     let flowerY = random(0, height);
//     // console.log(flowerX, flowerY);
//     displayFlower(5, 4);
//   }
// }
function setFlowerCounter() {

  displayFlower((width - 80), 40);
  //amount collected
  fill(0);
  textSize(20);
  text(flowersCollected, width - 40, 45);
}


// Manage Character ======================================================================================================
function manageChar() {
  for (let i = 0; i < 4; i++) {
    stroke(152, 242, 136);
    fill(50, 100, 255);
    circle(charX, charY, 40);
  }

  if (mouseIsPressed && mouseX < charX + charSize && mouseX > charX - charSize && mouseY > charY - charSize && mouseY < charY + charSize) {
    charX = mouseX; charY = mouseY;
  }



}



// Interactivity ======================================================================================================
function mousePressed() {

  // change currentBack
  if (mouseButton === LEFT) {
    if (currentBack === 3) currentBack = 0;
    else currentBack += 1;
  }

  // Sun
  if (mouseY <= 100 && (mouseX >= (width / 2) - 100 && mouseY <= (width / 2) + 100)) {
    if (currentSky === 1) currentSky = 0;
    else {
      currentSky = 1;
      // let starsX = [];
      // let starsY = [];
      // for (let i = 0; i < 20; i++) {
      //   let x = random(0, width), y = random(0, height/4);
      //   starsX.push(x); starsY.push(y);
      // }
      // for (let j = 0; j < starsX.length; j++) {
      //   fill(255);
      //   circle(starsX[j], starsY[j], 20);
      // }
    };
  }

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) charY += moveBy;
  else if (keyCode === UP_ARROW) charY -= moveBy;
  else if (keyCode === RIGHT_ARROW) charX += moveBy;
  else if (keyCode === RIGHT_ARROW) charX -= moveBy;
}






/*

Plan

- Interactivity
  → Gardener


- Currently in progress
  → Design Backgrounds
  → Design Character
*/