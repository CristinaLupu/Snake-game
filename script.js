class SnakeGame {
  snakeEl = document.getElementById("snake-part");
  boardEl = document.getElementById("board");
  directionDictionary = {
    ArrowLeft: this.moveLeft,
    ArrowRight: this.moveRight,
    ArrowUp: "up",
    ArrowDown: "down",
  };
  speed = 15;
  intervalId;

  addEvents() {
    addEventListener("keydown", (e) => this.changeDirection(e.code));
  }

  changeDirection(newDirection) {
    this.directionDictionary[newDirection].apply(this);
  }

  onSnakeMove() {
    if (this.isOutOfBorder()) {
      clearInterval(this.intervalId);
    }
  }

  moveRight() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const left = window.getComputedStyle(this.snakeEl).left;
      this.snakeEl.style.left = `${parseInt(left) + this.speed}px`;
      this.onSnakeMove();
    }, 150);
  }
  moveLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const left = window.getComputedStyle(this.snakeEl).left;
      this.snakeEl.style.left = `${parseInt(left) - this.speed}px`;
      this.onSnakeMove();
    }, 150);
  }

  isOutOfBorder() {
    const left = parseInt(window.getComputedStyle(this.snakeEl).left);
    const top = parseInt(window.getComputedStyle(this.snakeEl).top);

    if (left < 0 + this.snakeEl.clientWidth) {
      return true;
    } else if (top < 0) {
      return true;
    } else if (left > this.boardEl.clientWidth - this.snakeEl.clientWidth) {
      return true;
    } else if (top > this.boardEl.clientHeight - this.snakeEl.clientHeight) {
      return true;
    }

    return false;
  }
  constructor() {
    this.addEvents();
  }
}

new SnakeGame();
