import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SnakeGame from "../../components/Games/Snake";
import { Centered } from "../../components/common";
import GameType from "../../components/Games";
import PongGame from "../../components/Games/Pong";

const Game: React.FC<{}> = () => {
  const router = useRouter();
  const { game_id } = router.query
  let isValidURL = true;

  var game: GameType | undefined;
  switch (String(game_id).toLowerCase()) {
    case "snake":
      game = new SnakeGame();
      break
    case "pong":
      game = new PongGame();
      break
    default:
      isValidURL = false;
  }


  const canvasRef = useRef(null);


  if (isValidURL) {
    useEffect(() => {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const redrawInterval = setInterval(() => {
        game?.update();
        game?.draw(ctx);
      }, 1000 / game.FPS)

      const handleEvents = (e: MouseEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent && (e.code == "ArrowUp" || e.code == "ArrowRight" || e.code == "ArrowDown" || e.code == "ArrowLeft" || e.code == "Space")) {
          e.preventDefault()
        }
        game?.handleEvents(e);
      }

      window.addEventListener("keydown", handleEvents);
      window.addEventListener("keypress", handleEvents);
      window.addEventListener("keyup", handleEvents);
      canvas.addEventListener("mousedown", handleEvents);
      canvas.addEventListener("mousemove", handleEvents);
      canvas.addEventListener("mouseup", handleEvents);

      return (_: void) => {
        clearInterval(redrawInterval);
        window.removeEventListener("keydown", handleEvents);
        window.removeEventListener("keypress", handleEvents);
        window.removeEventListener("keyup", handleEvents);
        canvas.removeEventListener("mousedown", handleEvents);
        canvas.removeEventListener("mousemove", handleEvents);
        canvas.removeEventListener("mouseup", handleEvents);

      }
    }, [])
  } else {
    useEffect(() => { })
  }
  return (
    <Centered>
      {
        isValidURL ?
          <canvas ref={canvasRef} width={game.WIDTH} height={game.HEIGHT}></canvas>
          :
          <h1>404 Game Not Found</h1>
      }
    </Centered>
  )
}

export default Game;