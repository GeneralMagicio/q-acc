import React from 'react';
import Image from 'next/image';
import { Banner } from './Banner';
import { UserInfo } from './UserInfo';

const tableHeaders = [
  { name: 'Rank', isSortable: true },
  { name: 'Supporter', isSortable: false },
  { name: 'q/acc points', isSortable: true },
  { name: 'Projects funded', isSortable: true },
];

const mockData = [
  {
    rank: 1,
    name: 'John Doe',
    points: 392,
    projects: 2,
  },
  {
    rank: 2,
    name: 'Jane Smith',
    points: 300,
    projects: 3,
  },
  {
    rank: 3,
    name: 'Alice Johnson',
    points: 250,
    projects: 4,
  },
  {
    rank: 4,
    name: 'Bob Brown',
    points: 200,
    projects: 5,
  },
  {
    rank: 5,
    name: 'Charlie Davis',
    points: 150,
    projects: 6,
  },
  {
    rank: 6,
    name: 'David Wilson',
    points: 100,
    projects: 7,
  },
  {
    rank: 7,
    name: 'Eva Green',
    points: 50,
    projects: 8,
  },
  {
    rank: 8,
    name: 'Frank White',
    points: 25,
    projects: 9,
  },
  {
    rank: 9,
    name: 'Grace Black',
    points: 10,
    projects: 10,
  },
  {
    rank: 10,
    name: 'Hannah Blue',
    points: 5,
    projects: 11,
  },
  {
    rank: 11,
    name: 'Ian Red',
    points: 3,
    projects: 12,
  },
  {
    rank: 12,
    name: 'Jack Yellow',
    points: 2,
    projects: 13,
  },
];

export const LeaderBoardView = () => {
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
                {header.isSortable && (
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
          {mockData.map(user => {
            const isTop = user.rank <= 3;
            return (
              <div
                key={user.rank}
                className={`grid grid-cols-[50px_1fr_150px_150px] gap-4 text-base py-4 text-gray-700 font-redHatText border-t-[1px] border-gray-200 ${isTop ? 'bg-giv-50' : ''} hover:bg-gray-50 transition duration-200 ease-in-out`}
              >
                <div className='text-right'>#{user.rank}</div>
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
                <div className=''>{user.points}</div>
                <div className=''>{user.projects}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
