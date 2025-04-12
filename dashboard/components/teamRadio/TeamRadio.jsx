import Image from 'next/image';
import { useWebSocketContext } from '@/context/WebSocketContext';
import DriverRadioPlayer from '../radio/DriverRadioPlayer';
import { combineTeamRadiosByConstructor } from '@/utils/flattenRadioTracks';
import { teamIcons } from '@/public/assets/images/teamIcons/teamIcons';
import { teamIconFit } from '@/style/style';
import Unavailable from '../content/Unavailable';
import { ActiveViewType } from '@/utils/activeViewType';

export default function TeamRadioPlayer() {
  const { teamRadio } = useWebSocketContext();
  const teamRadioByConstructor = combineTeamRadiosByConstructor(teamRadio);

  if (!Array.isArray(teamRadio) || teamRadio.length === 0) {
    return <Unavailable message={ActiveViewType.TEAM_RADIO} />;
  }

  return (
    <div className='mt-6'>
      {Object.keys(teamRadioByConstructor).map((constructor) => (
        <div key={constructor}>
          <div className='flex text-lg font-bold'>
            <Image
              src={teamIcons[constructor]}
              width={20}
              height={20}
              className={teamIconFit}
              alt={`${constructor} logo`}
            />
            <span>{constructor}</span>
          </div>
          <div>
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
