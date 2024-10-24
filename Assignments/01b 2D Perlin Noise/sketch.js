// 2D Perlin Noise
// Muntaha Chowdhury
// Oct 3, 2024
// ✨Art✨ generated by 2D Perlin Noise


let advanceBy = 0.01;
let MIN_SIZE = 10;
let MAX_SIZE = 100;

// For the last 2 functions
let rectNoiseX = 0;
let rectNoiseY = 0;
let ellipseNoiseX = 10;
let ellipseNoiseY = 10;


function setup() {
  // sets up the canvas and some required properties
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);       //remove any scaling
  rectMode(CENTER);
}


function draw() {
  // Manager function
  background(220);
  drawColorfulCloud();
  drawPerlinRectGrid();
  drawMovingPerlinRect();
  drawMovingPerlinEllipse();
}


function drawColorfulCloud() {
  // draw the Pelin graph cloud but colorful      [a modified version of the code from TheCodingTrain]
  let yoff = 0;
  loadPixels();
  
  for (let y = 0; y < height; y++) {
    // goes through a row then goes down          
    //everytime the loop wraps, the noise graph is targeted at x=0 and y at a higher point
    let xoff = 0;
    
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;

      // get values for color 
      let r = noise(xoff, yoff) * 225;
      let g = noise(xoff+100, yoff) * 225;
      let b = noise(xoff+200, yoff) * 225;

      
      // setup RGBA 
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;
      
      
      xoff += advanceBy;    //move along the x for the next pixel in the same row
    }
    yoff += advanceBy;
  }
  updatePixels();
}


function drawPerlinRectGrid() {
  // draw rectangles at every 20

  for (let y = 0; y < height; y+=20) {
    for (let x = 0; x < width; x+=20) {
      // get a random size
      let shapeSize = noise(x, y);
      shapeSize = map(shapeSize, 0, 1, 0, 20);

      // get a random color
      let shapeColorR = noise(x, y);
      let shapeColorG = noise(x+250, y);
      let shapeColorB = noise(x+500, y);

      shapeColorR = map(shapeColorR, 0, 1, 0, 255);
      shapeColorG = map(shapeColorG, 0, 1, 0, 255);
      shapeColorB = map(shapeColorB, 0, 1, 0, 255);


      // draw the rectangle
      let index = (x + y * width) * 4;
      if (index%20 === 0) {
        fill(shapeColorR, shapeColorG, shapeColorB);
        rect(x, y, shapeSize);
      }

    }
  }
}


function drawMovingPerlinRect() {
  // rectangle  moves, fills & sizes according to perlin noise
  let shapeOneX, shapeOneY;

  // Position
  if (mouseIsPressed) {
    shapeOneX = mouseX;
    shapeOneY = mouseY;
  } else {
    shapeOneX = noise(rectNoiseX, rectNoiseX);
    shapeOneY = noise(rectNoiseY, rectNoiseY);
    shapeOneX = map(shapeOneX, 0, 1, 0, width);
    shapeOneY = map(shapeOneY, 0, 1, 0, height);
  }


  // Size
  let shapeSizeX = map(shapeOneX, 0, width, MIN_SIZE, MAX_SIZE);
  let shapeSizeY = map(shapeOneY, 0, height, MIN_SIZE, MAX_SIZE);


  // Color
  let shapeColor = map(shapeOneX, 0, width, 0, 225);
  if (shapeOneX < width/2) fill(225-shapeColor, shapeColor, 0);
  else fill(0, 225-shapeColor, shapeColor);


  rect(shapeOneX, shapeOneY, shapeSizeX, shapeSizeY);

  // Update variables to move along noise graph
  rectNoiseX +=0.002;
  rectNoiseY +=0.005;
}


function drawMovingPerlinEllipse() {
  // ellipse moves, fills & sizes according to perlin noise
  let shapeTwoX, shapeTwoY;

  // Position
    shapeTwoX = noise(ellipseNoiseX, ellipseNoiseX);
    shapeTwoY = noise(ellipseNoiseY, ellipseNoiseY);
    shapeTwoX = map(shapeTwoX, 0, 1, width, 0);
    shapeTwoY = map(shapeTwoY, 0, 1, height, 0);


  // Size
  let shapeSizeX = map(shapeTwoX, 0, width, MIN_SIZE, MAX_SIZE);
  let shapeSizeY = map(shapeTwoY, 0, height, MIN_SIZE, MAX_SIZE);


  // Color
  let shapeColor = map(shapeTwoX, 0, width, 0, 225);
  if (shapeTwoX < width/2) fill(225-shapeColor, shapeColor, 0);
  else fill(0, 225-shapeColor, shapeColor);


  ellipse(shapeTwoX, shapeTwoY, shapeSizeX, shapeSizeY);

  // Update variables to move along noise graph
  ellipseNoiseX +=0.003;
  ellipseNoiseY +=0.006;
}