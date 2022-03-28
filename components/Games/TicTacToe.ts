import { time } from "console";

enum SIDES {
  cross,
  circle,
  none
}

class TicTacToeGame {
  FPS = 60;
  SIZE = 3;
  FIELD_SIZE = Math.round(window.innerHeight / this.SIZE * 0.35);
  RADIUS = this.FIELD_SIZE / 2;
  WIDTH = this.SIZE * this.FIELD_SIZE;
  HEIGHT = this.SIZE * this.FIELD_SIZE;
  LINE_WIDTH = 10;
  grid: SIDES[][];
  nextSide: SIDES;
  winning: number[][] | false;
  constructor() {
    this.grid = [];
    this.resetGrid();
    this.nextSide = SIDES.circle;
    this.winning = false;
  }

  setSideInGrid(side: SIDES, xCoord: number, yCoord: number) {
    let x = Math.floor(xCoord / this.FIELD_SIZE);
    let y = Math.floor(yCoord / this.FIELD_SIZE);
    if (this.grid[x][y] === SIDES.none) {
      this.grid[x][y] = side;
      this.changeSide()
    }
  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {
    if (e.type === "contextmenu") {
      e.preventDefault();
    }

    if (e instanceof MouseEvent && e.type === "mousedown" && this.winning == false) {
      e.preventDefault();
      switch (e.button) {
        case 0:
          if (this.nextSide == SIDES.cross) {
            this.setSideInGrid(SIDES.cross, e.offsetX, e.offsetY);
          }
          break
        case 2:
          if (this.nextSide == SIDES.circle) {
            this.setSideInGrid(SIDES.circle, e.offsetX, e.offsetY);
          }
          break
      }

      console.log(this.isWin());
      console.log(this.winning)
      if (this.isWin()) {
        new Promise((res, rej) => {
          setTimeout(this.reset.bind(this), 6000);
          res(undefined);
        })
      }
    }
  }

  changeSide() {
    if (this.nextSide === SIDES.circle) { this.nextSide = SIDES.cross } else { this.nextSide = SIDES.circle }
  }

  resetGrid() {
    this.grid = []
    for (let i = 0; i < this.SIZE; i++) {
      this.grid.push([])
      for (let j = 0; j < this.SIZE; j++) {
        this.grid[i].push(SIDES.none)
      }
    }
  }

  isWin() {
    // row win check
    for (let i = 0; i < this.SIZE; i++) {
      if (this.grid[i].every(e => e === this.grid[i][0]) && this.grid[i][0] !== SIDES.none) {
        this.winning = this.grid[i].map((e, j) => {
          return [j, i]
        });
        return true
      }
    }

    // column win check
    for (let i = 0; i < this.SIZE; i++) {
      let row: SIDES[] = []
      for (let j = 0; j < this.SIZE; j++) {
        row.push(this.grid[j][i]);
      }
      if (row.every(e => e === row[0]) && row[0] !== SIDES.none) {
        this.winning = row.map((e, j) => {
          return [i, j]
        });
        return true
      }
      row = [];
    }

    // diagonal check
    let diagonal1: SIDES[] = [];
    let diagonal1Win: number[][] = [];
    let diagonal2: SIDES[] = [];
    let diagonal2Win: number[][] = [];
    for (let i = 0; i < this.SIZE; i++) {
      diagonal1.push(this.grid[i][i]);
      diagonal1Win.push([i, i]);
      diagonal2.push(this.grid[i][this.SIZE - i - 1]);
      diagonal2Win.push([i, this.SIZE - i - 1]);
    }
    if (diagonal1.every(e => e === diagonal1[0]) && diagonal1[0] !== SIDES.none) {
      this.winning = diagonal1Win;
      return true
    } else if (diagonal2.every(e => e === diagonal2[0]) && diagonal2[0] !== SIDES.none) {
      this.winning = diagonal2Win;
      return true
    }

    // if all fields are filled reset
    if (this.grid.every(f => f.every(e => e !== SIDES.none) === true)) {
      setTimeout(this.reset.bind(this), 5000);
    }
    return false
  }

  reset() {
    this.nextSide = SIDES.circle;
    this.resetGrid()
    this.winning = false;
  }

  update() {
  }

  posInWinning(pos: [number, number]) {
    if (this.winning) {
      for (let i = 0; i < this.winning.length; i++) {
        let x = this.winning[i][0]
        let y = this.winning[i][1]

        if (pos[0] == x && pos[1] == y) {
          return true
        }
      }

    }
    return false
  }

  draw(ctx: CanvasRenderingContext2D) {
    // clear
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

    // grid
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        ctx.beginPath();
        if ((i + j) % 2) {
          ctx.fillStyle = "#a0a0a0";
        } else {
          ctx.fillStyle = "#6a6a6a";
        }
        ctx.rect(this.FIELD_SIZE * i, this.FIELD_SIZE * j, this.FIELD_SIZE, this.FIELD_SIZE);
        ctx.fill();
        ctx.closePath();

        console.log(this.winning != false, this.posInWinning([i, j]))
        if (this.winning != false && this.posInWinning([i, j])) {
          console.log("winning", i, j);
          console.log(this.winning);
          ctx.beginPath();
          ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          ctx.rect(this.FIELD_SIZE * i, this.FIELD_SIZE * j, this.FIELD_SIZE, this.FIELD_SIZE);
          ctx.fill();
          ctx.closePath();
        }

        // draw crosses and circles
        if (this.grid[i][j] !== SIDES.none) {
          ctx.fillStyle = "#FFFFFF";
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = this.LINE_WIDTH;
          ctx.beginPath();
          switch (this.grid[i][j]) {
            case SIDES.circle:
              ctx.arc(this.FIELD_SIZE * i + this.RADIUS, this.FIELD_SIZE * j + this.RADIUS, this.RADIUS - this.LINE_WIDTH, 0, 360);
              ctx.stroke();
              break
            case SIDES.cross:
              ctx.moveTo(this.FIELD_SIZE * i + this.LINE_WIDTH, this.FIELD_SIZE * j + this.LINE_WIDTH)
              ctx.lineTo(this.FIELD_SIZE * (i + 1) - this.LINE_WIDTH, this.FIELD_SIZE * (j + 1) - this.LINE_WIDTH)
              ctx.moveTo(this.FIELD_SIZE * i + this.LINE_WIDTH, this.FIELD_SIZE * (j + 1) - this.LINE_WIDTH)
              ctx.lineTo(this.FIELD_SIZE * (i + 1) - this.LINE_WIDTH, this.FIELD_SIZE * j + this.LINE_WIDTH)
              ctx.stroke()
          }
          ctx.closePath();
        }
      }
    }

  }
}
export default TicTacToeGame;
