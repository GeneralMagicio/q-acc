import React from 'react';
import { useFetchUser } from '@/hooks/useFetchUser';
import { roundPoints } from '@/helpers/points';
import { useFetchLeaderBoard } from '@/hooks/useFetchLeaderBoard';

export const UserInfo = () => {
  const { data: user } = useFetchUser();
  const { data: leaderboardInfo, isLoading } = useFetchLeaderBoard(2000, 0, {
    field: 'Rank',
    direction: 'ASC',
  });

  const userInfo = leaderboardInfo?.users?.find(cuser => cuser.id === user?.id);

  return (
    <div className='p-4 border-2 border-gray-200 bg-gray-100 rounded-lg grid grid-cols-[50px_1fr_150px_120px] gap-4 font-redHatText'>
      <div># {userInfo?.rank}</div>
      <div className='text-lg font-semibold'>{user?.fullName}</div>
      <div className='text-lg font-semibold'>
        {roundPoints(user?.qaccPoints).toLocaleString('en-US')}
      </div>
      <div className='text-lg font-semibold'>
        {userInfo?.projectsFundedCount}
      </div>
    </div>
  );
};
