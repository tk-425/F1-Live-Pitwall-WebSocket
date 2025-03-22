'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { drivers } from '@/info/Info_drivers';

export default function Home() {
  const { intervals, positions } = useWebSocket();

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Live F1 Dashboard</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold'>Grouped Intervals</h2>
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
                  const initial = info?.initial ?? '???';

                  return (
                    <li
                      key={driver.driver_number}
                      className='font-mono list-none'
                    >
                      Pos {String(driver.position).padStart(2, '0')} --{' '}
                      {initial} #{String(driver.driver_number).padStart(2, '0')}{' '}
                      -- Interval:{' '}
                      {driver.gap_to_leader === 0
                        ? 'LEADER'
                        : driver.interval ?? 'N/A'}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>

      <section>
        <h2 className='text-xl font-semibold'>Positions</h2>
        {positions.length === 0 ? (
          <p className='text-gray-500'>No data</p>
        ) : (
          <ol className='mt-2'>
            {positions.map((driver) => {
              const info = drivers[driver.driver_number] || {};
              return (
                <li
                  key={driver.driver_number}
                  className='font-mono list-none'
                >
                  Pos {String(driver.position).padStart(2, '0')} --{' '}
                  {info.initial ?? '???'} # #
                  {String(driver.driver_number).padStart(2, '0')}
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </main>
  );
}
