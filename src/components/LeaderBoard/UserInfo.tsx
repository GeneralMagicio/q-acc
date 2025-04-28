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
    <div className='p-4 border-2 border-[#5326EC] bg-gray-100 rounded-lg grid grid-cols-4  sm:grid-cols-[50px_1fr_150px_120px] gap-4 font-redHatText'>
      <div># {userInfo?.rank}</div>
      <div className='col-span-2 sm:col-span-1 text-sm  sm:text-base font-semibold flex flex-col'>
        <span>
          {' '}
          {shortenAddress(address)}{' '}
          <span className='text-xs sm:text-base'>[You]</span>
        </span>
        <span className='sm:hidden text-xs font-redHatText text-[#999] font-medium '>
          {' '}
          Projects funded : {userInfo?.projectsFundedCount}
        </span>
      </div>
      <div className='text-lg font-semibold sm:text-left text-center'>
        {roundPoints(user?.qaccPoints).toLocaleString('en-US')}
      </div>
      <div className='text-lg font-semibold hidden sm:block'>
        {userInfo?.projectsFundedCount}
      </div>
    </div>
  );
};
