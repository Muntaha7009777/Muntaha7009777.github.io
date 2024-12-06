// Child Class 1 - Line Obj
// 'extends' indicates to use a parent class

class LineObject extends AnimatedObject {
  constructor() {
    super(random(width), random(height));
  }

  move() {      //overriding, but building on top of parent's move() function
    super.move();   //runs the parent move()
    this.x -= 5;
    if (this.x < 0) this.x = width;
  }

  display() {   //override in full
    if(mouseIsPressed) strokeWeight(10);
    else strokeWeight(2);

    line(this.x, this.y, this.x+15, this.y);
  }
}