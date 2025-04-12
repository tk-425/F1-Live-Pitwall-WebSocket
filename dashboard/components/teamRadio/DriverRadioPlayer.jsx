import { drivers } from '@/info/Info_drivers';
import { useEffect, useRef, useState } from 'react';
import RadioPlayerTitle from './RadioPlayerTitle';
import RadioPlayerButtons from './RadioPlayerButtons';

export default function DriverRadioPlayer({ driverNumber, radios }) {
  const tracks = [...radios]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((radio) => ({
      title: new Date(radio.date).toISOString().slice(11, 19),
      src: radio.recording_url,
    }));

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, [currentTrackIndex]);

  const trackCount = tracks.length;
  const [lastTrackCount, setLastTrackCount] = useState(trackCount);
  const [showDot, setShowDot] = useState(false);

  // Show flashing dot when track count increases
  useEffect(() => {
    if (trackCount > lastTrackCount) {
      setShowDot(true);
      const timeout = setTimeout(() => setShowDot(false), 3000);
      setLastTrackCount(trackCount);
      return () => clearTimeout(timeout);
    }
  }, [trackCount, lastTrackCount]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
    }, 0);
  };

  const stopPlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const currentTrack = tracks[currentTrackIndex] ?? null;

  if (!currentTrack) return null;

  return (
    <div className='my-4 p-4 border rounded w-xl shadow-sm'>
      <div className='flex justify-between'>
        <RadioPlayerTitle
          initial={drivers[driverNumber].initial}
          driverNumber={driverNumber}
          height={36}
          teamColor={drivers[driverNumber].teamColor}
          currentTrack={currentTrack.title}
          trackCount={trackCount}
          showDot={showDot}
        />
        <RadioPlayerButtons
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          stopPlayback={stopPlayback}
          setShowPlaylist={setShowPlaylist}
          showPlaylist={showPlaylist}
        />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={handleEnded}
      />

      <input
        type='range'
        min={0}
        max={duration}
        value={progress}
        step='0.1'
        onChange={handleSeek}
        className='w-full'
      />

      {showPlaylist && (
        <div className='max-h-40 overflow-y-auto border rounded p-2 mt-2'>
          <ul className='space-y-2'>
            {tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => playTrack(index)}
                className={`p-2 border rounded cursor-pointer text-sm ${
                  index === currentTrackIndex ? 'bg-gray-200 font-medium text-black' : ''
                }`}
              >
                {track.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
