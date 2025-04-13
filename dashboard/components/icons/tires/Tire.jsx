import { getTireInitial } from '@/utils/tireDataType';

export default function Tire({
  className,
  size,
  tireColor,
  textColor,
  tireType,
}) {
  const center = size / 2;
  const radius = size * 0.4;
  const strokeWidth = size * 0.1;
  const fontSize = size * 0.62;
  const circumference = 2 * Math.PI * radius;
  const gap = circumference * 0.05;
  const visible = (circumference - gap * 2) / 2;

  tireType = getTireInitial(tireType);

  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={tireColor}
        strokeWidth={strokeWidth}
        fill='none'
        strokeDasharray={`${visible} ${gap} ${visible} ${gap}`}
        transform={`rotate(99 ${center} ${center})`}
      />
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize={fontSize}
        fontWeight='bold'
        fill={textColor}
      >
        {tireType}
      </text>
    </svg>
  );
}
