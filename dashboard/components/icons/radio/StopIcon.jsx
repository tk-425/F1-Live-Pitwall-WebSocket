import { teamIconFit } from '@/style/style';

export default function StopIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <rect
        x='6'
        y='6'
        width='12'
        height='12'
        rx='2'
      />
    </svg>
  );
}
