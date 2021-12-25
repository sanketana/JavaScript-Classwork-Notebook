// Setting up Canvas
const canvas = document.getElementById("flappyBird");
const ctx = canvas.getContext("2d");

// Image Objects
var bg = new Image();
var fg = new Image();
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// Audio Objects
var fly = new Audio();
var hit = new Audio();
var die = new Audio();
var score_s = new Audio();

// Physics variables
var bX = 10;
var bY = 150;
var gravity = 1.5;
var pipeNorthX = canvas.width;
var pipeNorthY = 0;
var gap = 85;
var pipeSouthX = canvas.width;
var pipeSouthY = pipeNorth.height + gap;
var score = 0;
var gameOver = false;

// Setting sound and image sources
bg.src = "images-flappy/bg.png";
fg.src = "images-flappy/fg.png";
bird.src = "images-flappy/bird.png";
fly.src = "sounds-flappy/fly.mp3";
pipeNorth.src = "images-flappy/pipeNorth.png";
pipeSouth.src = "images-flappy/pipeSouth.png";
hit.src = "sounds-flappy/hit.wav";
die.src = "sounds-flappy/die.wav";
score_s.src = "sounds-flappy/score.mp3";

// Event handler
document.addEventListener("keydown", moveUp);

// Jump
function moveUp() {
  bY = bY - 20;
  fly.play();
}

// Touch sensing for any object with position at x, y and w, h as width and height
function touching(x, y, w, h) {
  if(bX + bird.width >= x &&
     bY + bird.height >= y &&
     bY <= y + h) {
       return(true);
  } else {
       return(false);
  }
}

// Update function
function update() {
  // Gravity simulation
  bY = bY + gravity;
  // North Pipe motion
  pipeNorthX = pipeNorthX - 2;
  // South Pipe motion by piggybacking North pipe
  pipeSouthX = pipeNorthX;
  pipeSouthY = pipeNorth.height + gap;

  // Jump pipes to right after they touch left edge
  if (pipeNorthX + pipeNorth.width == 0) {
    score = score + 1;
    score_s.play();
    pipeNorthX = canvas.width;
  }

  // North Pipe touch sensing
  if (touching(pipeNorthX, pipeNorthY, pipeNorth.width, pipeNorth.height)) {
    hit.play();
    gameOver = true;
    clearInterval(myInterval);
  }
  // South Pipe touch sensing
  if (touching(pipeSouthX, pipeSouthY, pipeSouth.width, pipeSouth.height)) {
    hit.play();
    gameOver = true;
    clearInterval(myInterval);
  }

  // Ground touch sensing
  if (bY + bird.height >= canvas.height - fg.height) {
    hit.play();
    gameOver = true;
    clearInterval(myInterval);
  }
  
}

// Render Function to draw stuff on Canvas
function render() {
  // Render backdrop
  ctx.drawImage(bg, 0, 0);
  // Render pipes
  ctx.drawImage(pipeNorth, pipeNorthX, pipeNorthY);
  ctx.drawImage(pipeSouth, pipeSouthX, pipeSouthY);
  // Render ground
  ctx.drawImage(fg, 0, canvas.height - fg.height);
  // Render bird
  ctx.drawImage(bird, bX, bY);
  // Render Score
  ctx.fillStyle = "#000";
  ctx.font = "25px Teko";
  ctx.fillText("Score : " + score, 10, canvas.height - 20);
  // Render game over is gameOver variable is set to true
  if(gameOver) {
    ctx.fillText("Game Over", canvas.width/3, canvas.height/2);
  }
}

// Game loop
function game() {
  update();
  render();
}

const fps = 50;

const myInterval = setInterval(game, 1000/fps);

// TODO
// 1. Game state (ready,game, over)
// 2. getAnimationFrame (independently control character fps)
// 3. Start screen
// 4. Touch sensing floor
// 5. Fix lag in Jump
// 6. Jump using mouse click
// 7. Pipe gap appears at random positions
// 8. More than one pipe on screen 
// 9. Better bird getAnimation (face up and down)
