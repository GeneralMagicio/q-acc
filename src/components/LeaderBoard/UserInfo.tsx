import React from 'react';
import { useFetchUser } from '@/hooks/useFetchUser';
import { roundPoints } from '@/helpers/points';
import { useFetchLeaderBoard } from '@/hooks/useFetchLeaderBoard';
import { useAccount } from 'wagmi';

export const UserInfo = () => {
  const { address } = useAccount();

  const { data: userPoints, isLoading } = useFetchLeaderBoard(
    1,
    0,
    {
      field: 'Rank',
      direction: 'ASC',
    },
    address?.toLowerCase(),
  );
  if (!userPoints?.users[0]) {
    return;
  }

  return (
    <div className='p-4 border-2 border-[#5326EC] bg-gray-100 rounded-lg grid grid-cols-[50px_1fr_150px_120px] gap-4 font-redHatText'>
      <div># {userPoints?.users[0]?.rank || 0}</div>
      <div className='text-lg font-semibold'>
        {userPoints?.users[0]?.name || ''}
      </div>
      <div className='text-lg font-semibold'>
        {roundPoints(userPoints?.users[0]?.qaccPoints).toLocaleString(
          'en-US',
        ) || 0}
      </div>
      <div className='text-lg font-semibold'>
        {userPoints?.users[0]?.projectsFundedCount || 0}
      </div>
    </div>
  );
};
