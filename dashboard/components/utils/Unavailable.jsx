import { schedule_2025 } from '@/info/info_schedule2025';
import { getNextSession } from '@/utils/sessionUtils';
import { useEffect, useMemo, useState } from 'react';

export default function Unavailable({ message }) {
  const [countDown, setCountDown] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);

  const nextSession = useMemo(() => getNextSession(schedule_2025), []);

  useEffect(() => {
    if (!nextSession) return;

    // Calculates the time difference between now and the next session start time
    const updateCountdown = () => {
      const now = new Date();
      const diff = nextSession.date - now;

      // If the session has already started,
      // display the unavailable message.
      if (diff <= 0) {
        setSessionStarted(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountDown(
        `D-${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`
      );
    };

    // Before starting the interval,
    // we call it once so the user sees the countdown right away
    updateCountdown();

    // Start an interval that updates the countdown every 1 second
    const timer = setInterval(updateCountdown, 1000);

    // Clear the interval when the component unmount or `nextSession` changes.
    return () => clearInterval(timer);
  }, [nextSession]);

  return (
    <div className='text-center text-m text-gray-400 mt-6 mb-4 py-20'>
      🚫 No {message} Available
      {nextSession && (
        <div className='my-3 text-gray-400 text-sm leading-relaxed'>
          <div className='my-4 text-base'>{countDown}</div>
          <div className='my-2 text-xs'>
            Scheduled at: {nextSession.date.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
