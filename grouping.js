// Store the latest interval data for each driver
const latestDriverData = new Map();

export function updateDriverData(newIntervals) {
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
    if (index === 0) {
      currentGroup.push(driver);
      return;
    }

    // Check if the current driver should be grouped based on interval
    if (driver.interval === null && driver.interval <= 3) {
      currentGroup.push(driver);
    } else {
      if (currentGroup.length > 1) {
        groups.push([...currentGroup]);
      }

      // Reset the current group and start a new one
      currentGroup = [driver];
    }
  });

  // Handle the last group (only add if it has more than 1 driver
  if (currentGroup.length > 1) {
    groups.push(currentGroup);
  }

  return groups;
}
