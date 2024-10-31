// Puzzle Game
// Muntaha Chowdhury
// 29 October, 2024
// A puzzle game where you have to get the entire board to be the same color. You can switch the flipping area (square and cross) or cheat by folding shift

let flipType = 0;     //0-cross     1-square
let xDir = 1;
let yDir = -1;

let num_rows = 4;
let num_cols = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;
let rowSlider, colSlider;
let gridData = [[0,   0,   0,   0,  0],
                [0,   0,   0,   0,  0],
                [0,   255, 0,   0,  0],
                [255, 255, 255, 0,  0]];



function setup() {
  // Determine the size of each square.
  createCanvas(windowWidth, windowHeight);
  rectWidth = width/num_cols;
  rectHeight = height/num_rows;
  randomizeGrid();
}

function draw() {
  // determine area, draw grid, place pattern, and win checking
  background(220);
  determineActiveSquare();  
  drawGrid();           
  checkDir();
  overlayGuide();
  win();
}




function randomizeGrid() {
  // change gridData so the squares are different at every reload
  for (let y = 0; y < num_rows; y++) {
    for (let x = 0; x < num_cols; x++) {
      let choice = round(random(0,1));
      if (choice === 1) choice = 255;
      gridData[y][x] = choice;
    }
  }
}


function drawGrid(){
  // Render a grid of squares - fill color set according to data stored in the 2D array
  for (let x = 0; x < num_cols ; x++){
    for (let y = 0; y < num_rows; y++){
      fill(gridData[y][x]); 
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}





//---- Flipping and Pattern
function determineActiveSquare(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
}


function crossPattern(action) {
  // does stuff with the cross flipping pattern
  action(currentCol, currentRow);
  action(currentCol-1, currentRow);
  action(currentCol+1, currentRow);
  action(currentCol, currentRow-1);
  action(currentCol, currentRow+1);
}


function squarePattern(action) {
  // does stuff with the square flipping pattern 
  action(currentCol, currentRow);
  action(currentCol+xDir, currentRow);
  action(currentCol, currentRow+yDir);
  action(currentCol+xDir, currentRow+yDir);
}


function flip(col, row){
  // given an existing column and row for the 2D array, flip its value (0 to 255 and vice versa)
  if (col >= 0 && col < num_cols ){
    if (row >= 0 && row < num_rows){
      if (gridData[row][col] === 0) gridData[row][col] = 255;
      else gridData[row][col] = 0;
    }
  }
}




//---- Guiding
function checkDir() {
  // helps to fix the direction of the square grid flipping pattern. So that the square doesn't go out of the screen.
  if (flipType !== 1) return;

  // to keep pattern inside screen horizontally
  if (currentCol === 0) xDir = 1;
  else if (currentCol > round(num_cols/2)) xDir = -1;

  // to keep pattern inside screen vertically
  if (currentRow === 0 ) yDir = 1;
  else if (currentRow > round(num_rows/2)) yDir = -1;
}


function drawOverlay(x, y) {
  // draw the squares for overlay
  rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
}


function overlayGuide() {
  // puts a green overlay over the squares that will be flipped
  fill(0, 255, 0, 80);

  if (keyIsPressed && keyCode === SHIFT) {    //Cheater funcitonality 
    drawOverlay(currentCol, currentRow);
  }
  else if (flipType === 0) {                  //cross
    crossPattern(drawOverlay);
  }
  else {                                      //square
    squarePattern(drawOverlay);
  }
}




// ---- Winning

function win() {
  // checks if the entire grid is the same
  let toMatch = gridData[0][0];

  for (let y = 0; y < num_rows; y++) {
    for (let x = 0; x < num_cols; x++) {
      if (gridData[y][x] !== toMatch) return;     //return if grid is not the same
    }
  }

  // The 'Win' text
  textSize(50);
  textAlign(CENTER);
  fill('green');
  text('You Win!', width/2, height/2);
  fill(0);
}




// ---- User interactivity 

function mousePressed(){
  //  pattern flips on a mouseclick. Boundary conditions are checked within the flip function to ensure in-bounds access for array
  if (keyIsPressed && keyCode === SHIFT) {    //Cheater funcitonality
    flip(currentCol, currentRow);
  }
  else if (flipType === 0) {                  //cross
    crossPattern(flip);
  } 
  else {                                      //square
    squarePattern(flip);
  }
}


function keyPressed() {
  // change the grid flipping pattern (cross or square)
  if (keyCode === 32) {
    if (flipType === 0) flipType = 1;
    else flipType = 0;
  }
}

