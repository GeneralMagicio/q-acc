import Image from 'next/image';
import { FC, HTMLProps } from 'react';
import { useFetchUser } from '@/hooks/useFetchUser';
import { roundPoints } from '@/helpers/points';

interface PointsButtonProps extends HTMLProps<HTMLDivElement> {}

export const PointsButton: FC<PointsButtonProps> = ({ className }) => {
  const { data: userInfo } = useFetchUser();
  return userInfo ? (
    <div
      className={`bg-giv-50 border-[1px] border-giv-100 rounded-xl flex gap-2 py-3 px-4 items-center ${className}`}
    >
      <Image
        src='/images/icons/points.svg'
        alt='points'
        width={24}
        height={24}
        className='w-6 h-6'
      />
      <div className='text-sm font-redHatText font-semibold text-giv-900'>
        {roundPoints(userInfo?.qaccPoints).toLocaleString('en-US')}
      </div>
    </div>
  ) : null;
};
