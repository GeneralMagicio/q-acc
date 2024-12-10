import useTimeInterval from '@/hooks/useTimeInterval';
import type { FC } from 'react';

interface IRenamingTimeProps {
  targetDate?: string;
}

export const RemainingTimeBox: FC<IRenamingTimeProps> = ({ targetDate }) => {
  const time = useTimeInterval(targetDate);
  return <div className='font-bold text-giv-500 text-[22px]'>{time}</div>;
};
