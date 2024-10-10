// Book Shelf
// Muntaha Chowdhury
// Oct 10, 2024
// A book shelf made using objects

let book1, book2, book3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  book1 = new Book("CSC 30", "Mun", "softcover", 200, width*0.3, 150, 1234567891014);
  book2 = new Book("CSC 30", "Mun", "softcover", 100, width*0.3+200, 150, 12345676791011);
  book3 = new Book("CSC 30", "Mun", "softcover", 700, width*0.3+300, 150, 12345672341011);  
}

function draw() {
  background(220);
}


class Book {

  constructor(title, author, coverType, pages, x, h, isbn) {
    this.title = title;
    this.author = author;
    this.coverType = coverType;
    this.pages = pages;
    this.x = x;
    this.h = h;
    this.isbn = isbn;
  }

  display() {
    textAlign(CENTER, CENTER);

    fill(0);
    rect(x, height/2, pages/10, h);

    textSize(10);
    fill(255);
    text(this.title[0], x, height/2 - h/2);
  }

}