import { white } from '@/style/style';

export default function HidePlaylistIcon({
  size = 24,
  color = white,
  slashColor = 'red',
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line
        x1='3'
        y1='6'
        x2='21'
        y2='6'
      />
      <line
        x1='3'
        y1='12'
        x2='21'
        y2='12'
      />
      <line
        x1='3'
        y1='18'
        x2='14'
        y2='18'
      />
      <line
        x1='4'
        y1='4'
        x2='20'
        y2='20'
        stroke={slashColor}
      />
    </svg>
  );
}
