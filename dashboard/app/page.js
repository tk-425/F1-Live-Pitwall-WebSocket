'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { drivers } from '@/info/Info_drivers';
import Image from 'next/image';

export default function Home() {
  const { intervals, positions, session, stints } = useWebSocket();

  const isRaceEnded = session?.date_end
    ? new Date(session.date_end) < new Date()
    : true;

  const raceName = `${session.country_name} ${session.location} ${session.session_name}`;

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Live F1 Dashboard</h1>

      <div className='flex'>
        <h2 className='text-xl mb-6'>
          <span>{isRaceEnded ? 'No Race' : raceName}</span>
        </h2>
      </div>

      <div className='flex flex-row justify-center gap-4'>
        {/* Grouped Intervals */}
        <section className='w-1/3'>
          <h2 className='text-xl font-semibold pb-2'>Grouped Intervals</h2>
          {intervals.length === 0 ? (
            <p className='text-gray-500'>No data</p>
          ) : (
            intervals.map((group, i) => (
              <div
                key={i}
                className='mt-2 border p-2 mx-4 my-6 rounded'
              >
                <h3 className='font-medium'>
                  <b>Group {i + 1}</b>
                </h3>
                <ul className='ml-4 list-disc'>
                  {group.map((driver) => {
                    const info = drivers[driver.driver_number] || {};
                    const initial = info?.initial ?? '???';

                    return (
                      <li
                        key={driver.driver_number}
                        className='flex items-center gap-2 font-mono py-1'
                      >
                        <span>
                          <b>P {String(driver.position).padStart(2, '0')}</b>
                        </span>

                        {/* Icon + Initial + Number */}
                        <span className='flex items-center gap-1'>
                          {info.numberIcon && (
                            <Image
                              src={info.teamLogo}
                              alt={`${initial} icon`}
                              width={20}
                              height={20}
                              className='object-contain mr-2'
                            />
                          )}
                          {initial} #
                          {String(driver.driver_number).padStart(2, '0')}
                        </span>

                        <span>
                          -- <b>Interval:</b>{' '}
                          {driver.gap_to_leader === 0
                            ? 'LEADER'
                            : driver.interval?.toFixed(3) ?? 'N/A'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </section>

        {/* Positions */}
        <div className='w-2/3 grid grid-cols-2 gap-4'>
          {/* Left column: P01 to P10 */}
          <ul className='space-y-1'>
            {positions
              .slice(0, 10)
              .map((driver) => renderDriver(driver, stints))}
          </ul>

          {/* Right column: P11 to P20 */}
          <ul className='space-y-1'>
            {positions.slice(10).map((driver) => renderDriver(driver, stints))}
          </ul>
        </div>
      </div>
    </main>
  );
}

function getCompoundColorClass(letter) {
  switch (letter?.toUpperCase()) {
    case 'H':
      return 'text-white';
    case 'M':
      return 'text-yellow-400';
    case 'S':
      return 'text-red-500';
    default:
      return '';
  }
}

function renderDriver(driver, stints) {
  const info = drivers[driver.driver_number] || {};
  const initial = info?.initial ?? '???';
  const gap = driver.gap_to_leader;
  const isLeader = (gap === 0 || gap === null) && driver.interval === 0;
  const isLapped = typeof gap === 'string' && gap.toUpperCase().includes('LAP');

  // Find the stint that's corresponding to the driver number
  const driverStints = stints?.find(
    (s) => s.driver_number === driver.driver_number
  );

  // Get the total number of pits
  const currentStintNumber = Array.isArray(driverStints?.stints)
    ? driverStints.stints.at(-1).stint_number - 1
    : 'N/A';

  return (
    <li
      key={driver.driver_number}
      className='font-mono mx-4 my-4 border-b pb-2'
    >
      {/* First line: Position + Profile + Gap */}
      <div className='flex items-center justify-between flex-wrap'>
        <div className='flex items-center gap-2'>
          <span>
            <b>P {String(driver.position).padStart(2, '0')}</b>
          </span>
          <div className='flex items-center gap-1'>
            {info.numberIcon && (
              <Image
                src={info.teamLogo}
                alt={`${initial} icon`}
                width={20}
                height={20}
                className='object-contain mr-2'
              />
            )}
            {initial} #{String(driver.driver_number).padStart(2, '0')}
          </div>
        </div>

        <div className='ml-10'>
          <b>Gap to Leader:</b>{' '}
          {isLeader ? (
            'LEADER'
          ) : isLapped ? (
            gap
          ) : (
            <time suppressHydrationWarning>
              {!isNaN(Number(gap)) ? Number(gap).toFixed(3) : gap}
            </time>
          )}
        </div>
      </div>

      {/* Second line: Image + Pit Info */}
      <div className='flex items-center justify-between mt-1'>
        <div className='flex items-center'>
          {info.headshot && (
            <Image
              src={info.headshot}
              alt={`${initial} photo`}
              width={45}
              height={45}
              className='rounded object-contain'
            />
          )}
        </div>

        {/* <div className='font-light'>Interval: {driver.interval}</div> */}

        <div className='flex justify-between'>
          <span className='pr-2'>
            <b>Pit:</b> {currentStintNumber}{' '}
          </span>
          <span className='pl-2 flex items-center gap-1'>
            <b>Tire:</b>
            {Array.isArray(driverStints?.stints)
              ? driverStints.stints.map((s, idx, arr) => {
                  const compoundLetter =
                    s.compound?.charAt(0).toUpperCase() ?? '?';
                  const isLast = idx === arr.length - 1;
                  return (
                    <span
                      key={idx}
                      className={
                        isLast
                          ? `${getCompoundColorClass(
                              compoundLetter
                            )} font-bold underline`
                          : 'text-gray-500'
                      }
                    >
                      {compoundLetter}
                    </span>
                  );
                })
              : 'N/A'}
          </span>
        </div>
      </div>
    </li>
  );
}
