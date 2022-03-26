import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SnakeGame from "../../components/Games/Snake";
import { Centered } from "../../components/common";

const Game: React.FC<{}> = () => {
  const router = useRouter();
  const { game_id } = router.query

  var game: SnakeGame = new SnakeGame();
  switch (String(game_id).toLowerCase()) {
    case "snake":
      game = new SnakeGame();
      break
    default:
      return <h1>404 Game Not Found</h1>
  }


  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const redrawInterval = setInterval(() => {
      game.update();
      game.draw(ctx);
    }, 200)

    window.addEventListener("keydown", game.handleEvents);
    canvas.addEventListener("mousedown", game.handleEvents);
    canvas.addEventListener("mousemove", game.handleEvents);
    canvas.addEventListener("mouseup", game.handleEvents);

    return (_: void) => {
      clearInterval(redrawInterval);
      window.removeEventListener("keydown", game.handleEvents);
      canvas.removeEventListener("mousedown", game.handleEvents);
      canvas.removeEventListener("mousemove", game.handleEvents);
      canvas.removeEventListener("mouseup", game.handleEvents);

    }
  }, [])
  return (
    <Centered>

      <canvas ref={canvasRef} width={game.WIDTH} height={game.HEIGHT}></canvas>
    </Centered>
  )
}

export default Game;