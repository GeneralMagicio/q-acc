import React from 'react';
import { useFetchUser } from '@/hooks/useFetchUser';

export const UserInfo = () => {
  const { data: user } = useFetchUser();
  return (
    <div className='p-4 border-2 border-gray-200 bg-gray-100 rounded-lg grid grid-cols-[50px_1fr_100px_50px] gap-4'>
      <div># 37</div>
      <div className='text-lg font-semibold'>{user?.fullName}</div>
      <div className='text-lg font-semibold'>392</div>
      <div className='text-lg font-semibold'>2</div>
    </div>
  );
};
