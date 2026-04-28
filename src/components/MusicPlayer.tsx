import {useState, useRef, useEffect} from 'react';
import {Play, Pause, SkipForward} from 'lucide-react';

const TRACKS = [
  {id: 1, title: 'Neon Nights', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
  {id: 2, title: 'Cyber Pulse', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},
  {id: 3, title: 'Digital Dream', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'},
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
  }, [currentTrackIndex, isPlaying]);

  return (
    <div id="music-player-container" className="bg-black border-2 border-cyan-400 p-6 rounded-none text-cyan-400 w-full max-w-sm shadow-[0_0_20px_rgba(34,211,238,0.3)]">
      <h3 id="track-title" className="text-xl font-bold mb-4 border-b-2 border-fuchsia-500 pb-2">{TRACKS[currentTrackIndex].title.toUpperCase()}</h3>
      <audio ref={audioRef} src={TRACKS[currentTrackIndex].url} />
      <div className="flex justify-center gap-6 mt-4">
        <button id="play-pause-btn" onClick={togglePlay} className="p-3 border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black transition-colors">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button id="skip-btn" onClick={nextTrack} className="p-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}
