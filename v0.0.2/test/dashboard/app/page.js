'use client';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Home() {
  const { intervals, positions } = useWebSocket('ws://localhost:3001');

  console.log('🧪 intervals:', intervals);
  console.log('🧪 positions:', positions);

  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Live F1 Data</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold'>Grouped Intervals</h2>
        {intervals.length === 0 ? (
          <p>No data</p>
        ) : (
          intervals.map((group, i) => (
            <div
              key={i}
              className='mt-2 border p-2 rounded'
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
          <p>No data</p>
        ) : (
          <ol className='list-decimal list-inside mt-2'>
            {positions.map((driver, index) => (
              <li key={driver.driver_number}>
                Position {driver.position}: Driver #{driver.driver_number}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
