const latestPositionsData = new Map();
export function updatePositionsData(newPosition) {
  newPosition.forEach((driver) => {
    const existingData = latestPositionsData.get(driver.driver_number);

    // Ensure updates only apply when the timestamp is newer
    if (!existingData || new Date(driver.date) > new Date(existingData.date)) {
      latestPositionsData.set(driver.driver_number, driver);
    }
  });

  // Convert map to array and sort by position
  const updatedPositions = Array.from(latestPositionsData.values()).sort(
    (a, b) => a.position - b.position
  );

  // Index positions so that position 1 is at index 0, position 2 at index 1, etc.
  const indexedPositions = [];

  updatedPositions.forEach((driver) => {
    indexedPositions[driver.position - 1] = driver;
  });

  return indexedPositions;
}
