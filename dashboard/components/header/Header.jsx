import { useWebSocketContext } from '@/context/WebSocketContext';
import { useMemo, useState } from 'react';
import ServerAlert from './ServerAlert';
import { sessionDataType } from '@/utils/sessionDataType';
import SessionAlert from './SessionAlert';
import Image from 'next/image';
import { flagIconFit } from '@/style/style';
import { getCurrentSession, getNextSession } from '@/utils/sessionUtils';

export default function Header() {
  const { isServerDisconnected } = useWebSocketContext();
  const [showServerAlert, setShowServerAlert] = useState(true);

  const nextSession = useMemo(() => getNextSession(), []);

  const currentSession = useMemo(() => getCurrentSession(), []);

  const sessionToDisplay = currentSession ?? nextSession;

  return (
    <>
      <header className='mt-6'>
        <div className='flex justify-center items-center text-4xl font-bold mb-4'>
          <div className='mr-2 italic font-mono text-red-600'>F1</div>
          <div className=''>Live Pitwall</div>
        </div>
        <div className='flex flex-row items-center text-center font-bold text-xl'>
          {sessionToDisplay && (
            <>
              <Image
                src={sessionToDisplay.flag}
                width={70}
                height={70}
                className={`${flagIconFit}`}
                alt='Race Flag'
              />
              <span className='mx-2'>
                {sessionToDisplay.date.getUTCFullYear()}
              </span>
              <span>{sessionToDisplay.raceName}</span>
            </>
          )}
        </div>
      </header>

      {/* Show Alert */}
      {isServerDisconnected && showServerAlert && (
        <ServerAlert setAlert={setShowServerAlert} />
      )}

      {sessionToDisplay && (
        <SessionAlert
          session={sessionDataType[sessionToDisplay.type]}
          sessionDate={sessionToDisplay.date}
          sessionType={sessionToDisplay.type}
        />
      )}
    </>
  );
}
