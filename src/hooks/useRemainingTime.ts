// hooks/useRemainingTime.ts
import { useState, useEffect } from 'react';
import { calculateRemainingTime } from '@/helpers/date';

function useRemainingTime(endDate: Date) {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    // Set initial remaining time
    setRemainingTime(calculateRemainingTime(endDate));

    // Update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(endDate));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  return remainingTime;
}

export default useRemainingTime;
