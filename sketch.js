let value = 0;
let Pos = [{ x: 30, y: 30 }];
let foodX = 0;
let foodY = 0;
let xDir = 1;
let yDir = 1;
let score = 0;
let moveFactor = 0.7;
let rectangleHeight = 10;
let rectangleWidth = 10;
function setup() {
  createCanvas(640, 480);
  // Create an Audio input
  background(51);
  mic = new p5.AudioIn();
  foodX = Math.floor(Math.random() * 570) + 5 * moveFactor;
  foodY = Math.floor(Math.random() * 480) + 5 * moveFactor;
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(51);
  fill("white");
  text("Score: " + score, 10, 25);

  let Temp = Pos;
  Pos.map(p => {
    p.y = p.y + 5 * moveFactor * yDir;
    p.x = p.x + 5 * moveFactor * xDir;

    rect(p.x, p.y, rectangleHeight, rectangleWidth);
    if (eats(p.x, p.y, rectangleHeight, rectangleWidth)) {
      score++;
      Temp[Temp.length] = Temp[Temp.length - 1];
      Temp[Temp.length] = Temp[Temp.length - 1];
      foodX = Math.floor(Math.random() * 470) + 5 * moveFactor;
      foodY = Math.floor(Math.random() * 400) + 5 * moveFactor;
    }
    return p;
  });
  Pos = Temp;
  fill("red");

  rect(foodX, foodY, rectangleHeight, rectangleWidth);
}
function keyPressed() {
  if (keyCode === UP_ARROW) {
    // y = y - 5 * moveFactor;
    yDir = -1;
    xDir = 0;
  } else if (keyCode === DOWN_ARROW) {
    // y = y + 5 * moveFactor;
    yDir = 1;
    xDir = 0;
  }
  if (keyCode === LEFT_ARROW) {
    // x = x - 5 * moveFactor;
    yDir = 0;
    xDir = -1;
  } else if (keyCode === RIGHT_ARROW) {
    // x = x + 5 * moveFactor;
    xDir = 1;
    yDir = 0;
  }
}
function eats(x, y, w, h) {
  if (
    foodX > x - 5 &&
    foodX < x + w + 5 &&
    foodY > y - 5 &&
    foodY < y + h + 5
  ) {
    return true;
  } else {
    return false;
  }
}
