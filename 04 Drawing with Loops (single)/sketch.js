// Drawing with Loops 
// Muntaha Chowdhury
// Sept 19, 2024
// 

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);
}

function draw() {
  myBackground();
  myForeground();
  // noLoop();
  //this is where the screen actually draws the frames
}

function myBackground() {
  // use some loops to create a gradient background
  // assuming height === 800
  // y: 800 700 600 ... 0
  let rectHeight = 20;
  noStroke();
  for (let y = height; y >= 0; y-=rectHeight) {
    let value = map(y, 0, height, 0, 255);
    fill(value, 255-value, 255-value);
    rect(0, y, width, rectHeight);
  }
}

function myForeground() {
  //draw some shapes using FOR / WHILE loops
  //var      //cond.      //modifcation of var    //..
  // x: 0 1 2 3 4 5 6
  for(let x = 0; x < width; x+=40) {
    fill(0);
    circle(x, height/2, 40);
    fill(255);
    text(x, x, height/2)
  }

  //create stars x100
  let starCount = 0;
  randomSeed(7);
  while(starCount < 100) {
    fill(255, 0, 0);
    let x = random(0, width);
    let y = random(0, height);
    circle(x, y, 10);
    starCount++;
  }
}