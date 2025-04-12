import DriverBadge from '@/components/icons/drivers/DriverBadge';

export default function RadioPlayerTitle({
  initial,
  driverNumber,
  height,
  teamColor,
  currentTrack,
  trackCount,
  showDot,
}) {
  return (
    <div className='flex items-center font-bold mb-4'>
      <DriverBadge
        initial={initial}
        driverNumber={driverNumber}
        height={height}
        teamColor={teamColor}
      />

      <span className='mx-2 text-lg'>{currentTrack}</span>

      <span className='mx-2 text-xs text-gray-600 relative'>
        {trackCount} Team Radio
        {showDot && (
          <span className='absolute -top-0.5 -right-2 w-1 h-1 bg-red-500 rounded-full animate-ping' />
        )}
      </span>
    </div>
  );
}
