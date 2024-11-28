import useRemainingTime from '@/hooks/useRemainingTime';
import type { FC } from 'react';

interface IRenamingTimeProps {
  targetDate?: string;
}

export const RemainingTimeBox: FC<IRenamingTimeProps> = ({ targetDate }) => {
  const time = useRemainingTime(targetDate);
  return (
    <div className='py-6 px-10 rounded-2xl shadow-xl shadow-giv-50 text-3xl font-bold text-giv-500'>
      {time}
    </div>
  );
};
