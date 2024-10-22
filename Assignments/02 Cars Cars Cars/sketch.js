// Cars Cars Cars
// Muntaha Chowdhury
// Oct 18, 2024
// ADD SOMETHING HERE

let carSize = 30;
let truckSize = 30;
let maxSpeed = 10;
let minSpeed = 2;
let initialNumVeh = 10;

let trafficState = 0;       //0-green   /   1-yellow    / 2-red
let trafficInt = 10; //seconds
let currentTimer = 0;
let trafficNotYellow= 1;  //boolean
let trafficLast;

let eastbound = [];
let westbound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  for (let i = 0; i < 10; i++) {
    eastbound.push(new Vehicle(round(random(0,1)), 0));
  }
  for (let i = 0; i < 10; i++) {
    westbound.push(new Vehicle(round(random(0,1)), 1));
  }
}

function draw() {
  background(220);
  trafficPolice();
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


function trafficPolice() {
  currentTimer += 1;
  if (trafficNotYellow !==0 && currentTimer === trafficInt) {
    trafficLast = trafficState;
    trafficState = 1;
    trafficNotYellow = 0;
    currentTimer = 0;
  }
  else if (currentTimer === trafficInt/2) {
    trafficNotYellow === 1;
    if (trafficLast === 0) trafficState === 2;
    else trafficState === 0;
    currentTimer = 0;
  }
  // console.log(currentTimer);
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
    if (this.type === 0) drawVehicle(0, this.x, this.y, this.color);
    else if (this.type === 1) drawVehicle(1, this.x, this.y, this.color);
  }

  move() {
    this.x += this.xSpeed;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;

    if (trafficState === 2) this.xSpeed = 0;
  }

  speedUp() {
    if (trafficState === 2) return;
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
      this.xSpeed -= 2;
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



function mouseClicked() {
  if (mouseButton === LEFT && keyCode === SHIFT) {
    eastbound.push(new Vehicle(round(random(0,1)), 0));
  }
  else if (mouseButton === LEFT) {
    westbound.push(new Vehicle(round(random(0,1)), 1));
  }
}