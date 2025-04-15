import { ActiveViewType } from '@/utils/activeViewType';

export default function Menu({ activeView, setActiveView }) {
  const intervals = ActiveViewType.INTERVALS;
  const positions = ActiveViewType.POSITIONS;
  const teamRadio = ActiveViewType.TEAM_RADIO;

  return (
    <div className='flex mt-6 mb-2 text-lg'>
      {Object.entries(ActiveViewType).map(([key, label]) => (
        <button
          className={`px-4 cursor-pointer ${
            activeView === label
              ? 'underline underline-offset-8 text-blue-500 font-bold'
              : 'font-bold'
          }`}
          key={key}
          onClick={() => setActiveView(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
