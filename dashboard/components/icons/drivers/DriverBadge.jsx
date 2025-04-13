import { black, teal } from '@/style/style';

export default function DriverBadge({
  initial = 'N/A',
  driverNumber = '00',
  teamColor = teal,
  height = 40,
  fontRatio = 0.5,
  className,
}) {
  driverNumber = driverNumber.toString().padStart(2, '0');
  const label = `${driverNumber} ${initial}`;

  const fontSize = height * fontRatio;
  const charWidthApprox = fontSize * 0.55;
  const textWidth = label.length * charWidthApprox;
  const padding = 30;
  const width = textWidth + padding;
  const borderRadius = 6;

  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x='0'
        y='0'
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        fill={teamColor}
      />
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize={fontSize}
        fontWeight='bold'
        fill={black}
      >
        {label}
      </text>
    </svg>
  );
}

