// Interactive Scene
// Muntaha Chowdhury
// Sep 16, 2024
// An interactive scene which can be controlled by both mouse and keyboard.


// Variables ======================================================================================================
// Bg
let currentBack = 0;
let currentSky = 0;
let showInstruc = false;

// Character
let charX;
let charY;
let charSize = 40;

// Movement
let moveBy = 10;
let dir = 'left';
let trackMouse;

// Flower
let flowerPosX = [];
let flowerPosY = [];
let flowerSize = 10;
let flowersCollected = 0;
let chompNoise;




// Setup code ======================================================================================================
function setup() {
  // sets the canvas and initializes some variables

  createCanvas(windowWidth, windowHeight);
  charX = width / 2;
  charY = height / 2;
  loadChompNoise();
}


function draw() {
  // calls and manages the order of functions
  background(220); //fallback bg

  // Background
  setSkyBg();
  setSkylineBg();
  setGardenBg();

  // Main stuff
  displayFlower();
  flowersEatenCounter();
  manageChar();
  displayInstructions();

  // Signature
  signName();
}




// Backgorund stuff ======================================================================================================
function setGardenBg() {
  // Sets lower background according to currentBack

  // field
  if (currentBack === 0) {    //mountain -green
    fill(152, 242, 136);
    rect(0, height, width, -(height) * 2 / 3);
    stroke(52, 61, 53);
  }
  if (currentBack === 1) {    //city -blue
    fill(120, 145, 148);
    rect(0, height, width, -(height) * 2 / 3)
    stroke(23, 35, 46);
  }
  if (currentBack === 2) {    //desert -yellow
    fill(255, 237, 120);
    rect(0, height, width, -(height) * 2 / 3)
    stroke(128, 116, 82);
  }
  if (currentBack === 3) {    //igloo -white
    fill(250, 250, 250);
    rect(0, height, width, -(height) * 2 / 3)
    stroke(191, 200, 201);
  }

  // road
  strokeWeight(100);
            //start             inclination for 1st point     inclination for 2nd point         end
  bezier(width, height / 2.25,   width / 10, height / 2,     width - width / 10, height,     0, height);
  strokeWeight(1);
}


function setSkyBg() {
  // reverts from day to night according to currentSky
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
  // changes scenery based on currentBack
  randomSeed(8);

  if (currentBack === 0) {          // Green - mountains
    // --hills
    fill(72, 90, 56);
    ellipse((width - width / 3), height / 3, width, height / 2);

    fill(72, 130, 56);
    ellipse(50, height / 3, width, height / 2.5);

    fill(72, 110, 56);
    ellipse(width - 50, height / 2.5, width, height / 2.5);

    // --trees
    for (let tree = 0; tree < 40; tree++) {
      let treeX = random(0, width);
      let treeY = random(height / 3, height / 6.5);
      fill(255 - (tree * 2), 184, 245);
      triangle(treeX - 6, treeY, treeX + 6, treeY, treeX, treeY - 20); //top
      fill(0);
      rect(treeX - 1, treeY, 2, 5); //bark
    }
  }


  else if (currentBack === 1) {     // Blue - city
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


  else if (currentBack === 2) {     // yellow - desert
    //pattern for triangle:       (bottom right)      (bottom left)           (top)
    // Hills
    fill(237, 206, 114);
    triangle(width / 2, height / 3, -40, height / 3, width / 6, height / 8);

    fill(194, 148, 50);
    triangle(width + 20, height / 3, (width / 2) - 20, height / 3, (width - width / 6), height / 5);


    // Cactus
    for (let cactusA = 0; cactusA < 5; cactusA++) {
      let cactusAX = random(width / 20, width / 2.5);
      let cactusAY = random(height / 3.5, height / 5);
      fill(0, 255, 0);

      rect(cactusAX, cactusAY, 5, 25, 4, 4, 0, 0);
      rect(cactusAX - 8, cactusAY + 5, 20, 5, 4);
      rect(cactusAX - 8, cactusAY - 10, 5, 20, 4)
      rect(cactusAX + 8, cactusAY, 5, 10, 4)
    }

    for (let cactusB = 0; cactusB < 5; cactusB++) {
      let cactusBX = random(width - width / 2, width - width / 8);
      let cactusBY = random(height / 3, height / 5);
      fill(0, 255, 0);

      rect(cactusBX, cactusBY, 5, 25, 4, 4, 0, 0);
      rect(cactusBX - 8, cactusBY + 5, 20, 5, 4);
      rect(cactusBX - 8, cactusBY - 10, 5, 20, 4)
      rect(cactusBX + 8, cactusBY, 5, 10, 4)
    }
  }


  else {                           // white - snow
    // Igloo
    fill(220);
    circle(width / 4, height / 3, width / 3);

    //door
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

      for (let leaf = 0; leaf < treeOriginY / 1.5; leaf += 1) {  // left
        let leafLength = random(20 - leaf / 6, 40 - leaf / 6)
        //          Inner                         Outer
        line(treeOriginX, (treeOriginY - 20 - leaf), treeOriginX - leafLength, (treeOriginY - 5 - leaf));
      }
      
      for (let leaf = 0; leaf < treeOriginY / 1.5; leaf += 1) {  // right
        let leafLength = random(20 - leaf / 6, 40 - leaf / 6)
        //          Inner                            Outer
        line(treeOriginX, (treeOriginY - 20 - leaf), treeOriginX + leafLength, (treeOriginY - 5 - leaf));
      }

      noStroke();
    }
  }
}




