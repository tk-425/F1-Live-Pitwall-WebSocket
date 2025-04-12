import { useWebSocketContext } from '@/context/WebSocketContext';
import { useMemo, useState } from 'react';
import { schedule_2025 } from '@/info/info_schedule2025';
import ServerAlert from './ServerAlert';
import { sessionDataType } from '@/utils/sessionDataType';
import SessionAlert from './SessionAlert';

export default function Header() {
  const { isServerDisconnected } = useWebSocketContext();
  const [showServerAlert, setShowServerAlert] = useState(true);
  const [showSessionAlert, setShowSessionAlert] = useState(true);

  const nextRace = useMemo(() => {
    const now = new Date();
    return schedule_2025.find((race) => new Date(race.sessions.gp) >= now);
  });

  const nextSessionType = useMemo(() => {
    const now = new Date();

    const allSessions = schedule_2025.flatMap((race) =>
      Object.entries(race.sessions).map(([type, date]) => ({
        type,
        date: new Date(date),
      }))
    );

    const upcoming = allSessions
      .filter((session) => session.date >= now)
      .sort((a, b) => a.date - b.date);

    return upcoming[0]?.type ?? null;
  }, []);

  const currentSessionType = useMemo(() => {
    const now = new Date();

    // Flatten all sessions across races
    const allSessions = schedule_2025.flatMap((race) =>
      Object.entries(race.sessions).map(([type, date]) => ({
        type,
        date: new Date(date),
        raceName: race.race_name,
      }))
    );

    // Step 2: Sort all sessions globally
    const sorted = allSessions.sort((a, b) => a.date - b.date);

    // Step 3: Find current session window: session.date <= now < next.date
    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];
      const next = sorted[i + 1];

      const isInWindow = now >= current.date && (!next || now < next.date);

      if (isInWindow) {
        return current.type;
      }
    }

    return null;
  }, []);

  return (
    <>
      <header className='mt-6'>
        <div className='flex justify-center items-center text-3xl font-bold mb-4'>
          <div className='mr-2 italic font-mono text-red-600'>F1</div>
          <div className=''>Live Updater</div>
        </div>
        <div className='text-center font-bold text-md'>
          {nextRace && (
            <>
              {new Date(nextRace.sessions.gp).getUTCFullYear()}{' '}
              {nextRace.race_name}
            </>
          )}
        </div>
      </header>

      {/* Show Alert */}
      {isServerDisconnected && showServerAlert && (
        <ServerAlert setAlert={setShowServerAlert} />
      )}

      {currentSessionType && showSessionAlert && (
        <SessionAlert
          setAlert={setShowSessionAlert}
          session={sessionDataType[currentSessionType]}
        />
      )}
    </>
  );
}
