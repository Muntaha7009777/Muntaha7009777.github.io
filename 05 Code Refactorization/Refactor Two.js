// This example is adapted from Learning Processing Example 5-3 by Daniel Shiffman
// http://www.learningprocessing.com
// Refactor the following code. Be sure the refactored version:
//  - is readable
//  - is able to work easily with any canvas size

let screenWidth = 480;
let screenHeight = 270;

function setup() {
    // sets up a canvas to work on
    createCanvas(screenWidth, screenHeight);
}

function draw() {
    // draws background and a rectangle with changing position based on where the mouse is

    background(255);

    // draws 2 lines
    stroke(0);
    line(screenWidth/2, 0, screenWidth/2, screenHeight);   //Vertical line in middle
    line(0, screenHeight/2, 480, screenHeight/2);   //Horizontal line in middle

    drawRectangle();

}


function drawRectangle() {
    // Draws square based on mouse position

    noStroke();
    fill(0);

    if (mouseX < screenWidth/2 && mouseY < screenHeight/2){          // top-left
        rect(0, 0, screenWidth/2, screenHeight/2);
    }
    else if (mouseX > 240 && mouseY < screenHeight/2){               // top-right
        rect(screenWidth/2, 0, screenWidth/2, screenHeight/2);
    }
    else if (mouseX < screenWidth/2 && mouseY > screenHeight/2){     // bottom-left
        rect(0, screenHeight/2, screenWidth/2, screenHeight/2);
    }
    else if (mouseX > 240 && mouseY > screenHeight/2){               // bottom-right
        rect(screenWidth/2, screenHeight/2, screenWidth/2, screenHeight/2);
    }
}