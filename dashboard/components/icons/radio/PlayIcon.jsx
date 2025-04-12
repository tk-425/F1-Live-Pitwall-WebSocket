export default function PlayIcon({ size = 24, color = 'currentColor' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={color}
      viewBox='0 0 24 24'
    >
      <polygon points='8,5 19,12 8,19' />
    </svg>
  );
}