// Manages flowers ======================================================================================================
function drawFlower(xPos, yPos) {
  // draws the flower

  stroke(0);
  fill(150, 147, 255);

  // Petals (top-left -> goes clockwise)
  rect(xPos, yPos, -flowerSize);
  rect(xPos, yPos, flowerSize, -flowerSize);
  rect(xPos, yPos, flowerSize);
  rect(xPos, yPos, -flowerSize, flowerSize);

  // center
  fill(236, 247, 27);
  circle(xPos, yPos, flowerSize / 2);
}


function displayFlower() {
  // Flowers popup and stay till eaten

  // Not eaten flowers
  for (let flower = 0; flower < flowerPosX.length; flower++) {
    drawFlower(flowerPosX[flower], flowerPosY[flower]);
  }

  // Flowers popup after a few frames
  if (frameCount % 200 !== 0) return;
  randomSeed(frameCount * frameCount);
  let xPos = random(0, width), yPos = random(height / 3, height);
  flowerPosX.push(xPos);
  flowerPosY.push(yPos);
}


function removeFlower(xPosToRemove, yPosToRemove) {
  // removes flower if character is on it

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
  //keeep track of the flowers eaten on the top left 
  drawFlower(20, 20);
  fill(0);
  noStroke();
  text(('x' + flowersCollected), 35, 25);
}




// Manage Character ======================================================================================================
function manageChar() {
  // Handles functions related to Character (Design, Movement, Eating)
  drawChar();
  moveChar()

  // eats flowers
  for (let index = 0; index < flowerPosX.length; index++) {
    if (onFlower(index)) {
      removeFlower(flowerPosX[index], flowerPosY[index]);
    }
  }
}


function drawChar() {
  // draw character
  randomSeed(8);

  // -- body
  noStroke();
  fill(255, 0, 0);
  rect(charX, charY, charSize, charSize - 10, 100, 100, 0);

  // -- spots
  fill(0);
  for (let spot = 0; spot < 3; spot++) {
    let spotXPos = random(charX + charSize / 10, charX + charSize * 9 / 10);
    let spotYPos = random(charY + charSize / 5, charY + charSize - 16);
    circle(spotXPos, spotYPos, charSize / 5);
  }

  // -- legs
  for (let leg = 0; leg < 4; leg++) {
    rect(charX + (leg * charSize / 4), charY + charSize - 10, charSize / 6, charSize / 6, 0, 0, 10, 10);
  }

  // -- head
  fill(0);
  if (dir === 'right') rect(charX + charSize / 1.25, charY + charSize / 4, charSize / 2, charSize / 2, 100);
  else if (dir === 'left') rect(charX - charSize / 2.5, charY + charSize / 4, charSize / 2, charSize / 2, 100);


  // -- head + eyes + mouth
  fill(255);
  if (dir === 'right') {
    circle(charX + charSize, charY + charSize / 2.25, charSize / 15);
    circle(charX + charSize + charSize / 7, charY + charSize / 2.25, charSize / 15);
    rect(charX + charSize + 2, charY + charSize / 2, charSize / 15)
  } else if (dir === 'left') {
    circle(charX - charSize / 3.75, charY + charSize / 2.25, charSize / 15);
    circle(charX - charSize / 10, charY + charSize / 2.25, charSize / 15);
    rect(charX - charSize / 5, charY + charSize / 2, charSize / 15)
  }
}


