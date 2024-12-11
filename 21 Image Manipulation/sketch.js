// Image Manipulation
// Muntaha Chowdhury
// 11 Dec 2024
//

let pilot;  //p5.Image

function preload() {
  pilot = loadImage("assets/aviator.png");
}

function setup() {
  createCanvas(pilot.width, pilot.height);
}


function drawCharacter(x, y, avg) {
  fill(255);
  if(avg > 200) text("0", x, y);
  else if(avg > 140) text("P", x, y);
  else if(avg > 90) text("c", x, y);
  else if (avg > 40) text(".", x, y);
}

function draw() {
  image(pilot, 0, 0);

  loadPixels();   //allows us to access pixels on Canvas
  background(0);  // . c # 0 


  for (let x = 0; x < width; x+=10) {
    for(let y=0; y<height; y+=10) {
      let location = (x + y*pilot.width)*4;
      let avg = avgPixel(location);
      drawCharacter(x, y, avg);
    }
  }



  
  //// Loop through all the pixels:
  // for (let i = 0; i < pixels.length; i+=4) {
    // lighten filter
    // let boost = map(mouseX, 0, width, 0, 200);
    // let r = min(pixels[i]   + boost, 255);
    // let g = min(pixels[i+1] + boost, 255);
    // let b = min(pixels[i+2] + boost, 255);
    // setPixelColor(i, r, g, b);

    ////greyscale filter
    // let a = avgPixel(i);
    // setPixelColor(i, a, a, a);
  // }

  // updatePixels();
}


function avgPixel(pos) {
  //get avg intensity at pos in pixel
  let sum = pixels[pos] + pixels[pos+1] + pixels[pos+2];
  return sum / 3;
}


function setPixelColor(pos, r, g, b) {
  //set a pixel (starting at pos) to new RGB value
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}