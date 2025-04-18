import { countryFlags } from './info_countryFlags.mjs';
import { constructors } from './info_constructors.mjs';
import { currentYear } from '../utils/currentYear.mjs';

export const drivers = {
  // Alpine
  10: {
    initial: 'GAS',
    flag: countryFlags.FRA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/gasly`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/PIEGAS01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/gasly`,
    teamLogo: constructors.Alpine.icon,
    constructor: constructors.Alpine.name,
  },
  7: {
    initial: 'DOO',
    flag: countryFlags.AUS,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/doohan`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/JACDOO01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/doohan`,
    teamLogo: constructors.Alpine.icon,
    constructor: constructors.Alpine.name,
  },

  // Aston Martin
  18: {
    initial: 'STR',
    flag: countryFlags.CAN,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/stroll`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LANSTR01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/stroll`,
    teamLogo: constructors.AstonMartin.icon,
    constructor: constructors.AstonMartin.name,
  },
  14: {
    initial: 'ALO',
    flag: countryFlags.ESP,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/alonso`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/FERALO01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/alonso`,
    teamLogo: constructors.AstonMartin.icon,
    constructor: constructors.AstonMartin.name,
  },

  // Ferrari
  16: {
    initial: 'LEC',
    flag: countryFlags.MON,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/leclerc`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/CHALEC01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/leclerc`,
    teamLogo: constructors.Ferrari.icon,
    constructor: constructors.Ferrari.name,
  },
  44: {
    initial: 'HAM',
    flag: countryFlags.GBR,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/hamilton`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LEWHAM01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/hamilton`,
    teamLogo: constructors.Ferrari.icon,
    constructor: constructors.Ferrari.name,
  },

  // Haas
  31: {
    initial: 'OCO',
    flag: countryFlags.FRA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/ocon`,
    numberIcon:
      ' https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ESTOCO01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/ocon`,
    teamLogo: constructors.Haas.icon,
    constructor: constructors.Haas.name,
  },
  87: {
    initial: 'BEA',
    flag: countryFlags.GBR,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/bearman`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/OLIBEA01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/bearman`,
    teamLogo: constructors.Haas.icon,
    constructor: constructors.Haas.name,
  },

  // Kick Sauber
  27: {
    initial: 'HUL',
    flag: countryFlags.DEU,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/hulkenberg`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/NICHUL01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/hulkenberg`,
    teamLogo: constructors.KickSauber.icon,
    constructor: constructors.KickSauber.name,
  },
  5: {
    initial: 'BOR',
    flag: countryFlags.BRA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/bortoleto`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/GABBOR01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/bortoleto`,
    teamLogo: constructors.KickSauber.icon,
    constructor: constructors.KickSauber.name,
  },

  // McLaren
  81: {
    initial: 'PIA',
    flag: countryFlags.AUS,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/piastri`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/OSCPIA01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/piastri`,
    teamLogo: constructors.McLaren.icon,
    constructor: constructors.McLaren.name,
  },
  4: {
    initial: 'NOR',
    flag: countryFlags.GBR,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/norris`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LANNOR01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/norris`,
    teamLogo: constructors.McLaren.icon,
    constructor: constructors.McLaren.name,
  },

  // Mercedes
  63: {
    initial: 'RUS',
    flag: countryFlags.GBR,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/russell`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/GEORUS01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/russell`,
    teamLogo: constructors.Mercedes.icon,
    constructor: constructors.Mercedes.name,
  },
  12: {
    initial: 'ANT',
    flag: countryFlags.ITA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDANT01_Andrea%20Kimi_Antonelli/andant01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/antonelli`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ANDANT01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/antonelli`,
    teamLogo: constructors.Mercedes.icon,
    constructor: constructors.Mercedes.name,
  },

  // Racing Bulls
  30: {
    initial: 'LAW',
    flag: countryFlags.NZL,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/fom-website/drivers/${currentYear}Drivers/lawson-racing-bulls`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/LIALAW01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/lawson`,
    teamLogo: constructors.RacingBulls.icon,
    constructor: constructors.RacingBulls.name,
  },
  6: {
    initial: 'HAD',
    flag: countryFlags.FRA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/hadjar`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ISAHAD01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/hadjar`,
    teamLogo: constructors.RacingBulls.icon,
    constructor: constructors.RacingBulls.name,
  },

  // Red Bull Racing
  1: {
    initial: 'VER',
    flag: countryFlags.NED,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/verstappen`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/MAXVER01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/verstappen`,
    teamLogo: constructors.RedBull.icon,
    constructor: constructors.RedBull.name,
  },
  22: {
    initial: 'TSU',
    flag: countryFlags.JPN,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/tsunoda`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/YUKTSU01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/tsunoda`,
    teamLogo: constructors.RedBull.icon,
    constructor: constructors.RedBull.name,
  },

  // Williams
  23: {
    initial: 'ALB',
    flag: countryFlags.THA,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/albon`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/ALEALB01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/albon`,
    teamLogo: constructors.Williams.icon,
    constructor: constructors.Williams.name,
  },
  55: {
    initial: 'SAI',
    flag: countryFlags.ESP,
    headshot:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
    halfBody: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/${currentYear}Drivers/sainz`,
    numberIcon:
      'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/CARSAI01.png',
    helmet: `https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets${currentYear}/sainz`,
    teamLogo: constructors.Williams.icon,
    constructor: constructors.Williams.name,
  },
};
