import {useState, useEffect, useCallback, useRef} from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{x: 10, y: 10}];
const INITIAL_DIRECTION = {x: 0, y: -1};

type Point = {x: number, y: number};

export default function SnakeGame({setScore}: {setScore: (score: number) => void}) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({x: 5, y: 5});
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<number>();

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setFood({x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE)});
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prev => {
      const newSnake = [...prev];
      const head = {...newSnake[0]};
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || 
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prev;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setScore(prevSnake => prevSnake.length); // Actual score logic
        setFood({x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE)});
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, gameOver, setScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': if (direction.y !== 1) setDirection({x: 0, y: -1}); break;
        case 'ArrowDown': if (direction.y !== -1) setDirection({x: 0, y: 1}); break;
        case 'ArrowLeft': if (direction.x !== 1) setDirection({x: -1, y: 0}); break;
        case 'ArrowRight': if (direction.x !== -1) setDirection({x: 1, y: 0}); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake]);

  return (
    <div id="snake-container" className="relative bg-zinc-900 p-2 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.3)]">
      <div id="snake-board" className="grid" style={{gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}>
        {Array.from({length: GRID_SIZE * GRID_SIZE}).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div key={i} className={`w-6 h-6 border-[0.5px] border-zinc-900 ${isSnake ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : isFood ? 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef]' : 'bg-zinc-950'}`}></div>
          );
        })}
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-fuchsia-500 gap-4 animate-glitch border-2 border-cyan-400">
          <p className="text-4xl font-bold">GAME OVER</p>
          <button id="reset-game-btn" onClick={resetGame} className="px-6 py-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold">RESTART</button>
        </div>
      )}
    </div>
  );
}
