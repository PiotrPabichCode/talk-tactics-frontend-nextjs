import { PauseIcon, PlayIcon } from 'lucide-react';
import { useState } from 'react';

export function AudioPlayer({ url }: { url: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audio?.pause();
    } else {
      const newAudio = new Audio(url);
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      setAudio(newAudio);
      newAudio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return isPlaying ? (
    <PauseIcon
      className='w-4 h-4 fill-blue-500 cursor-pointer'
      onClick={togglePlay}
    />
  ) : (
    <PlayIcon
      className='w-4 h-4 fill-blue-500 cursor-pointer'
      onClick={togglePlay}
    />
  );
}
