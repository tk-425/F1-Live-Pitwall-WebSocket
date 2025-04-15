import { useWebSocketContext } from '@/context/WebSocketContext';
import { drivers } from '@/info/Info_drivers';
import DriverBadge from '@/components/icons/drivers/DriverBadge';
import Unavailable from '../utils/Unavailable';
import { ActiveViewType } from '@/utils/activeViewType';
import { constructorIcons } from '@/info/utils/constructorIcons';
import { teamIconFit } from '@/style/style';
import Image from 'next/image';
import { formatGap, formatInterval } from '../../utils/util_interval';

export default function Intervals() {
  const { intervals } = useWebSocketContext();

  if (!Array.isArray(intervals) || intervals.length === 0) {
    return <Unavailable message={ActiveViewType.INTERVALS} />;
  }

  return (
    <div className='mt-6 mb-4'>
      {intervals.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className='mb-6'
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

                <Image
                  src={
                    constructorIcons[drivers[driver.driver_number].constructor]
                  }
                  width={26}
                  height={26}
                  className={`${teamIconFit} mx-4`}
                  alt={`drivers[driver.driver_number].constructor || 'constructor-logo`}
                />

                {/* Driver Badge */}
                <DriverBadge
                  className='mx-2'
                  initial={driver.initial}
                  driverNumber={driver.driver_number}
                  teamColor={drivers[driver.driver_number].teamColor}
                  height={32}
                />

                {/* Interval */}
                <span className='ml-4 mr-2 font-bold'>Interval:</span>

                <span className='mr-2 w-[5ch] text-right inline-block'>
                  {formatInterval(driver.interval, driver.gap_to_leader)}
                </span>

                {/* Gap */}
                <span className='ml-4 mr-2 font-bold'>Gap:</span>

                <span className='w-[6ch] text-right inline-block'>
                  {formatGap(driver.gap_to_leader)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
