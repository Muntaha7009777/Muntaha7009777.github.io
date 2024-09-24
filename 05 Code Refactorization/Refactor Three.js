//Black and White Target

let position = 200;
let originalSize = 400;
let reduceSizeBy = 40;
let numOfCircles = 10;

function setup() {
    createCanvas(400, 400);
}


function draw() {
    // draw a target board
    background(240);
    for (let i = 0; i < numOfCircles; i++ ) {
        ellipse(position, position, originalSize-(reduceSizeBy*i), originalSize-(reduceSizeBy*i));
    }
}