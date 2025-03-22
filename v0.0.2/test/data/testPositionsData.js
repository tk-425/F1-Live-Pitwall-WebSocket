const testPositionsData = [
  {
    date: '2023-08-26T09:30:47.199000+00:00',
    driver_number: 1,
    meeting_key: 1217,
    position: 1,
    session_key: 9144,
  },
  {
    date: '2023-08-26T09:30:50.199000+00:00',
    driver_number: 2,
    meeting_key: 1217,
    position: 2,
    session_key: 9144,
  },
  {
    date: '2023-08-26T09:30:55.199000+00:00',
    driver_number: 3,
    meeting_key: 1217,
    position: 3,
    session_key: 9144,
  },
  {
    date: '2023-08-26T09:31:00.199000+00:00',
    driver_number: 4,
    meeting_key: 1217,
    position: 4,
    session_key: 9144,
  },
  {
    date: '2023-08-26T09:31:05.199000+00:00',
    driver_number: 5,
    meeting_key: 1217,
    position: 5,
    session_key: 9144,
  },
];

// Flag to determine whether to move up or down
let swap = true;

export function getTestPositions() {
  // Clone the array so the original order is maintained
  const updatedPositions = testPositionsData.map((driver) => ({
    ...driver,
    date: new Date().toISOString(), // Fixed timestamp key
  }));

  // Swap positions of driver #2 and driver #3 every 3 seconds
  if (swap) {
    updatedPositions.find((d) => d.driver_number === 2).position = 3;
    updatedPositions.find((d) => d.driver_number === 3).position = 2;
  } else {
    updatedPositions.find((d) => d.driver_number === 2).position = 2;
    updatedPositions.find((d) => d.driver_number === 3).position = 3;
  }

  swap = !swap; // Toggle swap for next update

  return updatedPositions;
}
