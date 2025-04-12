import { drivers } from '@/info/Info_drivers';

const combineTeamRadios = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {};
  }

  const combined = {};

  data.forEach((entry) => {
    const driverNumber = entry.driver_number;
    combined[driverNumber] = {
      ...entry,
      ...drivers[driverNumber],
    };
  });

  return combined;
};

export const combineTeamRadiosByConstructor = (data) => {
  if (!data || Object.keys(data).length === 0) {
    return {};
  }

  const groupedByConstructor = {};
  const teamRadios = combineTeamRadios(data);

  for (let driverNumber in teamRadios) {
    const driver = teamRadios[driverNumber];
    const constructor = driver.constructor;

    if (!groupedByConstructor[constructor]) {
      groupedByConstructor[constructor] = {};
    }

    groupedByConstructor[constructor][driverNumber] = driver;
  }

  return groupedByConstructor;
};
