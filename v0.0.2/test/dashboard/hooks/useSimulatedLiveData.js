import { useEffect, useState } from 'react';
import { getTestIntervals } from '../../data/testIntervalsData.js';
import { getTestPositions } from '../../data/testPositionsData.js';

export function useSimulatedLiveData(interval = 2000) {
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const updateData = () => {
      setIntervals(getTestIntervals());
      setPositions(getTestPositions());
    };

    updateData(); // initial call

    const timer = setInterval(updateData, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { intervals, positions };
}
