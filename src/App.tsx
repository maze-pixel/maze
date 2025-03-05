import React, { useState, useEffect } from 'react';
import { Heart, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// 0 = path, 1 = wall, 2 = end, 3 = next stage
const mazeStage1 = [
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 3],
];

const mazeStage2 = [
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 2],
];

function App() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [currentStage, setCurrentStage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const currentMaze = currentStage === 1 ? mazeStage1 : mazeStage2;

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (showMessage) return;

    const newPos = { ...playerPos };

    switch (direction) {
      case 'up':
        if (newPos.y > 0 && currentMaze[newPos.y - 1][newPos.x] !== 1) newPos.y--;
        break;
      case 'down':
        if (newPos.y < currentMaze.length - 1 && currentMaze[newPos.y + 1][newPos.x] !== 1) newPos.y++;
        break;
      case 'left':
        if (newPos.x > 0 && currentMaze[newPos.y][newPos.x - 1] !== 1) newPos.x--;
        break;
      case 'right':
        if (newPos.x < currentMaze[0].length - 1 && currentMaze[newPos.y][newPos.x + 1] !== 1) newPos.x++;
        break;
    }

    setPlayerPos(newPos);

    // Check if player reached the next stage or end
    const cellValue = currentMaze[newPos.y][newPos.x];
    if (cellValue === 3) {
      setCurrentStage(2);
      setPlayerPos({ x: 0, y: 0 });
    } else if (cellValue === 2) {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': movePlayer('up'); break;
        case 'ArrowDown': movePlayer('down'); break;
        case 'ArrowLeft': movePlayer('left'); break;
        case 'ArrowRight': movePlayer('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, showMessage, currentStage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
      {!showMessage ? (
        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Find Your Path - Stage {currentStage}
          </h1>
          <div className="grid gap-1 mb-8">
            {currentMaze.map((row, y) => (
              <div key={y} className="flex gap-1">
                {row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center transition-colors
                      ${cell === 1 ? 'bg-indigo-900/80' : 'bg-indigo-700/30'}
                      ${cell === 2 ? 'bg-purple-500/30 animate-pulse' : ''}
                      ${cell === 3 ? 'bg-emerald-500/30 animate-pulse' : ''}
                    `}
                  >
                    {playerPos.x === x && playerPos.y === y && (
                      <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto">
              <div className="col-start-2">
                <button
                  onClick={() => movePlayer('up')}
                  className="w-full aspect-square rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
              </div>
              <div className="col-start-1 col-span-3 grid grid-cols-3 gap-2">
                <button
                  onClick={() => movePlayer('left')}
                  className="aspect-square rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => movePlayer('down')}
                  className="aspect-square rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
                <button
                  onClick={() => movePlayer('right')}
                  className="aspect-square rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md mx-4">
          <div className="text-center">
            <Heart className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            <p className="text-gray-200 leading-relaxed">
              I deeply regret causing you pain, and I understand that my actions have hurt you in ways that may be irreparable. Though I know forgiveness might not be possible, I want you to know that every moment we shared, every word spoken, and every feeling expressed was genuine and true. Your presence in my life has taught me invaluable lessons about love, responsibility, and growth. Thank you for everything you've given me, for the memories we created, and for helping me become a better person. I will always cherish what we had.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;