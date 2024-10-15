// More on Objects
// Muntaha Chowdhury
// Oct 15, 2024

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let i = 0; i < movers.length; i++) {
    movers[i].move();
    movers[i].display();  
  }
}

function mouseClicked() {
  movers.push(new Mover(mouseX, mouseY));
}

class Mover {
  constructor(x, y) {
    
    
    
      
  }
}
