import React from 'react';
import { useAccount } from 'wagmi';
import { useFetchUser } from '@/hooks/useFetchUser';
import { roundPoints } from '@/helpers/points';
import { useFetchLeaderBoard } from '@/hooks/useFetchLeaderBoard';
import { shortenAddress } from '@/helpers/address';

export const UserInfo = () => {
  const { data: user } = useFetchUser();
  const { address } = useAccount();

  const { data: leaderboardInfo, isLoading } = useFetchLeaderBoard(2000, 0, {
    field: 'Rank',
    direction: 'ASC',
  });

  const userInfo = leaderboardInfo?.users?.find(cuser => cuser.id === user?.id);

  return (
    <div className='p-4 border-2 border-[#5326EC] bg-gray-100 rounded-lg grid  grid-cols-[30px_120px_80px_80px] md:grid-cols-[50px_1fr_150px_120px] gap-4 font-redHatText'>
      <div># {userInfo?.rank}</div>
      <div className='text-lg font-semibold'>
        {shortenAddress(address)} [You]
      </div>
      <div className='text-lg font-semibold'>
        {roundPoints(user?.qaccPoints).toLocaleString('en-US')}
      </div>
      <div className='text-lg font-semibold'>
        {userInfo?.projectsFundedCount}
      </div>
    </div>
  );
};
