// RoundRacer
// Muntaha Chowdhury
// Oct 15, 2024

let racer1;
let racer2;
let racer3;



function setup() {
  createCanvas(windowWidth, windowHeight);
  racer1 = new Racer(height*1/4, 'lightgreen');
  racer2 = new Racer(height*2/4, 'pink');
  racer3 = new Racer(height*3/4, 'orange');
}

function draw() {
  background(0);
  racer1.display();
  racer2.display();
  racer3.display();
  racer1.move();
  racer2.move();
  racer3.move();
}


class Racer {

  constructor(yPosition, color) {
    this.xPosition = 0;
    this.yPosition = yPosition;
    this.xSpeed = random(3,15);
    this.color = color;
  }

  move() {
    this.xPosition += this.xSpeed;
    if (this.xPosition > width)  {
      this.xPosition = 0;
    }
  }
  

  display() {
    fill(this.color);
    noStroke();
    circle(this.xPosition, this.yPosition, 20);
  }

}