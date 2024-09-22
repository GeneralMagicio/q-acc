// hooks/useRemainingTime.ts
import { useState, useEffect } from 'react';
import { calculateRemainingTime } from '@/helpers/date';

function useRemainingTime(endDate: string) {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const _endDate = new Date(endDate);
    // Set initial remaining time
    setRemainingTime(calculateRemainingTime(_endDate));

    // Update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(_endDate));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  return remainingTime;
}

export default useRemainingTime;
