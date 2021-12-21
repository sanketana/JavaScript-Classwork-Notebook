const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// User Object
const user = {
  x : 10,
  y : canvas.height/2 - 100/2,
  width : 10, 
  height : 100, 
  color : 'WHITE',
  score : 0
}

// Computer Object
const com = {
  x : canvas.width - 20,
  y : 300,//canvas.height/2 - 100/2,
  width : 10, 
  height : 100, 
  color : 'WHITE',
  score : 0
}

// Ball Object
const ball = {
  x : canvas.width/2,
  y : canvas.height/2,
  radius : 10,
  speed : 5, 
  velocityX : 5,
  velocityY : 5,
  color : 'WHITE'
}

// Function to draw rectangle
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// Function to draw draw Circle 
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

// Function to draw text
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "75px fantasy";
  ctx.fillText(text, x, y);
}

// Render function
function render() {
  // Draw Game Components
  drawRect(0, 0, 600, 400, 'black');
  // Draw Net
  drawRect(canvas.width/2, 0, 2, canvas.height, 'WHITE');
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawText(user.score, canvas.width/4, canvas.height/5, 'WHITE');
  drawText(com.score, 3*canvas.width/4, canvas.height/5, 'WHITE');
}

// Add mouse event listener
canvas.addEventListener("mousemove", getMousePos);

// Event handler function
function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY;
}
// Game function
function game() {
  update();
  render(); 
}

// User paddle touch sensing
function touchingUser() {
  if (ball.x > user.x && ball.x < (user.x + user.width) &&
      ball.y > user.y && ball.y < (user.y + user.height)) {
        return true;
  } else {
        return false;
  }
}

// Computer paddle touch sensing
function touchingCom() {
  if (ball.x > com.x && ball.x < (com.x + com.width) &&
      ball.y > com.y && ball.y < (com.y + com.height)) {
        return true;
  } else {
        return false;
  }
}

// Reset ball to center when play or computer scores
function resetBall() {
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.velocityX = -ball.velocityX;
}

// Update function
function update() {
  // Move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Check if ball is missed
  if (ball.x < 0) {
    com.score++;
    resetBall();
  } else if (ball.x > canvas.width) {
    user.score++;
    resetBall();
  }

  // Bounce ball off top edge
  if (ball.y < 0) {
    ball.velocityY = -ball.velocityY;
  }
  // Bounce ball off bottom edge
  if (ball.y > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  // Bouce ball off Computer paddle
  if (touchingCom()) {
    ball.velocityX = -ball.velocityX;
  }

  // Bouce ball off User paddle
  if (touchingUser()) {
    ball.velocityX = -ball.velocityX;
  }

  // Simple Computer AI 
  com.y = ball.y - com.height/2;

}
const fps = 50;

setInterval(game, 1000/fps);