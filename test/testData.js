const now = new Date();

export const testMeetingData = {
  meeting_key: 1255,
  meeting_official_name: 'Sandbox Grand Prix',
  location: 'Test_Garage',
  country_name: 'Sandbox',
  country_code: 'TST',
  country_key: 1,
  circuit_short_name: 'Test Track',
  circuit_key: 1,
  year: new Date().getFullYear(),
  date_start: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
};

export const testSessionData = {
  session_key: 9998,
  session_type: 'Race',
  session_name: 'Race',
  date_start: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // started 5 min ago
  date_end: new Date(Date.now() + 55 * 60 * 1000).toISOString(), // ends in 55 min
  circuit_short_name: 'Test Track',
  location: 'Test_Garage',
  country_name: 'Sandbox',
  gmt_offset: '08:00:00',
  meeting_key: 1255,
  circuit_key: 53,
  country_key: 49,
  country_code: 'TST',
  year: new Date().getFullYear(),
};

export const testIntervalsData = new Map([
  [
    1,
    {
      driver_number: 1,
      position: 1,
      interval: null,
      gap_to_leader: 0,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:38.000Z',
      initial: 'MAX',
    },
  ],
  [
    4,
    {
      driver_number: 4,
      position: 2,
      interval: 1.301,
      gap_to_leader: 1.301,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:39.000Z',
      initial: 'NOR',
    },
  ],
  [
    81,
    {
      driver_number: 81,
      position: 3,
      interval: 0.894,
      gap_to_leader: 2.195,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:40.000Z',
      initial: 'PIA',
    },
  ],
  [
    16,
    {
      driver_number: 16,
      position: 4,
      interval: 0.894,
      gap_to_leader: 3.089,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:41.000Z',
      initial: 'LEC',
    },
  ],
  [
    63,
    {
      driver_number: 63,
      position: 5,
      interval: 5.012,
      gap_to_leader: 10.983,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:42.000Z',
      initial: 'RUS',
    },
  ],
  [
    12,
    {
      driver_number: 12,
      position: 6,
      interval: 0.658,
      gap_to_leader: 11.641,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:43.000Z',
      initial: 'ANT',
    },
  ],
  [
    44,
    {
      driver_number: 44,
      position: 7,
      interval: 6.788,
      gap_to_leader: 18.429,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:44.000Z',
      initial: 'HAM',
    },
  ],
  [
    6,
    {
      driver_number: 6,
      position: 8,
      interval: 0.871,
      gap_to_leader: 19.3,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:45.000Z',
      initial: 'HAD',
    },
  ],
  [
    23,
    {
      driver_number: 23,
      position: 9,
      interval: 5.004,
      gap_to_leader: 20.304,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:46.000Z',
      initial: 'ALB',
    },
  ],
  [
    87,
    {
      driver_number: 87,
      position: 10,
      interval: 0.699,
      gap_to_leader: 21.003,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:47.000Z',
      initial: 'BEA',
    },
  ],
  [
    14,
    {
      driver_number: 14,
      position: 11,
      interval: 8.127,
      gap_to_leader: 29.13,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:48.000Z',
      initial: 'ALO',
    },
  ],
  [
    22,
    {
      driver_number: 22,
      position: 12,
      interval: 10.839,
      gap_to_leader: 29.969,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:49.000Z',
      initial: 'TSU',
    },
  ],
  [
    10,
    {
      driver_number: 10,
      position: 13,
      interval: 10.926,
      gap_to_leader: 30.895,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:50.000Z',
      initial: 'GAS',
    },
  ],
  [
    55,
    {
      driver_number: 55,
      position: 14,
      interval: 1.203,
      gap_to_leader: 32.098,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:51.000Z',
      initial: 'SAI',
    },
  ],
  [
    7,
    {
      driver_number: 7,
      position: 15,
      interval: 1.204,
      gap_to_leader: 33.302,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:52.000Z',
      initial: 'DOO',
    },
  ],
  [
    27,
    {
      driver_number: 27,
      position: 16,
      interval: 5.467,
      gap_to_leader: 35.769,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:53.000Z',
      initial: 'HUL',
    },
  ],
  [
    30,
    {
      driver_number: 30,
      position: 17,
      interval: 3.95,
      gap_to_leader: 36.719,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:54.000Z',
      initial: 'LAW',
    },
  ],
  [
    31,
    {
      driver_number: 31,
      position: 18,
      interval: 2.816,
      gap_to_leader: 39.535,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:55.000Z',
      initial: 'OCO',
    },
  ],
  [
    5,
    {
      driver_number: 5,
      position: 19,
      interval: 1.004,
      gap_to_leader: 40.539,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:56.000Z',
      initial: 'BOR',
    },
  ],
  [
    18,
    {
      driver_number: 18,
      position: 20,
      interval: 1.008,
      gap_to_leader: 41.547,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'STR',
    },
  ],
]);

