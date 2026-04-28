/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from 'react';
import SnakeGame from './components/SnakeGame.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center justify-center gap-8 font-mono">
      <h1 className="text-5xl font-bold text-cyan-400 tracking-widest animate-glitch border-b-2 border-fuchsia-500 pb-2">NEON SNAKE BEATS</h1>
      <div id="score-display" className="text-3xl text-fuchsia-500">SCORE: {score}</div>
      <SnakeGame setScore={(s: number) => setScore(s.length ? s.length - 1 : 0)} />
      <MusicPlayer />
    </div>
  );
}
