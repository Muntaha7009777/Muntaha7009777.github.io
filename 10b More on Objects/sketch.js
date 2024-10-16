// More on Objects
// Muntaha Chowdhury
// Oct 15, 2024

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i < 1000; i++) {
    movers.push(new Mover(random(width), random(height)));
  }
}

function draw() {
  background(0);
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
    this.x = x;
    this.y = y;
    this.xSpeed = 2;
    this.ySpeed = 2;      
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, 10,10);
  }

  move() {
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.x < 0 || this.x > width) this.xSpeed *= -1;
    if(this.xy < 0 || this.y > height) this.ySpeed *= -1;
  }
}
