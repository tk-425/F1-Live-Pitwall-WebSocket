import { white } from '@/style/style';

export default function PauseIcon({ size = 24, color = white }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <g>
        <rect
          x='6'
          y='5'
          width='4'
          height='14'
        />
        <rect
          x='14'
          y='5'
          width='4'
          height='14'
        />
      </g>
    </svg>
  );
}
