
class TowersOfHanoiGame {
  FPS = 60;
  COLUMNS = 3;
  ROWS = 1;
  FIELD_SIZE = Math.round(window.innerWidth / this.COLUMNS * 0.5);
  RADIUS = this.FIELD_SIZE / 2;
  ROD_WIDTH = this.FIELD_SIZE / 20;
  WIDTH = this.COLUMNS * this.FIELD_SIZE;
  HEIGHT = this.ROWS * this.FIELD_SIZE;
  n: number;
  rods: number[][];
  baseWidth: number;
  moving_disk: number;
  solveRods: number[][];
  solution_steps: typeof this.solveRods[];
  constructor() {
    this.n = 3;
    this.baseWidth = this.FIELD_SIZE / this.n * 2 / 3;
    this.rods = [[], [], []]
    for (let i = this.n; i > 0; i--) {
      this.rods[0].push(i);
    }
    this.solveRods = this.rods;

    this.moving_disk = -1;

    this.solution_steps = [];
    this.solver(0, 0, 1, 2);

    // let steps: typeof this.solution_steps = [];
    // this.solution_steps.forEach((e) => {
    //   if (!steps.includes([...e])) {
    //     steps.push(e);
    //   }
    // })
    // this.solution_steps = steps;
    console.log(this.solveRods, this.solution_steps.length)
    console.log(this.solution_steps)
  }

  solver(level: number, start_rod: number, non_goal_rod: number, goal_rod: number) {

    if (level + 1 < this.n) {
      this.solver(level + 1, start_rod, goal_rod, non_goal_rod);
    }


    let item = this.solveRods[start_rod].pop();
    this.solveRods[goal_rod].push(item);

    this.solution_steps.push([...this.solveRods]);
    console.log(this.solveRods)

    if (level + 1 < this.n) {
      this.solver(level + 1, non_goal_rod, start_rod, goal_rod);
    }

  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {

    if (e instanceof MouseEvent) {
      let rodsIndex = Math.floor(e.offsetX / (this.WIDTH / 3));
      if (e.type === "mousedown") {
        if (this.moving_disk == -1 && this.rods[rodsIndex].length > 0) {
          this.moving_disk = this.rods[rodsIndex].pop()
        } else if (this.moving_disk >= 0) {
          if (this.rods[rodsIndex].length == 0 || this.rods[rodsIndex][this.rods[rodsIndex].length - 1] > this.moving_disk) {
            this.rods[rodsIndex].push(this.moving_disk);
            this.moving_disk = -1;
          }
        }
      }
    }
  }

  reset() {

  }

  update() {

  }

  draw(ctx: CanvasRenderingContext2D) {
    // clear
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.closePath();
    ctx.fill();


    // rods
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < 3; i++) {
      ctx.rect(i * this.FIELD_SIZE + this.RADIUS - this.ROD_WIDTH / 2, 1 / 4 * this.FIELD_SIZE, this.ROD_WIDTH, 3 / 4 * this.FIELD_SIZE)
    }

    ctx.closePath();
    ctx.fill();

    // disks
    ctx.beginPath();
    ctx.fillStyle = "#AA8800";
    this.rods.forEach((rod, i) => {
      rod.forEach((x, y) => {
        ctx.rect(i * this.FIELD_SIZE + this.RADIUS - this.baseWidth / 2 * x, this.HEIGHT - (y * this.ROD_WIDTH * 2) - this.ROD_WIDTH * 2, this.baseWidth * x, this.ROD_WIDTH * 2);
      })
    })
    ctx.closePath();
    ctx.fill();

  }
}
export default TowersOfHanoiGame;