export const testPositionsData = new Map([
  [
    1,
    {
      driver_number: 1,
      position: 1,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:38.000Z',
      initial: 'VER',
    },
  ],
  [
    4,
    {
      driver_number: 4,
      position: 2,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:39.000Z',
      initial: 'NOR',
    },
  ],
  [
    81,
    {
      driver_number: 81,
      position: 3,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:40.000Z',
      initial: 'PIA',
    },
  ],
  [
    16,
    {
      driver_number: 16,
      position: 4,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:42.000Z',
      initial: 'LEC',
    },
  ],
  [
    63,
    {
      driver_number: 63,
      position: 5,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:44.000Z',
      initial: 'RUS',
    },
  ],
  [
    12,
    {
      driver_number: 12,
      position: 6,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:45.000Z',
      initial: 'ANT',
    },
  ],
  [
    44,
    {
      driver_number: 44,
      position: 7,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:46.000Z',
      initial: 'HAM',
    },
  ],
  [
    6,
    {
      driver_number: 6,
      position: 8,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:47.000Z',
      initial: 'HAD',
    },
  ],
  [
    23,
    {
      driver_number: 23,
      position: 9,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:48.000Z',
      initial: 'ALB',
    },
  ],
  [
    87,
    {
      driver_number: 87,
      position: 10,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:49.000Z',
      initial: 'BEA',
    },
  ],
  [
    14,
    {
      driver_number: 14,
      position: 11,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:50.000Z',
      initial: 'ALO',
    },
  ],
  [
    22,
    {
      driver_number: 22,
      position: 12,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:53.000Z',
      initial: 'TSU',
    },
  ],
  [
    10,
    {
      driver_number: 10,
      position: 13,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:54.000Z',
      initial: 'GAS',
    },
  ],
  [
    55,
    {
      driver_number: 55,
      position: 14,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:55.000Z',
      initial: 'SAI',
    },
  ],
  [
    7,
    {
      driver_number: 7,
      position: 15,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:56.000Z',
      initial: 'DOO',
    },
  ],
  [
    27,
    {
      driver_number: 27,
      position: 16,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'HUL',
    },
  ],
  [
    30,
    {
      driver_number: 30,
      position: 17,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'LAW',
    },
  ],
  [
    31,
    {
      driver_number: 31,
      position: 18,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'OCO',
    },
  ],
  [
    5,
    {
      driver_number: 5,
      position: 19,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'BOR',
    },
  ],
  [
    18,
    {
      driver_number: 18,
      position: 20,
      session_key: 9998,
      meeting_key: 1255,
      date: '2025-04-11T03:42:57.000Z',
      initial: 'STR',
    },
  ],
]);

