
class GameTemplate {
  FPS = 60;
  COLUMNS = 13;
  ROWS = 10;
  FIELD_SIZE = Math.round(window.innerHeight / this.COLUMNS * 0.75);
  RADIUS = this.FIELD_SIZE / 2;
  WIDTH = this.COLUMNS * this.FIELD_SIZE;
  HEIGHT = this.ROWS * this.FIELD_SIZE;
  constructor() {

  }

  handleEvents(e: MouseEvent | KeyboardEvent): void {

  }

  reset() {

  }

  update() {

  }

  draw(ctx: CanvasRenderingContext2D) {

  }
}
export default GameTemplate;
