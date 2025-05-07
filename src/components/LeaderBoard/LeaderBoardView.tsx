'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import { Banner } from './Banner';
import { UserInfo } from './UserInfo';
import { useFetchLeaderBoard } from '@/hooks/useFetchLeaderBoard';
import { SortDirection, SortField } from '@/services/points.service';
import { Pagination } from './Pagination';
import { Spinner } from '../Loading/Spinner';
import { roundPoints } from '@/helpers/points';
import { ENSName } from './ENSName';

const tableHeaders = [
  { name: 'Rank', sortField: null },
  { name: 'Supporter', sortField: null },
  { name: 'q/acc points', sortField: 'QaccPoints' },
  { name: 'Projects funded', sortField: 'ProjectsFundedCount' },
];

const LIMIT = 15;

export const LeaderBoardView = () => {
  const { isConnected } = useAccount();
  const [sortField, setSortField] = useState<SortField>('Rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('ASC');
  const [page, setPage] = useState(0); // 0-based index

  const { data: leaderboardInfo, isLoading } = useFetchLeaderBoard(
    LIMIT,
    page * LIMIT,
    {
      field: sortField,
      direction: sortDirection,
    },
  );

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSortField(field);
      setSortDirection('DESC'); // default on new field
    }
    setPage(0); // reset to first page when sorting
  };

  const total = leaderboardInfo?.totalCount ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className='container'>
      <Banner />
      <div className='bg-white rounded-xl p-6 flex flex-col '>
        {isConnected && <UserInfo />}
        <div className='border-b-2 border-gray-200 pb-2 text-2xl font-bold font-adventor mt-8'>
          All supporters
        </div>

        <div className='relative'>
          <div className='hidden sm:grid grid-cols-[30px_120px_80px_80px] mt-8 md:grid-cols-[50px_1fr_150px_150px] gap-4 text-base text-gray-700 font-redHatText py-2'>
            {tableHeaders.map((header, index) => (
              <div
                key={index}
                className='font-bold flex gap-1 items-center cursor-pointer'
                onClick={() =>
                  header.sortField && toggleSort(header.sortField as SortField)
                }
              >
                {header.name}
                {header.sortField && (
                  <Image
                    src='/images/icons/sort.svg'
                    alt='sort'
                    width={16}
                    height={16}
                    className={`transition-transform ${
                      sortField === header.sortField
                        ? sortDirection === 'ASC'
                          ? 'rotate-180'
                          : ''
                        : 'opacity-30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {leaderboardInfo?.users?.map((user, idx) => {
            const isTop = user.rank <= 3;
            return (
              <div
                key={user.id}
                className={`grid grid-cols-4 sm:grid-cols-[50px_1fr_150px_150px] gap-4 text-base py-4 text-gray-700 font-redHatText border-t-[1px] border-gray-200 ${isTop ? 'bg-giv-50' : ''} hover:bg-gray-50 transition duration-200 ease-in-out`}
              >
                <div className=' text-center sm:text-right'>#{user.rank}</div>
                <div className='col-span-2 sm:col-span-1 flex gap-2  justify-center sm:justify-start  '>
                  {isTop && (
                    <Image
                      src={`/images/icons/rank.svg`}
                      alt='medal'
                      width={24}
                      height={24}
                      className='w-6 h-6'
                    />
                  )}
                  <div className=' flex flex-col justify-center items-start'>
                    <span>
                      {' '}
                      {user.name ? (
                        user.name
                      ) : (
                        <ENSName address={user.walletAddress as Address} />
                      )}
                    </span>

                    <span className='sm:hidden text-xs font-redHatText text-[#999] font-medium '>
                      {' '}
                      Projects funded : {user.projectsFundedCount}
                    </span>
                  </div>
                </div>
                <div className='sm:text-left text-center'>
                  {roundPoints(user.qaccPoints).toLocaleString('en-US')}
                </div>
                <div className='hidden sm:block'>
                  {user.projectsFundedCount}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Spinner size={24} />
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
