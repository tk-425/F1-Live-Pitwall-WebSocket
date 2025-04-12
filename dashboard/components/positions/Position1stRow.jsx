import Image from 'next/image';
import DriverBadge from '../icons/drivers/DriverBadge';
import { drivers } from '@/info/Info_drivers';
import { teamIcons } from '@/public/assets/images/teamIcons/teamIcons';
import { teamIconFit } from '@/style/style';

export default function Position1stRow({ position, startIndex, index }) {
  return (
    <div className='flex items-center text-sm mx-2'>
      <div className='inline-block w-[3ch] text-right pr-1 font-bold italic'>
        {startIndex + index + 1}.
      </div>

      <Image
        src={teamIcons[drivers[position.driver_number].constructor]}
        width={30}
        height={30}
        className={`${teamIconFit} mx-4`}
        alt={`drivers[position.driver_number].constructor`}
      />

      <DriverBadge
        initial={drivers[position.driver_number]?.initial}
        driverNumber={position.driver_number}
        teamColor={drivers[position.driver_number]?.teamColor}
        height={36}
        className='ml-2'
      />
    </div>
  );
}
