import React from 'react';
import Image from 'next/image';
import { Banner } from './Banner';
import { UserInfo } from './UserInfo';
import { useFetchLeaderBoard } from '@/hooks/useFetchLeaderBoard';

const tableHeaders = [
  { name: 'Rank', sortField: null },
  { name: 'Supporter', sortField: null },
  { name: 'q/acc points', sortField: 'QaccPoints' },
  { name: 'Projects funded', sortField: 'ProjectsFundedCount' },
];

export const LeaderBoardView = () => {
  const { data: leaderboardInfo } = useFetchLeaderBoard(10, 0, {
    field: 'QaccPoints',
    direction: 'DESC',
  });
  console.log('leaderboardInfo', leaderboardInfo);
  return (
    <div className='container'>
      <Banner />
      <div className='bg-white rounded-xl p-6 flex flex-col gap-8'>
        <UserInfo />
        <div className='border-b-2 border-gray-200 pb-2 text-2xl font-bold font-adventor'>
          All supporters
        </div>
        <div>
          <div className='grid grid-cols-[50px_1fr_150px_150px] gap-4 text-base text-gray-700 font-redHatText py-2'>
            {tableHeaders.map((header, index) => (
              <div key={index} className='font-bold flex gap-1'>
                {header.name}
                {header.sortField && (
                  <Image
                    src='/images/icons/sort.svg'
                    alt='sort'
                    width={16}
                    height={16}
                    className='cursor-pointer'
                    onClick={() => {
                      // Handle sorting logic here
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {leaderboardInfo?.users.map((user, idx) => {
            const rank = idx + 1;
            const isTop = rank <= 3;
            return (
              <div
                key={rank}
                className={`grid grid-cols-[50px_1fr_150px_150px] gap-4 text-base py-4 text-gray-700 font-redHatText border-t-[1px] border-gray-200 ${isTop ? 'bg-giv-50' : ''} hover:bg-gray-50 transition duration-200 ease-in-out`}
              >
                <div className='text-right'>#{rank}</div>
                <div className='flex gap-2'>
                  {isTop && (
                    <Image
                      src={`/images/icons/rank.svg`}
                      alt='medal'
                      width={24}
                      height={24}
                      className='w-6 h-6'
                    />
                  )}
                  {user.name}
                </div>
                <div className=''>{user.qaccPoints}</div>
                <div className=''>{user.projectsFundedCount}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