export const testStintsData = [
  {
    driver_number: 5,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'SOFT',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 14,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 10,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 81,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'SOFT',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 4,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 63,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 1,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'SOFT',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 16,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 44,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 31,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 12,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 23,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 87,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 18,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 55,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 6,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 30,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
  {
    driver_number: 7,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 10,
        lap_start: 1,
        lap_end: 10,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 10,
        lap_start: 11,
        lap_end: 57,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  //
  {
    driver_number: 27,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 5,
        lap_start: 1,
        lap_end: 1,
        compound: 'MEDIUM',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 2,
        driver_number: 5,
        lap_start: 2,
        lap_end: 26,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 3,
        driver_number: 5,
        lap_start: 27,
        lap_end: 56,
        compound: 'HARD',
        tyre_age_at_start: 0,
      },
    ],
  },
  {
    driver_number: 22,
    lastUpdated: 1711478000000,
    stints: [
      {
        meeting_key: 1255,
        session_key: 9998,
        stint_number: 1,
        driver_number: 14,
        lap_start: 1,
        lap_end: 5,
        compound: 'MEDIUM',
        tyre_age_at_start: 5,
      },
    ],
  },
];

export const testTeamRadioData = [
  {
    driver_number: 5,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 5,
        date: '2025-04-06T04:09:45.554000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/GABBOR01_5_20250406_130927.mp3',
      },
    ],
  },
  {
    driver_number: 6,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 6,
        date: '2025-04-06T04:25:36.019000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/ISAHAD01_6_20250406_132505.mp3',
      },
    ],
  },
  {
    driver_number: 30,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 30,
        date: '2025-04-06T04:28:08.285000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LIALAW01_30_20250406_132737.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 30,
        date: '2025-04-06T04:30:41.858000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LIALAW01_30_20250406_133010.mp3',
      },
    ],
  },
  {
    driver_number: 1,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:09:01.369000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_140749.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:14:10.371000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_141403.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:34:18.542000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_143359.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:38:24.661000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_143806.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:39:27.270000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_143915.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T05:59:22.896000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_145853.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T06:05:01.654000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_150449.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T06:10:41.253000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_151003.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 1,
        date: '2025-04-06T06:27:44.353000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_152735.mp3',
      },
    ],
  },
  {
    driver_number: 4,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:17:15.360000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_141704.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:31:12.948000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_143054.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:31:43.667000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_143126.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:33:48.370000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_143317.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:37:21.441000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_143718.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:38:54.239000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_143841.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 4,
        date: '2025-04-06T05:45:35.461000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LANNOR01_4_20250406_144506.mp3',
      },
    ],
  },
  {
    driver_number: 16,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 16,
        date: '2025-04-06T05:33:18.276000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/CHALEC01_16_20250406_143243.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 16,
        date: '2025-04-06T06:03:59.801000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/CHALEC01_16_20250406_150337.mp3',
      },
    ],
  },
  {
    driver_number: 23,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 23,
        date: '2025-04-06T05:43:01.538000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/ALEALB01_23_20250406_144219.mp3',
      },
    ],
  },
  {
    driver_number: 31,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 31,
        date: '2025-04-06T05:54:14.525000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/ESTOCO01_31_20250406_145344.mp3',
      },
    ],
  },
  {
    driver_number: 10,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 10,
        date: '2025-04-06T05:55:17.150000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/PIEGAS01_10_20250406_145443.mp3',
      },
    ],
  },
  {
    driver_number: 44,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 44,
        date: '2025-04-06T06:01:25.959000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/LEWHAM01_44_20250406_150046.mp3',
      },
    ],
  },
  {
    driver_number: 81,
    radios: [
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 81,
        date: '2025-04-06T06:09:09.697000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/OSCPIA01_81_20250406_150901.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 81,
        date: '2025-04-06T06:10:10.019000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/OSCPIA01_81_20250406_150943.mp3',
      },
      {
        session_key: 9998,
        meeting_key: 1255,
        driver_number: 81,
        date: '2025-04-06T06:29:16.231000+00:00',
        recording_url:
          'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/OSCPIA01_81_20250406_152927.mp3',
      },
    ],
  },
];
