// hooks/useRemainingTime.ts
import { useState, useEffect } from 'react';
import { calculateRemainingTime } from '@/helpers/date';

function useRemainingTime(startDate?: string, endDate?: string) {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    if (!startDate || !endDate) return;
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    const now = new Date('2024-11-22');

    // If current time is before the start date, don't display remaining time
    if (now < _startDate) {
      setRemainingTime('--:--:--');
      return;
    }

    // Set initial remaining time
    setRemainingTime(calculateRemainingTime(_endDate));

    // Update remaining time every second
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(_endDate));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  return endDate ? remainingTime : '--:--:--';
}

export default useRemainingTime;
