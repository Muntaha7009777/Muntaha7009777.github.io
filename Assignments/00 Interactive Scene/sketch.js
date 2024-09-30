// Interactive Scene
// Muntaha Chowdhury
// Sep 16, 2024
// An interactive scene which can be controlled by both mouse and keyboard


let currentBack = 0;
let currentSky = 0;
let flowersCollected = 0;
let charX;
let charY;
let charSize = 50;
let moveBy = 10;
let flowerPosX = [];
let flowerPosY = [];
let dir = 'left';
let chompNoise;

function setup() {
  createCanvas(windowWidth, windowHeight);
  charX = width / 2;
  charY = height / 2;
  loadChompNoise();
}

function draw() {
  background(220); //fallback bg

  // Background
  setSkyBg();
  setSkylineBg();
  setGardenBg();

  // Main stuff
  displayFlower();
  manageChar();

  noStroke();
  fill(0);
  textSize(12);
  text('Muntaha Chowdhury', width - 120, height - 10);
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
    rect(width / 4, height / 3, width / 8, -width / 9, 0, 0, 100, 100);
    fill(220);
    rect(width / 3.75, height / 3, width / 11, -width / 10, 0, 0, 100, 100);

    // trees
    for (let i = 0; i < width / 3; i += 40) {
      let treeOriginX = width - width / 4 + i;
      let treeOriginY = height / 3;
      fill('brown');
      rect(treeOriginX, treeOriginY, 3, -height / 6);
      stroke(18, 53, 36);
      // left
      for (let leaf = 0; leaf < treeOriginY / 1.5; leaf += 1) {
        let leafLength = random(20 - leaf / 6, 40 - leaf / 6)
        //          Inner                         Outer
        line(treeOriginX, (treeOriginY - 20 - leaf), treeOriginX - leafLength, (treeOriginY - 5 - leaf));
      }
      // right
      for (let leaf = 0; leaf < treeOriginY / 1.5; leaf += 1) {
        let leafLength = random(20 - leaf / 6, 40 - leaf / 6)
        //          Inner                            Outer
        line(treeOriginX, (treeOriginY - 20 - leaf), treeOriginX + leafLength, (treeOriginY - 5 - leaf));
      }

      noStroke();
    }
  }
}


// Manages flowers ======================================================================================================



// function setFlowerCounter() {

//   drawFlower((width - 80), 40);
//   //amount collected
//   fill(0);
//   textSize(20);
//   text(flowersCollected, width - 40, 45);
// }
function drawFlower(xPos, yPos) {
  // display + keeep track --- of the flowers on the top left 

  stroke(0);
  fill(150, 147, 255);

  // Petals (top-left -> goes clockwise)
  rect(xPos, yPos, -10);
  rect(xPos, yPos, 10, -10);
  rect(xPos, yPos, 10);
  rect(xPos, yPos, -10, 10);

  // center
  fill(236, 247, 27);
  circle(xPos, yPos, 5);
}

function displayFlower() {
  flowersEatenCounter();
  for (let flower = 0; flower < flowerPosX.length; flower++) {
    drawFlower(flowerPosX[flower], flowerPosY[flower]);
    // circle(flowerPosX[flower], flowerPosY[flower], 10);
  }
  if (frameCount % 200 !== 0) return;

  // Flower Popup
  randomSeed(frameCount * frameCount);
  let xPos = random(0, width), yPos = random(height / 3, height);
  flowerPosX.push(xPos);
  flowerPosY.push(yPos);


  // circle(xPos, yPos, 50);

  // let flowerX = random(0, width);
  // let flowerY = random(0, height);
  // // console.log(flowerX, flowerY);
  // drawFlower(5, 4);

}

function removeFlower(xPosToRemove, yPosToRemove) {
  let index = flowerPosX.indexOf(xPosToRemove);
  if (flowerPosY[index] === yPosToRemove) {
    let newPosX = flowerPosX.filter(pos => pos !== xPosToRemove);
    let newPosY = flowerPosY.filter(pos => pos !== yPosToRemove)
    flowerPosX = newPosX;
    flowerPosY = newPosY;
  }
  flowersCollected++;
  chompNoise.play();
}

function flowersEatenCounter() {
  drawFlower(width - 40, 20);
  fill(0); noStroke();
  text(('x' + flowersCollected), width - 20, 25);
}




// Manage Character ======================================================================================================
function manageChar() {
  randomSeed(8);

  // draw character

  // -- body
  noStroke();
  fill(255, 0, 0);
  rect(charX, charY, 40, 30, 100, 100, 0);

  // -- spots
  fill(0);
  for (let spot = 0; spot < 3; spot++) {
    let spotXPos = random(charX+4, charX+34);
    let spotYPos = random(charY+8, charY+20);
    circle(spotXPos, spotYPos, 8);
  }

  // -- legs
  for (let leg = 0; leg < 4; leg++) {
    rect(charX+(leg*10), charY+30, 6, 6, 0, 0, 10, 10);
  }

  // -- head
  fill(0);
  if (dir==='right') rect(charX + 30, charY + 10, 20, 20, 100);
  else if (dir==='left') rect(charX-15, charY + 10, 20, 20, 100);


  // -- eyes
  fill(255);
  if (dir === 'right') {
    circle(charX + 38, charY + 18, 3);
    circle(charX + 45, charY + 18, 3);
    rect(charX + 40, charY + 20, 3)
  } else if (dir === 'left') {
    circle(charX -2, charY + 18, 3);
    circle(charX - 9, charY + 18, 3);
    rect(charX - 7, charY + 20, 3)
  }
  // circle(charX + 38, charY + 18, 3);
  // circle(charX + 45, charY + 18, 3);
  // rect(charX + 40, charY + 20, 3)

  // moves
  if (mouseIsPressed && onChar()) {
    charX = mouseX; charY = mouseY;
  }

  // removes flowers
  for (let index = 0; index < flowerPosX.length; index++) {
    if (onFlower(index)) removeFlower(flowerPosX[index], flowerPosY[index]);
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
  if (onSun()) {
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
  else if (keyCode === RIGHT_ARROW) charX += moveBy, dir='right';
  else if (keyCode === LEFT_ARROW) charX -= moveBy, dir='left';
  fixCharPos();
}

function fixCharPos() {
  if (charX > width ) charX = 0;   
  if (charX < 0 ) charX = width; 
  if (charY > height ) charY = 0; 
  if (charY < 0 ) charY = height;   
}

function playSound() { }


// Sound ======================================================================================================
function loadChompNoise() {
  soundFormats('mp3', 'ogg');
  chompNoise = loadSound('sound/chomp');
}


// Conditionals ======================================================================================================

function onSun() {
  if (mouseY <= 100 && (mouseX >= (width / 2) - 100)) {
    if (mouseY <= (width / 2) + 100) return true;
  }
  return false;
}

function onChar() {
  if (mouseX < charX + charSize && mouseX > charX - charSize) {
    if (mouseY > charY - charSize && mouseY < charY + charSize) return true;
  }
  return false;
}

function onFlower(index) {
  if (charX <= flowerPosX[index] + 25 && charX >= flowerPosX[index] - 25) {
    if (charY <= flowerPosY[index] + 25 && charY >= flowerPosY[index] - 25) return true;
  }
  return false;
}

/*

Plan

- fix bg
- flowerScale   charScale   flowerSpeed   charSpeed
- comments
- clean code

*/