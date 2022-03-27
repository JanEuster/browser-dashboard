
class PongGame {
  FPS = 60;
  COLUMNS = 50;
  ROWS = 40;
  FIELD_SIZE = Math.round(window.innerHeight / this.COLUMNS * 0.8);
  RADIUS = this.FIELD_SIZE / 2;
  WIDTH = this.COLUMNS * this.FIELD_SIZE;
  HEIGHT = this.ROWS * this.FIELD_SIZE;
  CENTER_COLUMN = Math.round(this.COLUMNS / 2) * this.FIELD_SIZE
  PLAYER_SPEED = 0.4;
  BALL_SPEED = 1.65;
  p1Y: number;
  p2Y: number;
  p1Move: number;
  p2Move: number;
  ballPos: { x: number; y: number; };
  ballVel: { x: number; y: number; };
  score: { p1: number; p2: number; };

  constructor() {

    this.p1Y = Math.round(this.ROWS / 2 - 3)
    this.p2Y = Math.round(this.ROWS / 2 - 3)
    this.p1Move = 0;
    this.p2Move = 0;

    this.ballPos = { x: this.COLUMNS / 2, y: this.ROWS / 2 - 1 }
    this.ballVel = { x: 0.75 * this.BALL_SPEED, y: 0 }

    this.score = { p1: 0, p2: 0 };
  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {
    if (e instanceof KeyboardEvent) {
      if (e.type === "keyup") {
        switch (e.code) {
          case "KeyW":
          case "KeyS":
            this.p1Move = 0;
            break
          case "ArrowUp":
          case "ArrowDown":
            this.p2Move = 0;
            break
        }
      } else {

        switch (e.code) {
          case "KeyW":
            this.p1Move = -this.PLAYER_SPEED;
            break
          case "KeyS":
            this.p1Move = this.PLAYER_SPEED;
            break
          case "ArrowUp":
            this.p2Move = -this.PLAYER_SPEED;
            break
          case "ArrowDown":
            this.p2Move = this.PLAYER_SPEED;
            break
        }
      }
    }
  }

  reset() {
    this.ballPos = { x: this.COLUMNS / 2, y: this.ROWS / 2 }
    this.ballVel = { x: 0.5, y: 0 }
  }

  setBallVelocity(playerY: number, dir: number) {
    let ballOffset = (this.ballPos.y - playerY) / 4;
    let fromMiddle = Math.abs(ballOffset - 0.5);
    if (ballOffset < 0.5) {
      this.ballVel.x = (1 - fromMiddle) * dir * this.BALL_SPEED;
      this.ballVel.y = -fromMiddle;
    } else if (ballOffset > 0.5) {
      this.ballVel.x = (1 - fromMiddle) * dir * this.BALL_SPEED;
      this.ballVel.y = fromMiddle;
    } else {
      this.ballVel.x = 1 * dir * this.BALL_SPEED;
      this.ballVel.y = 0;
    }
  }


  clampPlayersY() {
    if (this.p1Y < 1) {
      this.p1Y = 1;
    } else if (this.p1Y + 5 > this.ROWS - 1) {
      this.p1Y = this.ROWS - 6;
    } else if (this.p2Y < 1) {
      this.p2Y = 1;
    } else if (this.p2Y + 5 > this.ROWS - 1) {
      this.p2Y = this.ROWS - 6;
    }
  }

  update() {
    this.p1Y += this.p1Move;
    this.p2Y += this.p2Move;
    this.clampPlayersY()

    if (this.ballPos.x < 3 && this.ballPos.y + 1 > this.p1Y && this.ballPos.y < this.p1Y + 5) {
      this.setBallVelocity(this.p1Y, 1);
    } else if (this.ballPos.x > this.COLUMNS - 4 && this.ballPos.y + 1 > this.p2Y && this.ballPos.y < this.p2Y + 5) {
      this.setBallVelocity(this.p2Y, -1);
    } else if (this.ballPos.y < 1 || this.ballPos.y > this.ROWS - 2) {
      this.ballVel.y *= -1;
    }

    this.ballPos.x += this.ballVel.x * 0.5;
    this.ballPos.y += this.ballVel.y * 0.5;


    if (this.ballPos.x < 0 || this.ballPos.y < 0) {
      this.score.p2 += 1;
      this.reset();
    } else if (this.ballPos.x > this.COLUMNS || this.ballPos.y > this.ROWS) {
      this.score.p1 += 1;
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // clear screen
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.fill();
    ctx.closePath();


    // draw top and bottom borders
    ctx.beginPath()
    ctx.fillStyle = "#FFFFFF"
    ctx.rect(0, 0, this.WIDTH, this.FIELD_SIZE);
    ctx.rect(0, this.HEIGHT - this.FIELD_SIZE, this.WIDTH, this.FIELD_SIZE);

    // center column dotted line
    for (let i = 1; i < this.ROWS; i += 2) {
      ctx.rect(this.CENTER_COLUMN, i * this.FIELD_SIZE, this.FIELD_SIZE, this.FIELD_SIZE);
    }

    // draw players
    ctx.rect(2 * this.FIELD_SIZE, this.p1Y * this.FIELD_SIZE, this.FIELD_SIZE, 5 * this.FIELD_SIZE);
    ctx.rect(this.WIDTH - 3 * this.FIELD_SIZE, this.p2Y * this.FIELD_SIZE, this.FIELD_SIZE, 5 * this.FIELD_SIZE);

    // draw ball
    ctx.rect(this.ballPos.x * this.FIELD_SIZE, this.ballPos.y * this.FIELD_SIZE, this.FIELD_SIZE, this.FIELD_SIZE);

    // draw score
    ctx.font = "80px Arial";
    ctx.textAlign = "right"
    ctx.fillText(String(this.score.p1), this.CENTER_COLUMN - this.FIELD_SIZE, 6 * this.FIELD_SIZE);
    ctx.textAlign = "left"
    ctx.fillText(String(this.score.p2), this.CENTER_COLUMN + 2 * this.FIELD_SIZE, 6 * this.FIELD_SIZE);

    ctx.closePath()
    ctx.fill()
  }
}
export default PongGame;
