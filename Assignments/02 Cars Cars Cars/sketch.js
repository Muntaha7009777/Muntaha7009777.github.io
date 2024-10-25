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
let light = 'green';
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
  drawSpeedSliders();

  // --cars
  for (let i = 0; i < 10; i++) {
    eastbound.push(new Vehicle(round(random(0,1)), 'east'));
  }
  for (let i = 0; i < 10; i++) {
    westbound.push(new Vehicle(round(random(0,1)), 'west'));
  }

}

function draw() {
  // main function manager
  background(220);
  drawRoad();
  infoNspeed();
  trafficLight.action();
  
  for (let i = 0; i < eastbound.length; i++) {
    eastbound[i].action();
  }
  for (let i = 0; i < westbound.length; i++) {
    westbound[i].action();
  }
}





function drawRoad() {
  // draw road with yellow separating line

  // the road
  fill(0);
  rect(width/2, height/2, width, height*(1/2));

  // the dashed line
  fill('yellow');
  noStroke();
  for (let i = 0; i < width ; i+=25) {
    rect(i, height/2, 15, 3);
  }
}

function drawVehicle(choice, x, y, color, dir) {
  // draw a vehicle :  0-car 1-truck

  if (choice === 0) {           //car
    //body
    fill(color);
    rect(x, y, carSize+carSize/2, carSize, 6);  

    // windows
    fill(0);
    rect(x+carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 2, 10, 10, 2);      //front window
    rect(x-carSize/2, y, carSize-carSize/1.5, carSize-carSize/2.5, 10, 2, 2, 10);   //back window
    arc(x, y-carSize/2.5, carSize, 10, 0, PI);             //left window
    arc(x, y+carSize/2.5, carSize, 10, PI, 0);             //right window

  }

  
  else if (choice === 1) {      //truck

    // head
    fill('green');
    if (dir === 'east') rect(x+truckSize, y, truckSize, truckSize, 0, 4, 4, 0);
    else rect(x-truckSize, y, truckSize, truckSize, 4, 0, 0, 4);

    // body
    fill(color);
    rect(x, y, truckSize+truckSize/2, truckSize+truckSize/10, 2);

    // windows
    fill(0);
    if (dir === 'east') {
      rect(x+truckSize*1.25, y, truckSize-truckSize/1.5, truckSize-truckSize/2.5, 2, 10, 10, 2);      //front 
      arc(x+truckSize*1.05, y-truckSize/2.5, truckSize/2, 10, 0, PI);                                 //left 
      arc(x+truckSize*1.05, y+truckSize/2.5, truckSize/2, 10, PI, 0);                                 //right 
    }
    else {
      rect(x+truckSize*-1.25, y, truckSize-truckSize/1.5, truckSize-truckSize/2.5, 2, 10, 10, 2);      //front 
      arc(x+truckSize*-1.05, y-truckSize/2.5, truckSize/2, 10, 0, PI);                                 //left 
      arc(x+truckSize*-1.05, y+truckSize/2.5, truckSize/2, 10, PI, 0);                                 //right 
    }
  }
}

function drawTrafficLight(light) {
  // draw the traffic light + only the current light has a color
  fill(0);
  rect(width/2, 0, height/10, height/2.25);

  // the lights
  if (light === 'red') fill(light);
  else fill(100);
  circle(width/2, height/20, height/20);

  if (light === 'yellow') fill(light);
  else fill(100);
  circle(width/2, height/9, height/20);

  if (light === 'green') fill(light);
  else fill(100);
  circle(width/2, height/5.75, height/20);
}

function drawSpeedSliders() {
  // sliders for setting speed ( at top left)

  // max
  maxSlider = createSlider(20, 50, 20);
  maxSlider.position(10, 10);
  maxSlider.size(90);
  // min

  minSlider = createSlider(2, 10, 2);
  minSlider.position(10, 40);
  minSlider.size(90);
}






class Vehicle {
  // make a vehicle class that: displats, moves, changes speed, and color changing

  constructor(type, dir) {
    this.type = type;
    this.dir = dir;
    let lane = round(random(0,2));

    if (this.dir === 'east') {
      this.x = 0;
      this.xSpeed = random(minSpeed, maxSpeed);
      this.color = color(50, 10, 100);

      // lane determiner
      if (lane === 0) this.y = height/2 + truckSize;
      else if (lane === 1) this.y = height/2 + height/8;
      else this.y = height*3/4 - truckSize;
    }

    else if (this.dir === 'west') {
      this.x = width;
      this.xSpeed = random(-maxSpeed, -minSpeed);
      this.color = color(50, 10, 100);
      
      // lane determiner
      if (lane === 0) this.y = height/4 + truckSize;
      else if (lane === 1) this.y = height/2 - height/8;
      else this.y = height/2 - truckSize;
    }

  }

  display() {
    // display the cars
    if (this.type === 0) drawVehicle(0, this.x, this.y, this.color, this.dir);
    else if (this.type === 1) drawVehicle(1, this.x, this.y, this.color, this.dir);
  }

  move() {
    if (counter > 0) {
      if (light === 'yellow') {
        this.speedDown();
      }
      else {
        this.xSpeed = 0;
        return;
      }
    }
    if (this.xSpeed === 0) {
      if (this.dir === 'east') this.xSpeed = 1;    
      if (this.dir === 'west') this.xSpeed = -1;    

    }
    this.x += this.xSpeed;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;

  }

  speedUp() {
    if (this.dir === 'east') {
      this.xSpeed += 2;
      if (this.xSpeed > maxSpeed) this.xSpeed = maxSpeed;
    }
    else if (this.dir === 'west') {
      this.xSpeed -= 2;
      if (this.xSpeed < -maxSpeed) this.xSpeed = -maxSpeed;
    }
  }

  speedDown() {
    if (this.dir === 'east') {
      this.xSpeed -= 2;
      if (this.xSpeed < minSpeed) this.xSpeed = minSpeed;
    }
    else if (this.dir === 'west') {
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
        light = 'yellow';
      }
      else {
        light = 'red';
      }
      counter -= 1;
    }
    else {
      light = 'green';
    }
  }

  action() {
    this.display();
    this.countDown();
  }
}









function mouseClicked() {
  // add more cars on mouse click (left click: east  // left+shift: west)
  if (mouseButton === LEFT && keyCode === SHIFT) {
    eastbound.push(new Vehicle(round(random(0,1)), 'east'));
  }
  else if (mouseButton === LEFT) {
    westbound.push(new Vehicle(round(random(0,1)), 'west'));
  }
}

function keyPressed() {
  // turn traffic light red with spacebar
  if (keyCode === 32) {
    counter = 160;
  }
}

function infoNspeed() {
  // display instructions (car adding), change speed

  // speed setters and displayers
  maxSpeed = maxSlider.value();
  minSpeed = minSlider.value();
  fill(0);
  text((maxSpeed + '  (Max speed)'), 110, 25);
  text((minSpeed + '  (Min speed)'), 110, 55) ;

  // The instructions
  fill('lightblue');
  rect(20, 75, 20, 20, 4);
  fill(0);
  text('?', 17, 80);
  text('Left click to add more westbound cars', 10, 100);
  text('Left click + shift to add more eastbound cars', 10, 120);
  text('Spacebar to turn traffic light red', 10, 140);
}




