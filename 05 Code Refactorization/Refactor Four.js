//Chess Board

let size = 75;
let numOfCol = 8;
let numOfRow = 8;

function setup() {
    createCanvas(600, 600);
}

function draw() {
    // draw chessboard

    for (let col = 0; col < numOfCol; col++) {

        for (let row = 0; row < numOfRow; row++) {

            // If odd column, start with white
            if (col%2 === 0) {
                if (row%2 === 0) fill(255);
                else fill(0);
            }

            // If even column, start with black
            else {
                if (row%2 === 0) fill(0);
                else fill(255);
            }
            rect((col*size), (row*size), size);
        }
        
    }
}