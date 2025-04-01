export function groupDriversByInterval(drivers) {
  const groups = [];
  let currentGroup = [];

  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i];

    const isLeader = driver.gap_to_leader === 0;

    if (currentGroup.length === 0 || isLeader || driver.interval <= 3) {
      currentGroup.push(driver);
    } else {
      if (currentGroup.length > 1) {
        // Save completed group
        groups.push([...currentGroup]);
      }
      currentGroup = [driver];
    }
  }

  if (currentGroup.length > 1) {
    groups.push([...currentGroup]);
  }

  return groups;
}
