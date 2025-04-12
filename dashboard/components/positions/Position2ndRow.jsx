import { TireDataType } from '@/utils/tireDataType';
import Tire from '../icons/tires/Tire';
import { darkGray, white } from '@/style/style';

export default function Position2ndRow({ stints, position }) {
  const driverStints =
    stints.find((d) => d.driver_number === position.driver_number)?.stints ??
    [];

  const lastStint = driverStints[driverStints.length - 1];

  return (
    <div className='ml-12 my-2'>
      <div className='flex flex-row items-center'>
        <span className='font-bold'>Pit:</span>
        <span className='ml-2'>
          {driverStints.length ? driverStints.length - 1 : '—'}
        </span>

        <span className='ml-4 font-bold'>Compound:</span>
        {lastStint ? (
          <Tire
            className='ml-2'
            size={26}
            tireColor={TireDataType[lastStint?.compound] ?? darkGray}
            textColor={white}
            tireType={lastStint.compound?.charAt(0)}
          />
        ) : (
          <span className='ml-2'>—</span>
        )}
      </div>
    </div>
  );
}