function moveChar() {
  // moves character usign mouse and keyboard

  // --mouse
  if (mouseIsPressed && onChar()) {
    if (mouseX < trackMouse) dir = 'left';
    else dir = 'right';
    charX = mouseX; charY = mouseY;
  }

  // --keyboard
  if (keyIsPressed) {
    if (keyCode === DOWN_ARROW) charY += moveBy;
    else if (keyCode === UP_ARROW) charY -= moveBy;
    else if (keyCode === RIGHT_ARROW) charX += moveBy, dir = 'right';
    else if (keyCode === LEFT_ARROW) charX -= moveBy, dir = 'left';
  }

  fixCharPos();
}


function fixCharPos() {
  // deals with character moving out of screen
  if (charX > width) charX = 0;
  if (charX < 0) charX = width;
  if (charY > height) charY = 0;
  if (charY < 0) {
    charY = height;
    moveBy = 0;
    alert('You flew off to space. Reload to come back to life');
  }
}




// Interactivity ======================================================================================================
function mousePressed() {
  // User interactions using mouse
  trackMouse = mouseX;  //helps to change direction of character when dragged

  // Background
  if (mouseButton === CENTER) {
    if (currentBack === 3) currentBack = 0;
    else currentBack += 1;
  }

  // Day to night
  if (onSun()) {
    if (currentSky === 1) currentSky = 0;
    else {
      currentSky = 1;
    };
  }

  // Instructions
  if (onInstruc()) {
    showInstruc = !showInstruc;
  }
}


function keyPressed() {
  // user interactions using keyboard

  // Manage Speed
  if (key === 'a' || key === 'A') {
    moveBy -= 5;
    if (moveBy < 0) moveBy = 0;
  }

  else if (key === 'd' || key === 'D') {
    moveBy += 5;
    if (moveBy > 20) moveBy = 20;
  }


  // Managae Size
  if (key === 'w' || key === 'W') {
    charSize -= 5;
    if (charSize < 30) charSize = 30;
  }

  else if (key === 's' || key === 'S') {
    charSize += 5;
    if (charSize > 80) charSize = 80;
  }
}


function mouseWheel() {
  // descrease size based on scrolling

  // --scroll down (-)
  if (event.delta < 0) {
    charSize -= 5;
    if (charSize < 30) charSize = 30;
  }

  // --scroll up (+)
  else if (event.delta > 0) {
    charSize += 5;
    if (charSize > 80) charSize = 80;
  }
}




// Conditionals ======================================================================================================

function onSun() {
  // checks if mouse on sun
  if (mouseY <= 100 && (mouseX >= (width / 2) - 100)) {
    if (mouseY <= (width / 2) + 100) return true;
  }
  return false;
}

function onChar() {
  // checks if mouse on character
  if (mouseX < charX + charSize && mouseX > charX - charSize) {
    if (mouseY > charY - charSize && mouseY < charY + charSize) return true;
  }
  return false;
}

function onFlower(index) {
  // checks if character on flower
  if (charX <= flowerPosX[index] + charSize * 2 / 3 && charX >= flowerPosX[index] - charSize * 2 / 3) {
    if (charY <= flowerPosY[index] + charSize * 2 / 3 && charY >= flowerPosY[index] - charSize * 2 / 3) return true;
  }
  return false;
}

function onInstruc() {
  // checks if mouse on instruction box
  if (mouseX < 30 && mouseX > 10) {
    if (mouseY < 55 && mouseY > 35) {
      return true;
    }
  }
  return false;
}



// Miscellaneous ======================================================================================================
function loadChompNoise() {
  // loads the chomp noise for setup
  soundFormats('mp3');
  chompNoise = loadSound('sound/chomp');
}


function displayInstructions() {
  // displays instructions

  // box at top-left
  stroke('gold');
  fill(236, 237, 164);
  rect(10, 35, 20);

  fill('gold');
  text('?', 17, 50);


  // box at bottom left
  if (showInstruc) {
    // Box
    fill(236, 237, 164);
    rect(0, height - 150, 300, 150);
    line(150, height - 10, 150, height - 140);

    // text
    fill(199, 179, 36);
    textSize(10);

    // --Mouse    
    text('Mouse 🖱️', 20, height - 130);
    text('Left and hold: Drag bug ', 20, height - 100);
    text('Middle: Change Bg ', 20, height - 80);
    text('Scroll: Control Size ', 20, height - 60);

    // --Keyboard
    text('Keyboard ⌨️', 170, height - 130);
    text('Arrows: Move', 170, height - 100);
    text('A: Slow down', 170, height - 80);
    text('D: Speed up', 170, height - 60);
    text('W: Smaller Bug', 170, height - 40);
    text('S: Bigger Bug', 170, height - 20);

  }
}


function signName() {
  // puts name on bottom right of screen
  noStroke();
  fill(0);
  textSize(12);
  text('Muntaha Chowdhury', width - 120, height - 10);
}
