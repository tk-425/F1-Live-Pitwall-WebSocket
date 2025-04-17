import { TireColorDataType } from '@/utils/tireDataType';
import Tire from '../icons/tires/Tire';
import { teal, white } from '@/style/style';
import { useWebSocketContext } from '@/context/WebSocketContext';

export default function Position2ndRow({ position }) {
  const { stints } = useWebSocketContext();

  const driverStints =
    stints.find((d) => d.driver_number === position.driver_number)?.stints ??
    [];

  const lastIndex = driverStints.length - 1;

  return (
    <div className='ml-12 my-2 flex flex-row items-center'>
      {/* <div>
        <span className='font-bold'>Pit:</span>
        <span className='ml-2'>
          {driverStints.length ? driverStints.length - 1 : '—'}
        </span>
      </div> */}

      <div className='flex flex-row'>
        <span className='font-bold'>Tire:</span>
        {driverStints.length > 0 ? (
          <span className='flex flex-row'>
            {driverStints.map((stint, index) => (
              <Tire
                className='ml-2'
                key={index}
                size={26}
                tireColor={
                  index === lastIndex
                    ? TireColorDataType[stint?.compound] ?? teal
                    : teal
                }
                textColor={index === lastIndex ? white : teal}
                tireType={stint?.compound ?? '?'}
              />
            ))}
          </span>
        ) : (
          <span className='ml-2'>—</span>
        )}
      </div>
    </div>
  );
}
