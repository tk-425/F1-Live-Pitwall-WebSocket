let latestGroupedIntervals = [];

// Set the latest grouped intervals.
// Called after grouping merged driver data.
export function setLatestGroupedIntervals(groups) {
  latestGroupedIntervals = groups;
}

// Get the latest grouped intervals
export function getLatestGroupedIntervals() {
  return latestGroupedIntervals;
}