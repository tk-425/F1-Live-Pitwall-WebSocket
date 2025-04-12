import HidePlaylistIcon from '@/components/icons/radio/HidePlaylistIcon';
import PauseIcon from '@/components/icons/radio/PauseIcon';
import PlayIcon from '@/components/icons/radio/PlayIcon';
import ShowPlaylistIcon from '@/components/icons/radio/ShowPlaylistIcon';
import StopIcon from '@/components/icons/radio/StopIcon';

export default function RadioPlayerButtons({
  togglePlay,
  isPlaying,
  stopPlayback,
  setShowPlaylist,
  showPlaylist,
}) {
  return (
    <div className='flex justify-between gap-4 mb-4'>
      <button
        onClick={togglePlay}
        className='px-4 py-2 border rounded'
      >
        {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
      </button>

      <button
        onClick={stopPlayback}
        className='px-3 py-1 border rounded'
      >
        <StopIcon size={20} />
      </button>

      <button
        onClick={() => setShowPlaylist(!showPlaylist)}
        className='px-4 py-2 border rounded'
      >
        {showPlaylist ? <HidePlaylistIcon /> : <ShowPlaylistIcon />}
      </button>
    </div>
  );
}
