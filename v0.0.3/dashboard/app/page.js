'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { drivers } from '@/info/Info_drivers';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const { intervals, positions, session } = useWebSocket();
  const [currentSession, setCurrentSession] = useState(null);
  let isRaceEnded = false;

  if (currentSession !== session) {
    setCurrentSession(session);
    isRaceEnded = false;
  } else {
    isRaceEnded = true;
  }

  const raceName =
    currentSession?.country_name +
    ' ' +
    currentSession?.location +
    ' ' +
    currentSession?.session_name;

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Live F1 Dashboard</h1>

      <div className='flex'>
        <h2 className='text-xl mb-6'>
          <span>{isRaceEnded ? 'No Race' : raceName}</span>
        </h2>
      </div>

      <div className='flex flex-row justify-center'>
        {/* Grouped Intervals */}
        <section className='mb-6 flex-1'>
          <h2 className='text-xl font-semibold pb-2'>Grouped Intervals</h2>
          {intervals.length === 0 ? (
            <p className='text-gray-500'>No data</p>
          ) : (
            intervals.map((group, i) => (
              <div
                key={i}
                className='mt-2 border p-2 rounded'
              >
                <h3 className='font-medium'>Group {i + 1}</h3>
                <ul className='ml-4 list-disc'>
                  {group.map((driver) => {
                    const info = drivers[driver.driver_number] || {};
                    const initial = info?.initial ?? '???'; // ✅ This line fixes it

                    return (
                      <li
                        key={driver.driver_number}
                        className='flex items-center gap-2 font-mono'
                      >
                        <span>
                          Pos {String(driver.position).padStart(2, '0')} --
                        </span>

                        {/* Icon + Initial + Number */}
                        <span className='flex items-center gap-1'>
                          {info.numberIcon && (
                            <Image
                              src={info.teamLogo}
                              alt={`${initial} icon`}
                              width={20}
                              height={20}
                              className='object-contain'
                            />
                          )}
                          {initial} #
                          {String(driver.driver_number).padStart(2, '0')}
                        </span>

                        <span>
                          -- Interval:{' '}
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
        <section className='flex-1'>
          <h2 className='text-xl font-semibold mb-2'>Positions</h2>
          <ul className='space-y-1'>
            {positions.length === 0 ? (
              <p className='text-gray-500'>No data</p>
            ) : (
              positions.map((driver) => {
                const info = drivers[driver.driver_number] || {};
                const initial = info?.initial ?? '???';
                const gap = driver.gap_to_leader;

                const isLeader =
                  (gap === 0 || gap === null) && driver.interval === 0;
                const isLapped =
                  typeof gap === 'string' && gap.toUpperCase().includes('LAP');

                return (
                  <li
                    key={driver.driver_number}
                    className='flex items-center gap-2 font-mono'
                  >
                    <span>
                      Pos {String(driver.position).padStart(2, '0')} --
                    </span>

                    {/* Driver icon + initial + number */}
                    <span className='flex items-center gap-1'>
                      {info.numberIcon && (
                        <Image
                          src={info.teamLogo}
                          alt={`${initial} icon`}
                          width={20}
                          height={20}
                          className='object-contain'
                        />
                      )}
                      {initial} #{String(driver.driver_number).padStart(2, '0')}
                    </span>

                    {/* Gap to Leader */}
                    <span>
                      -- Gap to Leader:{' '}
                      {isLeader ? (
                        'LEADER'
                      ) : isLapped ? (
                        gap
                      ) : (
                        <time suppressHydrationWarning>
                          {!isNaN(Number(gap)) ? Number(gap).toFixed(3) : gap}
                        </time>
                      )}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
