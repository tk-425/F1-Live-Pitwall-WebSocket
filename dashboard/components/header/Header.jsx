import { useWebSocketContext } from '@/context/WebSocketContext';
import { useMemo, useState } from 'react';
import { schedule_2025 } from '@/info/info_schedule2025';
import ServerAlert from './ServerAlert';
import { sessionDataType } from '@/utils/sessionDataType';
import SessionAlert from './SessionAlert';
import Image from 'next/image';
import { flagIconFit, teamIconFit } from '@/style/style';

export default function Header() {
  const { isServerDisconnected } = useWebSocketContext();
  const [showServerAlert, setShowServerAlert] = useState(true);
  // const [showSessionAlert, setShowSessionAlert] = useState(true);

  const nextRace = useMemo(() => {
    const now = new Date();
    return schedule_2025.find((race) => new Date(race.sessions.gp) >= now);
  });

  const currentSessionType = useMemo(() => {
    const now = new Date();

    const allSessions = schedule_2025.flatMap((race) =>
      Object.entries(race.sessions).map(([type, date]) => ({
        type,
        date: new Date(date),
        raceName: race.race_name,
      }))
    );

    const sorted = allSessions.sort((a, b) => a.date - b.date);

    // First: look for current session
    for (let session of sorted) {
      const bufferHours = session.type.toLowerCase() === 'gp' ? 5 : 2;
      const sessionEnd = new Date(
        session.date.getTime() + bufferHours * 60 * 60 * 1000
      );

      // Return the current session if the session is on going
      if (now >= session.date && now < sessionEnd) {
        return session;
      }
    }

    // Return the next session if the session is ended
    for (let session of sorted) {
      if (now < session.date) {
        return session;
      }
    }

    return null;
  }, []);

  return (
    <>
      <header className='mt-6'>
        <div className='flex justify-center items-center text-4xl font-bold mb-4'>
          <div className='mr-2 italic font-mono text-red-600'>F1</div>
          <div className=''>Live Updater</div>
        </div>
        <div className='flex flex-row items-center text-center font-bold text-xl'>
          {nextRace && (
            <>
              <Image
                src={nextRace.flag}
                width={70}
                height={70}
                className={`${flagIconFit}`}
                alt='Race Flag'
              />
              <span className='mx-2'>
                {new Date(nextRace.sessions.gp).getUTCFullYear()}
              </span>
              <span>{nextRace.race_name}</span>
            </>
          )}
        </div>
      </header>

      {/* Show Alert */}
      {isServerDisconnected && showServerAlert && (
        <ServerAlert setAlert={setShowServerAlert} />
      )}

      {currentSessionType && (
        <SessionAlert
          session={sessionDataType[currentSessionType.type]}
          sessionDate={currentSessionType.date}
        />
      )}
    </>
  );
}
