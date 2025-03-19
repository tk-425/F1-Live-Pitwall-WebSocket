export const testIntervals = [
  {
    date: '2023-09-17T13:31:02.395000+00:00',
    driver_number: 1,
    gap_to_leader: 0.0,
    interval: null,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:06.395000+00:00',
    driver_number: 2,
    gap_to_leader: 2.0,
    interval: 2.0,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:10.395000+00:00',
    driver_number: 3,
    gap_to_leader: 3.5,
    interval: 1.5,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:14.395000+00:00',
    driver_number: 4,
    gap_to_leader: 8.0,
    interval: 4.5,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:18.395000+00:00',
    driver_number: 5,
    gap_to_leader: 9.5,
    interval: 3.5,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:22.395000+00:00',
    driver_number: 6,
    gap_to_leader: 12.5,
    interval: 3.0,
    meeting_key: 1219,
    session_key: 9165,
  },
  {
    date: '2023-09-17T13:31:26.395000+00:00',
    driver_number: 7,
    gap_to_leader: 20.0,
    interval: 7.5,
    meeting_key: 1219,
    session_key: 9165,
  },
];

// Flag to determine whether to add or subtract
let increasing = true;

export function getTestIntervals() {
  // Modify driver 3's interval dynamically
  let driver3 = testIntervalsData.find((d) => d.driver_number === 3);

  if (increasing) {
    driver3.interval += 0.5;

    if (driver3.interval >= 4) {
      increasing = false;
    }
  } else {
    driver3.interval -= 0.5;

    if (driver3.interval <= 1) {
      increasing = true;
    }
  }

  return [...testIntervalsData];
}
