class SnakeGame {
  snakeEl = document.getElementById("snake-part");
  boardEl = document.getElementById("board");
  directionDictionary = {
    ArrowLeft: this.moveLeft,
    ArrowRight: this.moveRight,
    ArrowUp: this.moveUp,
    ArrowDown: this.moveDown,
  };
  speed = 15;
  intervalId;
  axis;

  addEvents() {
    addEventListener("keydown", (e) => this.changeDirection(e.code));
  }

  changeDirection(newDirection) {
    if (newDirection === "ArrowLeft" || newDirection === "ArrowRight") {
      this.axis = "X";
    } else if (newDirection === "ArrowUp" || newDirection === "ArrowDown") {
      this.axis = "Y";
    }
    if (this.directionDictionary[newDirection]) {
      this.directionDictionary[newDirection].apply(this);
    }
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
  moveDown() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const top = window.getComputedStyle(this.snakeEl).top;
      this.snakeEl.style.top = `${parseInt(top) + this.speed}px`;
      this.onSnakeMove();
    }, 150);
  }
  moveUp() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const top = window.getComputedStyle(this.snakeEl).top;
      this.snakeEl.style.top = `${parseInt(top) - this.speed}px`;
      this.onSnakeMove();
    }, 150);
  }

  isOutOfBorder() {
    const left = parseInt(window.getComputedStyle(this.snakeEl).left);
    const top = parseInt(window.getComputedStyle(this.snakeEl).top);

    if (this.axis == "X") {
      //* for left border
      if (left < 0 + this.snakeEl.clientWidth) {
        return true;
        //* for right border
      } else if (left >= this.boardEl.clientWidth - this.snakeEl.clientWidth) {
        return true;
      }
    }
    if (this.axis == "Y") {
      //* for top border
      if (top < 0 + this.snakeEl.clientHeight) {
        return true;
        //* for bottom border
      } else if (top >= this.boardEl.clientHeight - this.snakeEl.clientHeight) {
        return true;
      }
    }
    return false;
  }
  constructor() {
    this.addEvents();
  }
}

new SnakeGame();
