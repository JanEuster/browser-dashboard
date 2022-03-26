

enum Directions {
  Up,
  Right,
  Down,
  Left
}

class SnakeGame {
  WIDTH = 780;
  HEIGHT = 600;
  FIELD_SIZE = 60;
  RADIUS = this.FIELD_SIZE / 2
  DEFAULT_SNAKE = [[4, 5], [3, 5]]
  ROWS = this.HEIGHT / this.FIELD_SIZE;
  COLUMNS = this.WIDTH / this.FIELD_SIZE;
  direction: Directions;
  prevDirection: Directions;
  snake: number[][];
  apple: false | number[];

  constructor() {

    this.snake = this.DEFAULT_SNAKE;
    this.direction = Directions.Right;
    this.prevDirection = this.direction;
    this.apple = false;
    this.spawnApple();

    this.handleEvents = this.handleEvents.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {

    if (e instanceof KeyboardEvent) {
      switch (e.code) {
        case "KeyW":
          this.direction = Directions.Up;
          break
        case "KeyD":
          this.direction = Directions.Right;
          break
        case "KeyS":
          this.direction = Directions.Down;
          break
        case "KeyA":
          this.direction = Directions.Left;
          break
      }
    }

    if (this.prevDirection !== this.direction && !((this.prevDirection + this.direction) % 2)) {
      return this.reset();
    }
  }

  reset() {
    this.snake = this.DEFAULT_SNAKE;
    this.direction = Directions.Right;
    this.apple = false;
    this.spawnApple();
  }

  isOutsideField(pos: number[]) {
    if (pos[0] < 0 || pos[0] > this.COLUMNS || pos[1] < 0 || pos[1] > this.ROWS) {
      return true
    }
    return false
  }

  spawnApple() {
    if (!this.apple) {
      let x = Math.round(Math.random() * (this.COLUMNS - 1));
      let y = Math.round(Math.random() * (this.ROWS - 1));
      this.apple = [x, y];
    }
  }

  update() {
    this.prevDirection = this.direction;

    // move snake
    let newSnake: number[][] = []
    switch (this.direction) {
      case Directions.Up:
        newSnake.push([this.snake[0][0], this.snake[0][1] - 1]);
        break
      case Directions.Right:
        newSnake.push([this.snake[0][0] + 1, this.snake[0][1]]);
        break
      case Directions.Down:
        newSnake.push([this.snake[0][0], this.snake[0][1] + 1]);
        break
      case Directions.Left:
        newSnake.push([this.snake[0][0] - 1, this.snake[0][1]]);
        break
    }
    newSnake.push(...this.snake);
    this.snake = newSnake;
    let last = this.snake.pop();

    this.snake.forEach(([x, y]) => {
      if (last && this.apple && this.apple[0] == x && this.apple[1] == y) {
        this.apple = false;
        this.snake.push(last);
      }

    })

    // is snake head outside field
    if (this.isOutsideField(this.snake[0])) {
      return this.reset();
    }

    // randomly spawn apple
    if (Math.random() * 10 < 5) {
      this.spawnApple()
    }

    // self collision on snake
    this.snake.slice(1).forEach(([x, y]) => {
      if (this.snake[0][0] == x && this.snake[0][1] == y) this.reset();

    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    // clear canvas
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    // draw grid
    for (let i = 0; i < this.COLUMNS; i++) {
      for (let j = 0; j < this.ROWS; j++) {
        ctx.beginPath();
        if ((i + j) % 2) {
          ctx.fillStyle = "#F6EFBB";
        } else {
          ctx.fillStyle = "#CBF581";
        }
        ctx.rect(i * this.FIELD_SIZE, j * this.FIELD_SIZE, this.FIELD_SIZE, this.FIELD_SIZE);
        ctx.fill();
        ctx.closePath()
      }
    }

    // draw snake body
    ctx.beginPath();
    ctx.strokeStyle = "#FF573F";
    ctx.lineWidth = this.RADIUS * 1.3;
    ctx.lineCap = "square"

    ctx.moveTo(this.snake[0][0] * this.FIELD_SIZE + this.RADIUS, this.snake[0][1] * this.FIELD_SIZE + this.RADIUS);
    this.snake.forEach(([x, y]) => {
      ctx.lineTo(x * this.FIELD_SIZE + this.RADIUS, y * this.FIELD_SIZE + this.RADIUS);
    })

    ctx.stroke();
    ctx.closePath();

    // draw apple
    if (this.apple) {
      ctx.beginPath();
      ctx.fillStyle = "#FF573F";
      ctx.arc(this.apple[0] * this.FIELD_SIZE + this.RADIUS, this.apple[1] * this.FIELD_SIZE + this.RADIUS, this.FIELD_SIZE * 0.3, 0, 360);
      ctx.fill();
      ctx.closePath();
    }
  }
}
export default SnakeGame;
