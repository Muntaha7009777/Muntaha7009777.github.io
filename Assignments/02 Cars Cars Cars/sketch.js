// Cars Cars Cars
// Muntaha Chowdhury
// Oct 18, 2024
// ADD SOMETHING HERE

// for drawing cars
let carSize = 30;
let truckSize = 30;
let maxSpeed = 10;
let minSpeed = 2;
let initialNumVeh = 10;

// for traffic light
let counter;
let light = 0;
let trafficLight;

// for storing cars
let eastbound = [];
let westbound = [];




function setup() {
  // sets up canvas, initializes some cars, creates traffic light
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  counter = 0;
  trafficLight = new TrafficLight();

  // --cars
  for (let i = 0; i < 10; i++) {
    eastbound.push(new Vehicle(round(random(0,1)), 0));
  }
  for (let i = 0; i < 10; i++) {
    westbound.push(new Vehicle(round(random(0,1)), 1));
  }

}

function draw() {
  // main function manager

  background(220);
  trafficLight.action();
  drawRoad();
  
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action();
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

function drawVehicle(choice, x, y, color, dir) {
  // draw 0-car 1-truck

  if (choice === 0) {           //car

    fill(color);
    rect(x, y, carSize+carSize/2, carSize, 6);
    fill(0);
    rect(x+carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 2, 10, 10, 2);      //front window
    rect(x-carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 10, 2, 2, 10);   //back window
    arc(x, y-carSize/2.5, carSize, 10, 0, PI);             //left window
    arc(x, y+carSize/2.5, carSize, 10, PI, 0);             //right window

  }

  
  else if (choice === 1) {      //truck

    // head
    fill('green');
    if (dir === 1) rect(x-truckSize, y, truckSize, truckSize, 4, 0, 0, 4);
    else rect(x+truckSize, y, truckSize, truckSize, 0, 4, 4, 0);

    // body
    fill(color);
    rect(x, y, truckSize+truckSize/2, truckSize+truckSize/10, 2);

    fill(0);
    if (dir === 0) {
      rect(x+truckSize*1.25, y, truckSize-truckSize/1.5, truckSize-truckSize/2.5, 2, 10, 10, 2);      //front window
      arc(x+truckSize*1.05, y-truckSize/2.5, truckSize/2, 10, 0, PI);                                 //left window
      arc(x+truckSize*1.05, y+truckSize/2.5, truckSize/2, 10, PI, 0);                                 //right window
    }
    else {
      rect(x+truckSize*-1.25, y, truckSize-truckSize/1.5, truckSize-truckSize/2.5, 2, 10, 10, 2);      //front window
      arc(x+truckSize*-1.05, y-truckSize/2.5, truckSize/2, 10, 0, PI);                                 //left window
      arc(x+truckSize*-1.05, y+truckSize/2.5, truckSize/2, 10, PI, 0);
    }
  }
}

function drawTrafficLight(light) {
  fill(0);
  rect(width/2, 0, 50, 300);


  if (light === 1) fill('red');
  else fill(100);
  circle(width/2, 40, 30);

  if (light === 2) fill('yellow');
  else fill(100);
  circle(width/2, 80, 30);

  if (light === 0) fill('green');
  else fill(100);
  circle(width/2, 120, 30);
}







class Vehicle {
  // make a vehicle

  constructor(type, dir) {
    this.type = type;
    this.dir = dir;
    if (this.dir === 0) {
      this.x = 0;
      this.y = random(height/2 + truckSize, height*3/4 - truckSize);
      this.xSpeed = random(minSpeed, maxSpeed);
      this.color = color(50, 10, 100);
    }
    else if (this.dir === 1) {
      this.x = width;
      this.y = random(height/4 + truckSize, height/2 - truckSize) ;
      this.xSpeed = random(-maxSpeed, minSpeed);
      this.color = color(50, 200, 100);
    }
  }

  display() {
    if (this.type === 0) drawVehicle(0, this.x, this.y, this.color, this.dir);
    else if (this.type === 1) drawVehicle(1, this.x, this.y, this.color, this.dir);
  }

  move() {
    if (counter > 0) {
      if (light === 2) {
        this.speedDown();
        this.speedDown();
      }
      else {
        this.xSpeed = 0;
        return;
      }
    }
    if (this.xSpeed === 0) {
      if (this.dir === 0) this.xSpeed = 1;    
      if (this.dir === 1) this.xSpeed = -1;    

    }
    this.x += this.xSpeed;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;

  }

  speedUp() {
    if (this.dir === 0) {
      this.xSpeed += 2;
      if (this.xSpeed > maxSpeed) this.xSpeed = maxSpeed;
    }
    else if (this.dir === 1) {
      this.xSpeed -= 2;
      if (this.xSpeed < -maxSpeed) this.xSpeed = -maxSpeed;
    }
  }

  speedDown() {
    if (this.dir === 0) {
      this.xSpeed -= 2;
      if (this.xSpeed < minSpeed) this.xSpeed = minSpeed;
    }
    else if (this.dir === 1) {
      this.xSpeed += 2;
      if (this.xSpeed > -maxSpeed) this.xSpeed = -minSpeed;
    }
  }

  changleColor() {
    this.color = color( random(0, 255), random(0, 255), random(0, 255));
  }

  action() {
    let chance = round(random(0, 100));
    if (chance === 10) this.speedUp();
    else if (chance === 30) this.speedDown();
    else if (chance === 50) this.changleColor();
    this.move();
    this.display();
  }
}

class TrafficLight {
  constructor() {
    this.redInterval = 120;
    this.yellowInterval = 40;
  }

  display() {
    drawTrafficLight(light);
  }

  countDown() {
    if (counter > 0) {
      if (counter > 120) {
        light = 2;
      }
      else {
        light = 1;
      }
      counter -= 1;
    }
    else {
      light = 0;
    }
  }

  action() {
    this.display();
    this.countDown();
  }
}









function mouseClicked() {
  if (mouseButton === LEFT && keyCode === SHIFT) {
    eastbound.push(new Vehicle(round(random(0,1)), 0));
  }
  else if (mouseButton === LEFT) {
    westbound.push(new Vehicle(round(random(0,1)), 1));
  }
}

function keyPressed() {
  if (keyCode === 32) {
    counter = 160;
  }
}