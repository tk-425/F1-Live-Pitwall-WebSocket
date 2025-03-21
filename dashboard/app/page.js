'use client';
import { useWebSocket } from '@/hooks/useWebSocket';
import { drivers } from '@/info/Info_drivers';

export default function Home() {
  const { intervals, positions } = useWebSocket('ws://localhost:3000');

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Live F1 Data</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold'>Grouped Intervals</h2>
        {intervals.length === 0 ? (
          <p className='text-gray-500'>No data</p>
        ) : (
          intervals.map((group, i) => (
            <div
              key={i}
              className='mt-2 border p-2 rounded bg-gray-50'
            >
              <h3 className='font-medium'>Group {i + 1}</h3>
              <ul className='ml-4 list-disc'>
                {group.map((driver) => (
                  <li key={driver.driver_number}>
                    #{driver.driver_number} — Interval:{' '}
                    {driver.interval ?? 'LEADER'}
                  </li>
                ))}
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
          <ol className='list-none mt-2'>
            {positions.map((driver, index) => {
              const info = drivers[driver.driver_number];
              const initial = info?.initial ?? '???';

              return (
                <li key={driver.driver_number}>
                  Pos {driver.position} -- {initial} #{driver.driver_number}
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </main>
  );
}
