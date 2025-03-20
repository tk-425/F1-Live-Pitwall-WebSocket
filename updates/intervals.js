// Store the latest interval data for each driver
const latestDriverData = new Map();

export function updateIntervalsData(newIntervals) {
  newIntervals.forEach((driver) => {
    const existingData = latestDriverData.get(driver.driver_number);

    // Update only if the fetched timestamp is newer
    if (!existingData || new Date(driver.date) > new Date(existingData.date)) {
      latestDriverData.set(driver.driver_number, driver);
    }
  });

  // Convert Map value to an array (latest snapshot of drivers)
  const updatedIntervals = Array.from(latestDriverData.values());

  // Recompute groups with the latest driver data
  return groupDriversByInterval(updatedIntervals);
}

export function groupDriversByInterval(intervals) {
  const groups = [];
  let currentGroup = [];

  intervals.forEach((driver, index) => {
    if (
      currentGroup.length === 0 ||
      driver.interval === null ||
      driver.interval <= 3
    ) {
      currentGroup.push(driver);
    } else {
      if (currentGroup.length > 1) {
        groups.push([...currentGroup]); // Save completed group
      }
      currentGroup = [driver]; // Start a new group
    }
  });

  if (currentGroup.length > 1) {
    groups.push([...currentGroup]); // Save the last group if valid
  }

  return groups;
}
