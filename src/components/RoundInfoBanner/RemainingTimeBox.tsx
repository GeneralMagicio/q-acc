import useTimeInterval from '@/hooks/useTimeInterval';
import type { FC } from 'react';

interface IRenamingTimeProps {
  targetDate?: string;
}

export const RemainingTimeBox: FC<IRenamingTimeProps> = ({ targetDate }) => {
  const time = useTimeInterval(targetDate);
  return (
    <div className='py-6 px-10  text-3xl font-bold text-giv-500'>{time}</div>
  );
};
