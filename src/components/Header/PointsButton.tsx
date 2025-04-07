import React from 'react';
import Image from 'next/image';
import { useFetchUser } from '@/hooks/useFetchUser';

export const PointsButton = () => {
  const { data: userInfo } = useFetchUser();
  return userInfo ? (
    <div className='bg-giv-50 border-[1px] border-giv-100 rounded-xl flex gap-2 order-2 md:order-3 py-3 px-4 items-center'>
      <Image
        src='/images/icons/points.svg'
        alt='points'
        width={24}
        height={24}
        className='w-6 h-6'
      />
      <div className='text-sm font-redHatText font-semibold text-giv-900'>
        {userInfo?.qaccPoints?.toLocaleString('en-US')}
      </div>
    </div>
  ) : null;
};
