// 2D Arrays Demo
// Muntaha Chowhdury
// 28 October, 2024
//


let grid = [[0,   255, 0,   255,  0  ],
            [255, 0,   255, 255,  0  ],
            [0,   0,   255, 0,    255]];

const NUM_ROWS = grid.length;
const NUM_COLS = 5;

let rectWidth, rectHeight;


function setup() {
  createCanvas(500, 300);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
}

function draw() {
  background(220);
  renderGrid();
}


function renderGrid() {
  for(let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      fill(grid[y][x]);
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}



function getArrayX() {
  return int(mouseX/rectWidth);
}

function getArrayY() {
  return int(mouseY/rectHeight);
}



function changeColor(y, x) {
  if (grid[y][x] === 0) return 255;
  else return 0;
}

function changeNeighbor() {
  let yUp = getArrayY() - 1;
  let yDown = getArrayY() + 1;

  let xLeft = getArrayX() - 1;
  let xRight = getArrayX() + 1;

  grid[yUp][xLeft] = changeColor(yUp, xLeft);
  grid[yUp][xRight] = changeColor(yUp, xRight);
  grid[yDown][xLeft] = changeColor(yDown, xLeft);
  grid[yDown][xRight] = changeColor(yDown, xRight);

}

function mouseClicked() {
  grid[getArrayY()][getArrayX()] = changeColor(getArrayY(), getArrayX());
  changeNeighbor();
}