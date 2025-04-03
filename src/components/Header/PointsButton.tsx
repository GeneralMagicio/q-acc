import React from 'react';
import { useFetchUser } from '@/hooks/useFetchUser';

export const PointsButton = () => {
  const { data: userInfo } = useFetchUser();
  return (
    <div className='text-sm font-redHatText font-semibold text-giv-900'>
      {userInfo?.qaccPoints}
    </div>
  );
};
