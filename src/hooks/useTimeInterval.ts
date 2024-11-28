// hooks/useRemainingTime.ts
import { useState, useEffect } from 'react';
import { calculateRemainingTime } from '@/helpers/date';

function useTimeInterval(date?: string) {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    if (!date) return;
    const _date = new Date(date);
    const now = new Date();

    // Set initial remaining time
    setRemainingTime(calculateRemainingTime(_date));

    // Update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(_date));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [date]);

  return date ? remainingTime : '--:--:--';
}

export default useTimeInterval;
