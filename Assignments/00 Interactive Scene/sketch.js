// Interactive Scene
// Muntaha Chowdhury
// Sep 16, 2024
// An interactive scene which can be controlled by both mouse and keyboard


let currentBack = 1;
let currentSky = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220); //fallback bg
  setGardenBg();
  setSkyBg();
  setWaterBg();
  displayFlowerCounter();


  text('Muntaha Chowdhury', width-120, height-10);
  fill(0); text((mouseX + ', ' + mouseY), mouseX, mouseY);
}


function setGardenBg() {
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

function setWaterBg() {
  fill(220);
  rect(width/20, height/5, 150, 150, 4);
}


function setSkyBg() {
  noStroke();

  if (currentSky === 0)  {
    fill(199, 247, 255);
    rect(0, 0, width, height/4);
    fill(255, 203, 0);
    circle(width/2, 0, 200);
  }
  else  {
    fill(82, 104, 130);
    rect(0, 0, width, height/4);
    fill(255);
    circle(width/2, 0, 200);
  }
}




function displayFlowerCounter() {
  // display + keeep track --- of the 4 flowers on the top left 

  stroke(0);
  fill(150, 147, 255);

  // Petals
  rect((width/2)-25, (height/2)-25, 50)
  // triangle(320, 460, 370, 460, 344, 410);
  // triangle(360, 450, 360, 500, 410, 473);
  // triangle(370, 479, 330, 500, 375, 525);
  // triangle(335, 450, 335, 500, 290, 470);  
  // triangle(330, 463, 350, 500, 310, 525);  


  // center
  fill(236, 247, 27);
  circle(width/2, height/2, 40);

}

function mousePressed() {

  // Sun
  if ( mouseY <= 100 && (mouseX >= (width/2)-100 && mouseY <= (width/2)+100)) {
    if (currentSky === 1) currentSky = 0;
    else {
      currentSky = 1;
      let starsX = [];
      let starsY = [];
      for (let i = 0; i < 20; i++) {
        let x = random(0, width), y = random(0, height/4);
        starsX.push(x); starsY.push(y);
      }
      for (let j = 0; j < starsX.length; j++) {
        fill(255);
        circle(starsX[j], starsY[j], 20);
      }
    };
  }
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





Order of work (high-level):

- Make flowers
- Make background
- Do Sun first
- Do Water
- Design Protagonist
- Work with protaonist

*/