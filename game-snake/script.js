const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const boxSize = 20;
let snake = [{ x: 9 * boxSize, y: 9 * boxSize }];
let direction = { x: boxSize, y: 0 };
let food = {};
let score = 0;
let gameInterval;

function startGame() {
  placeFood();
  gameInterval = setInterval(updateGame, 200);
  document.addEventListener("keydown", changeDirection);
}

function placeFood() {
  food.x =
    Math.floor(Math.random() * (gameArea.clientWidth / boxSize)) * boxSize;
  food.y =
    Math.floor(Math.random() * (gameArea.clientHeight / boxSize)) * boxSize;
}

function changeDirection(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -boxSize };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: boxSize };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -boxSize, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: boxSize, y: 0 };
      break;
  }
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // بررسی پایان بازی
  if (
    head.x < 0 ||
    head.x >= gameArea.clientWidth ||
    head.y < 0 ||
    head.y >= gameArea.clientHeight ||
    snakeCollision(head)
  ) {
    clearInterval(gameInterval);
    alert("بازی تمام شد! امتیاز شما: " + score);
    return;
  }

  snake.unshift(head);

  // بررسی اینکه آیا مار غذا را خورده است
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.innerText = "امتیاز: " + score;
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function snakeCollision(head) {
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

function draw() {
  gameArea.innerHTML = ""; // پاک کردن ناحیه بازی
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.width = snakeElement.style.height = boxSize + "px";
    snakeElement.style.left = segment.x + "px";
    snakeElement.style.top = segment.y + "px";
    gameArea.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.width = foodElement.style.height = boxSize + "px";
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  gameArea.appendChild(foodElement);
}

startGame();
