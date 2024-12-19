// Text Files and Map
// Muntaha Chowdhury
// 19 Dec 2024
// split(), spread syntax

let grid, img, rows, cols, colorMap, textFile;

function windowResized() {
  print("hey!");
  createCanvas(windowWidth, windowHeight);
}

function preload() {
  textFile = loadStrings('assets/info.txt');
  img = loadStrings('assets/colorImage.txt');
  // colorMap = loadStrings('assets/info.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  processText();
  rows = img.length;
  cols = img[0].length;

  //now make ouy 2D array
  grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([...img[i]]);
  }

  // next, create a map for the colors
  colorMap = new Map([
    ["b", 'black'],
    ["w", 'white'],
    ["r", "sienna"],
    ["l", 'peru'],
    ["p", color(150, 150, 255)]
  ]);
}

function draw() {
  background(220);
  renderGrid();
}

function processText() {    //split()   spread
  // print("SPLIT INTO WORDS");
  // let splitWords = textFile[0].split(" ");
  // print(splitWords);

  // print("SPLIT INTO CHARS");
  // let splitChars = textFile[1].split("");
  // print(splitChars);

  // print("SPREAD into chars");
  // let spreadChars = [...textFile[2]];
  // print(spreadChars);
}

function renderGrid() {
  //calculate the grid size
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  // visit each 2D array location, and visualize
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let currentKey = grid [y][x];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}