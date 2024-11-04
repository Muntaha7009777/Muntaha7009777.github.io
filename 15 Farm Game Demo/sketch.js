// Farm Game Demo
// Muntaha Chowdhury
// 4 Nov, 2024
// Creating a tile-based gameboard w/ block push

let tiles = [];   // 0=blank, 1=chicken, 2=cow
let level = [
  [0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1],
  [0, 1, 0, 1, 1],
];

const COLUMNS = 5, ROWS = 5, TILE_SIZE = 100;
let playerX = 3, playerY = 4;

function preload() {
  for (let i = 0; i < 3; i++) {
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(COLUMNS*TILE_SIZE, ROWS*TILE_SIZE);
  level[playerY][playerX] = 2;   //place the cow
}

function draw() {
  background(220);
  renderBoard();
}

function swap(x1, y1, x2, y2) {
  // swap 2 places on level [] to move cow or push chicken
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function keyPressed() {
  // moves cows and pushes chicken if applicable

  if (keyCode === UP_ARROW) {
    if (level[playerY - 1][playerX] === 0) {
      swap(playerX, playerY, playerX, playerY - 1);
      playerY--;
    }
    else if (level[playerY - 1][playerX] === 1) {
      if (playerY > 0 && level[playerY - 2][playerX] === 0) {
        swap(playerX, playerY-1, playerX, playerY-2);
        swap(playerX, playerY-1, playerX, playerY);
        playerY--;
      }
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (level[playerY + 1][playerX] === 0) {
      swap(playerX, playerY, playerX, playerY + 1);
      playerY++;
    }
    else if (level[playerY + 1][playerX] === 1) {
      if (playerY < 5 && level[playerY + 2][playerX] === 0) {
        swap(playerX, playerY+1, playerX, playerY+2);
        swap(playerX, playerY+1, playerX, playerY);
        playerY++;
      }
    }
  }

  if (keyCode === RIGHT_ARROW) {
    if (level[playerY][playerX+1] === 0) {
      swap(playerX, playerY, playerX + 1, playerY);
      playerX++;
    }
    else if (level[playerY][playerX+1] === 1) {
      if (playerX < 5 && level[playerY][playerX + 2] === 0) {
        swap(playerX+1, playerY, playerX+2, playerY);
        swap(playerX+1, playerY, playerX, playerY);
        playerX++;
      }
    }
  }

  if (keyCode === LEFT_ARROW) {
    if (level[playerY][playerX-1] === 0) {
      swap(playerX, playerY, playerX - 1, playerY);
      playerX--;
    }
    else if (level[playerY][playerX-1] === 1) {
      if (playerX > 1 && level[playerY][playerX - 2] === 0) {
        swap(playerX-1, playerY, playerX-2, playerY);
        swap(playerX-1, playerY, playerX, playerY);
        playerX--;
      }
    }
  }
}


function renderBoard() {
  // create the board using the images according level[]
  for (let col = 0; col < COLUMNS; col++) {
    for (let row = 0; row < ROWS; row++) {
      let pos = level[row][col];
      let currentImage = tiles[pos];
      image(currentImage, col*TILE_SIZE, row*TILE_SIZE);
    }
  }
}