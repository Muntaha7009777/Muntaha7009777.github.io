// Cars Cars Cars
// Muntaha Chowdhury
// Occt 18, 2024
// ADD SOMETHING HERE

let carSize = 50;
let truckSize = 50;
let maxSpeed = 30;
let minSpeed = 2;
let initialNumVeh = 10;

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  for (let i = 0; i < 10; i++) {
    eastbound.push(new Vehicle(0, random(0,1)));
  }
  for (let i = 0; i < 10; i++) {
    westbound.push(new Vehicle(1, random(0,1)));
  }
}

function draw() {
  background(220);
  drawRoad();
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].display();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].display();
  }
}



function drawRoad() {
  // draw road with line
  fill(0);
  rect(width/2, height/2, width, height*(1/2));

  fill('yellow');
  noStroke();
  for (let i = 0; i < width ; i+=25) {
    rect(i, height/2, 15, 3);
  }
}


class Vehicle {
  // make a vehicle

  constructor(type, dir) {
    this.type = type;
    this.color = color(50, 200, 100);
    if (dir === 0) {
      this.x = 0;
      this.y = random(height/2, height*3/4);
      this.xSpeed = random(minSpeed, maxSpeed);
    }
    else if (dir === 1) {
      this.x = width;
      this.y = random(height/4, height/2);
      this.xSpeed = random(-maxSpeed, minSpeed);
    }
  }

  display() {
    if (this.type === 0) drawVehicle(0, this.x, this.y, 'red');
    else if (this.type === 1) drawVehicle(1, this.x, this.y, 'red');
  }

  move() {
    this.x += this.xSpeed;
  }

  speedUp() {
    if (dir === 0) {
      this.xSpeed += 2;
      if (this.xSpeed > maxSpeed) this.xSpeed = maxSpeed;
    }
    else if (dir === 1) {
      this.xSpeed -= 2;
      if (this.xSpeed < -maxSpeed) this.xSpeed = -maxSpeed;
    }
  }

  speedDown() {

  }

  changleColor() {

  }

  action() {
    let chance = random(100);
    if (chance === 10) this.speedUp();
    if (chance === 30) this.speedDown();
    if (chance === 50) this.changleColor();
    this.move();
    this.display();
  }
}







function drawVehicle(choice, x, y, color) {
  // draw 0-car 1-truck
  if (choice === 0) {           //car

    fill(color);
    rect(x, y, carSize+carSize/2, carSize, 6);
    fill(0);
    rect(x+carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 2, 10, 10, 2);      //front window
    rect(x-carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 10, 2, 2, 10);   //back window
    arc(x, y-carSize/2.5, carSize, 10, 0, PI);             //left window
    arc(x, y+carSize/2.5, carSize, 10, PI, 0);             //right window

    // left rear view
    strokeWeight(5);
    line(x+carSize/3, y-carSize/2, x+5, y-carSize*0.7);

    // right rear view
    line(x+carSize/3, y+carSize/2, x+5, y+carSize*0.7);
    strokeWeight(1);

  }
  else if (choice === 1) {      //truck

    // head
    fill('green');
    rect(x+truckSize, y, truckSize, truckSize, 0, 4, 4, 0);
    // body
    fill(color);
    rect(x, y, truckSize+truckSize/2, truckSize+truckSize/10, 2);

    fill(0);
    rect(x+truckSize*1.25, y, truckSize-truckSize/1.5, truckSize-truckSize/2.5, 2, 10, 10, 2);      //front window
    arc(x+truckSize*1.05, y-truckSize/2.5, truckSize/2, 10, 0, PI);                                 //left window
    arc(x+truckSize*1.05, y+truckSize/2.5, truckSize/2, 10, PI, 0);                                 //right window

    // left rear view
    strokeWeight(5);
    line(x+truckSize, y-truckSize/2, x+truckSize*0.75, y-truckSize*0.7);

    // right rear view
    line(x+truckSize, y+truckSize/2, x+truckSize*0.75, y+truckSize*0.7);
    strokeWeight(1);
  }
}