const canvas = document.getElementById("flappyBird");
const ctx = canvas.getContext("2d");

var bg = new Image();
var fg = new Image();
var bird = new Image();

var fly = new Audio();

var bX = 10;
var bY = 150;
var gravity = 1.5;

bg.src = "images-flappy/bg.png";
fg.src = "images-flappy/fg.png";
bird.src = "images-flappy/bird.png";
fly.src = "images-flappy/"

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY = bY - 25;
}

function update() {
  bY = bY + gravity;

}

function render() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, canvas.height - fg.height);

  ctx.drawImage(bird, bX, bY);

}

function game() {
  update();
  render();
}

const fps = 50;

setInterval(game, 1000/fps);