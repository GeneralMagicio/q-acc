import useRemainingTime from '@/hooks/useRemainingTime';
import type { FC } from 'react';

interface IRenamingTimeProps {
  endDate: string;
}

export const RemainingTime: FC<IRenamingTimeProps> = ({ endDate }) => {
  const remainingTime = useRemainingTime(endDate);
  return (
    <div className='text-giv-500 font-medium py-6 px-10'>
      <div className='text-lg'>Remaining time</div>
      <div className='text-2xl font-bold'>{remainingTime}</div>
    </div>
  );
};
