let xPos, yPos, moveX, moveY;

function setup() {
	// sets up the canvas and gives values to variables

	createCanvas(windowWidth, windowHeight);
	xPos=200; 
	yPos=300; 
	moveX=random(3,8); 
	moveY=random(3,8);
}

function draw() {
	// draws background and a rectangle that changes position every frame

	m();
	background(80,80,80);
	rect(xPos, yPos, 250, 75);
}

function m(){
	// changes rectangle dimensions based on current size and windon size

	xPos += moveX; 
	yPos += moveY;

	// change moveX/Y to negative to avoid getting out of screen
	if ( yPos >= height-75 || yPos <= 0 ) {
		moveY = moveY * (-1);
	}

	if ( xPos >= width-250 || xPos <= 0 ) {
		moveX = moveX * (-1);
	}

}