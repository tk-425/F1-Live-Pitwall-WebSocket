import { blue, darkGray, green, red, white, yellow } from '@/style/style';

export const TireColorDataType = {
  HARD: white,
  MEDIUM: yellow,
  SOFT: red,
  INTERMEDIATE: green,
  WET: blue,
  UNKNOWN: darkGray,
};

export const TireDataType = {
  HARD: 'H',
  MEDIUM: 'M',
  SOFT: 'S',
  INTERMEDIATE: 'I',
  WET: 'W',
  UNKNOWN: '-',
};

export function getTireInitial(tireType) {
  if (!tireType || !TireDataType[tireType]) {
    return TireDataType.UNKNOWN;
  }

  return TireDataType[tireType];
}
