import { useWebSocketContext } from '@/context/WebSocketContext';
import { drivers } from '@/info/Info_drivers';
import DriverBadge from '@/components/icons/drivers/DriverBadge';
import Unavailable from '../content/Unavailable';
import { ActiveViewType } from '@/utils/activeViewType';

export default function Intervals() {
  const { intervals } = useWebSocketContext();

  if (!Array.isArray(intervals) || intervals.length === 0) {
    return <Unavailable message={ActiveViewType.INTERVALS} />;
  }

  return (
    <div className='mt-6'>
      {intervals.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className='border p-2 rounded shadow-md my-2'
        >
          <div className='font-semibold m-2'>Group {groupIndex + 1}</div>
          <div className='space-y-4 mb-2'>
            {group.map((driver, index) => (
              <div
                key={index}
                className='flex items-center text-sm font-mono mx-6'
              >
                {/* Position */}
                <span className='inline-block w-6 text-right pr-1 font-bold italic'>
                  {driver.position}.
                </span>

                {/* Driver Badge */}
                <DriverBadge
                  className='mx-2'
                  initial={driver.initial}
                  driverNumber={driver.driver_number}
                  teamColor={drivers[driver.driver_number].teamColor}
                  height={28}
                />

                {/* Interval */}
                <span className='ml-4 mr-2 font-bold'>Interval:</span>

                <span className='mr-2 w-[5ch] text-right inline-block'>
                  {driver.interval === null && driver.gap_to_leader === 0
                    ? 'Leader'
                    : typeof driver.interval === 'number'
                    ? driver.interval.toFixed(3)
                    : 'N/A'}
                </span>

                {/* Gap */}
                <span className='ml-4 mr-2 font-bold'>Gap:</span>

                <span className='w-[6ch] text-right inline-block'>
                  {driver.gap_to_leader === null || driver.gap_to_leader === 0
                    ? 'Leader'
                    : driver.gap_to_leader.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
