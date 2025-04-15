import Image from 'next/image';
import { useWebSocketContext } from '@/context/WebSocketContext';
import DriverRadioPlayer from './DriverRadioPlayer';
import { combineTeamRadiosByConstructor } from '@/utils/flattenRadioTracks';
import { constructorIcons } from '@/info/utils/constructorIcons';
import { teamIconFit } from '@/style/style';
import Unavailable from '../utils/Unavailable';
import { ActiveViewType } from '@/utils/activeViewType';

export default function TeamRadioPlayer() {
  const { teamRadio } = useWebSocketContext();
  const teamRadioByConstructor = combineTeamRadiosByConstructor(teamRadio);

  if (!Array.isArray(teamRadio) || teamRadio.length === 0) {
    return <Unavailable message={ActiveViewType.TEAM_RADIO} />;
  }

  return (
    <div className='mt-6 mb-4'>
      {Object.keys(teamRadioByConstructor).map((constructor) => (
        <div key={constructor}>
          <div className='flex text-lg items-center font-bold'>
            <Image
              src={constructorIcons[constructor]}
              width={26}
              height={26}
              className={teamIconFit}
              alt={`${constructor} || 'constructor-logo`}
            />
            <span>{constructor}</span>
          </div>
          <div className='mb-3'>
            {Object.values(teamRadioByConstructor[constructor]).map(
              (driver) => (
                <DriverRadioPlayer
                  key={driver.driver_number}
                  driverNumber={driver.driver_number}
                  radios={driver.radios}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
