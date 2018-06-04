let bubbles = [];
let ship;
let shots = [];
let eshots = [];
let score = 0;
let sd;

function Ship() {
  this.x = width / 2;
  this.y = 830;
  this.show = function() {
    fill(255);
    rect(this.x, this.y, 20, 20);
  }
}


function Shots() {
  this.x = ship.x + 10;
  this.y = ship.y;
  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 20, 20);
  }
  this.move = function() {
    this.y = this.y - 10;
  }
}

/*function Eshots() {
  this.x = bubbles[i].x + 10;
  this.y = bubbles[i].y;
  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 20, 20);
  }
  this.move = function() {
    this.y = this.y - 10;
  }
}*/


function setup() {
  createCanvas(1900, 850);
  ship = new Ship();
  for (let i = 0; i < 100; i++) {
    bubbles[i] = {
      x: random(0, width),
      y: random(-800, 0),
      color: "blue",
      size: 30
    };
  }
  noLoop();
}


function draw() {
  background(0);
  ship.show();
  textSize(12);
  text("Score: "+score, 10, 30);
  for (let s = 0; s < shots.length; s++) {
    shots[s].show();
    shots[s].move();
  }

  for (let i = 0; i < bubbles.length; i++) {
    fill(bubbles[i].color);
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size, bubbles[i].size);

    if (bubbles[i].y + (bubbles[i].size / 2) >= height) {
      bubbles[i].y = 0;
    }

    bubbles[i].y += 5;


    var dx = bubbles[i].x - ship.x; // what is this doing?
    var dy = bubbles[i].y - ship.y; // you redefining dx and dy

    var d = sqrt((dx * dx) + (dy * dy)); // d is distance
    if (d <= bubbles[i].size / 2) {
      noLoop();
    }
  }
  if (keyIsDown(RIGHT_ARROW) && ship.x + 20 < width) {
    ship.x =+ ship.x + 8;
  }
  else if (keyIsDown(LEFT_ARROW) && ship.x > 0) {
    ship.x =+ ship.x - 8;
  }
  if (keyIsDown(UP_ARROW) && ship.y > 0) {
    ship.y =+ ship.y - 8;
  }
  else if (keyIsDown(DOWN_ARROW) && ship.y + 20  < 850) {
    ship.y =+ ship.y + 8;
  }

  for (var i = bubbles.length - 1; i >= 0; i--) {

    for (var j = shots.length - 1; j >= 0; j--) {
      var sd = dist(shots[j].x, shots[j].y, bubbles[i].x, bubbles[i].y);
      if (sd < 20) {
        shots.splice(j, 1);
        bubbles.splice(i, 1);
        score =+ score + 1;
        break;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    score = 0;
    shots = [];
    setup();
    loop();
  }
  if (keyCode === 32) {
    var shot = new Shots(width / 2, height / 2);
    shots.push(shot);
  }
}
