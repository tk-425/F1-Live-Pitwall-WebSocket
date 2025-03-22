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
        groups.push([...currentGroup]);
      }
      currentGroup = [driver]; // start a new group
    }
  });

  if (currentGroup.length > 1) {
    groups.push([...currentGroup]);
  }

  return groups;
}
