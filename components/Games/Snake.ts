

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
  ROWS = this.HEIGHT / this.FIELD_SIZE;
  COLUMNS = this.WIDTH / this.FIELD_SIZE;
  direction: Directions;
  snake: number[][];
  apple: false | Number[];

  constructor() {

    this.snake = [[4, 5], [3, 5]];
    this.direction = Directions.Right;
    this.apple = false;
    this.spawnApple();

    this.handleEvents = this.handleEvents.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {
    const prevDirection = this.direction;

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

    if (prevDirection !== this.direction && !((prevDirection + this.direction) % 2)) {
      return this.reset();
    }
  }

  reset() {
    this.snake = [[4, 5], [3, 5]];
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
      let x = Math.round(Math.random() * this.COLUMNS);
      let y = Math.round(Math.random() * this.ROWS);
      this.apple = [x, y];
    }
  }

  update() {
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
    if (this.isOutsideField(newSnake[0])) {
      return this.reset()
    }
    newSnake.push(...this.snake);
    this.snake = newSnake;
    this.snake.pop();

    if (this.snake[0][0] == this.apple[0] && this.snake[0][1] == this.apple[1]) {
      this.apple = false;
      let i = this.snake.length - 1

      switch (this.direction) {
        case Directions.Up:
          this.snake.push([this.snake[i][0], this.snake[i][1] + 1]);
          break
        case Directions.Right:
          this.snake.push([this.snake[i][0] - 1, this.snake[i][1]]);
          break
        case Directions.Down:
          this.snake.push([this.snake[i][0], this.snake[i][1] - 1]);
          break
        case Directions.Left:
          this.snake.push([this.snake[i][0] + 1, this.snake[i][1]]);
          break
      }
    }

    // randomly spawn apple
    if (Math.random() * 10 < 3) {
      this.spawnApple()
    }
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
    this.snake.forEach(pos => {
      ctx.beginPath();
      ctx.fillStyle = "#FF573F";
      ctx.rect(pos[0] * this.FIELD_SIZE, pos[1] * this.FIELD_SIZE, this.FIELD_SIZE, this.FIELD_SIZE);
      ctx.fill();
      ctx.closePath();
    })

    // draw apple
    if (this.apple) {
      ctx.beginPath();
      ctx.fillStyle = "#FF573F";
      ctx.arc(this.apple[0] * this.FIELD_SIZE + this.FIELD_SIZE / 2, this.apple[1] * this.FIELD_SIZE + this.FIELD_SIZE / 2, this.FIELD_SIZE / 3, 0, 360);
      ctx.fill();
      ctx.closePath();
    }
  }
}
export default SnakeGame;
