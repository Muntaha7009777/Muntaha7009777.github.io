// Puzzle Game
// Muntaha Chowdhury
// 29 October, 2024
// A puzzle game where you have to get the entire board to be the same color. You can switch the flipping area (square and cross) or cheat by folding shift

let flipType = 0;     //0-cross     1-square
let xDir = 1;
let yDir = -1;

let NUM_ROWS = 4;
let NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let gridData = [[0,   0,   0,   0,  0],
                [0,   0,   0,   0,  0],
                [0,   255, 0,   0,  0],
                [255, 255, 255, 0,  0]];



function setup() {
  // Determine the size of each square. Could use windowHeight,windowHeight  for Canvas to keep a square aspect ratio
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  randomizeGrid();
}

function draw() {
  background(220);
  determineActiveSquare();   //figure out which tile the mouse cursor is over
  drawGrid();                //render the current game board to the screen (and the overlay)
  checkDir();
  overlayGuide();
  win();
}






function randomizeGrid() {
  // give the grid a random design
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let choice = round(random(0,1));
      if (choice === 1) choice = 255;
      gridData[y][x] = choice;
    }
  }
}

function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < NUM_COLS ; x++){
    for (let y = 0; y < NUM_ROWS; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}








function flip(col, row){
  // given a column and row for the 2D array, flip its value from 0 to 255 or 255 to 0
  // conditions ensure that the col and row given are valid and exist for the array. If not, no operations take place.
  if (col >= 0 && col < NUM_COLS ){
    if (row >= 0 && row < NUM_ROWS){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}


function mousePressed(){
  //  pattern flips on a mouseclick. Boundary conditions are checked within the flip function to ensure in-bounds access for array

  if (keyIsPressed && keyCode === SHIFT) {    //Cheater funcitonality
    flip(currentCol, currentRow);
  }
  else if (flipType === 0) {                  //cross
    flip(currentCol, currentRow);
    flip(currentCol-1, currentRow);
    flip(currentCol+1, currentRow);
    flip(currentCol, currentRow-1);
    flip(currentCol, currentRow+1);
  } 
  else {                                      //square
    flip(currentCol, currentRow);
    flip(currentCol+xDir, currentRow);
    flip(currentCol, currentRow+yDir);
    flip(currentCol+xDir, currentRow+yDir);
  }
}

function keyPressed() {
  // change the grid flipping pattern (cross or square)
  if (keyCode === 32) {
    if (flipType === 0) flipType = 1;
    else flipType = 0;
  }
}








function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}

function win() {
  // checks if the entire grid is the same
  let toMatch = gridData[0][0];

  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (gridData[y][x] !== toMatch) return;     //return if grid is not the same
    }
  }

  // The 'Win' text
  textSize(30);
  textAlign(CENTER);
  fill('green');
  text('You Win!', width/2, height/2);
  fill(0);
}






function checkDir() {
  // helps to fix the direction of the square grid flipping pattern. So that the square doesn't go out of the screen.
  if (flipType !== 1) return;

  if (currentCol === 0) xDir = 1;
  else if (currentCol > round(NUM_COLS/2)) xDir = -1;

  if (currentRow === 0 ) yDir = 1;
  else if (currentRow > round(NUM_ROWS/2)) yDir = -1;
}



function drawOverlay(x, y) {
  // draw the squares for overlay
  rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
}

function overlayGuide() {
  // decides what to overlay
  fill(0, 255, 0, 80);

  if (keyIsPressed && keyCode === SHIFT) {    //Cheater funcitonality 
    drawOverlay(currentCol, currentRow);
  }
  else if (flipType === 0) {                  //cross
    drawOverlay(currentCol, currentRow);
    drawOverlay(currentCol-1, currentRow);
    drawOverlay(currentCol+1, currentRow);
    drawOverlay(currentCol, currentRow-1);
    drawOverlay(currentCol, currentRow+1);
  }
  else {                                      //square
    drawOverlay(currentCol, currentRow);
    drawOverlay(currentCol+xDir, currentRow);
    drawOverlay(currentCol, currentRow+yDir);
    drawOverlay(currentCol+xDir, currentRow+yDir);
  }
}