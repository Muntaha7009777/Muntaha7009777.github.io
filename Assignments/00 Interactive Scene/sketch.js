// Interactive Scene
// Muntaha Chowdhury
// Sep 16, 2024
// An interactive scene which can be controlled by both mouse and keyboard


let currentBack = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220); //fallback bg
  setBg();
  displayFlowerCounter();


  text('Muntaha Chowdhury', width-120, height-10);
  text((mouseX + ', ' + mouseY), mouseX, mouseY);
}


function setBg() {
  // Sets background of garden according to currentBack

  if (currentBack === 0) {
    background(152, 242, 136);
  }
  if (currentBack === 1) {
    background(182, 147, 255);
  }
  if (currentBack === 2) {
    background(1255, 237, 120);
  }
  if (currentBack === 3) {
    background(250, 250, 250);
  }
}


function displayFlowerCounter() {
  // display + keeep track --- of the 4 flowers on the top left 
  fill(236, 247, 27);
  circle(width/2, height/2, 40);
  triangle(330, 459, 364, 459, 345, 428);
}



/*

Plan

- Setting
  → 4 different flower gardens
  → Pick up different flowers
  → Bring out the sun and water the plants based on a timer (and weather-background)

- Variables
  → What pictures are being tracked
  → Number of certain flower x4
  → Time variable (for water)
  → Time variable (for flower popping up)

- Interactivity
  → Gardener
    ► Move around
    ► Can be dragged onto flowers or sun/pot

  → Sun
    ► Can be turned to moon (slows Time variable for water)

  → Water pot
    ► Just clicked (overclicking kills)
  
  → Background
    ► Middle button changes flower garden

*/