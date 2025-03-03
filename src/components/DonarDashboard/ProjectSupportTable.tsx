import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import round from 'lodash/round';
import Pagination from '../Pagination';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconSort } from '../Icons/IconSort';
import { fetchProjectDonationsById } from '@/services/donation.services';
import { useFetchProjectById } from '@/hooks/useFetchProjectById';
import {
  formatDateMonthDayYear,
  getDifferenceFromPeriod,
  OneYearInMilliSecs,
} from '@/helpers/date';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import config from '@/config/configuration';
import { checkMatchingFundAddress, formatAmount } from '@/helpers/donation';

const itemPerPage = 5;

export enum EOrderBy {
  CreationDate = 'CreationDate',
  Round = 'Round',
  Amount = 'Amount',
  Reward = 'RewardToken',
}

export enum EDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}
export interface IOrder {
  by: EOrderBy;
  direction: EDirection;
}

const ProjectSupportTable = ({
  projectId,
  term,
}: {
  projectId: string;
  term?: string;
}) => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { data: projectData } = useFetchProjectById(parseInt(projectId));
  const { data: POLPrice } = useFetchTokenPrice();

  const [order, setOrder] = useState<IOrder>({
    by: EOrderBy.CreationDate,
    direction: EDirection.DESC,
  });

  const [pageDonations, setPageDonations] = useState<any>();

  useEffect(() => {
    const fetchProjectDonations = async () => {
      if (projectId) {
        const data = await fetchProjectDonationsById(
          parseInt(projectId),
          itemPerPage,
          page * itemPerPage,
          { field: order.by, direction: order.direction },
          term && term.trim() !== '' ? term : '',
        );

        if (data) {
          const { donations, totalCount } = data;
          console.log(donations);
          setTotalCount(totalCount);
          setPageDonations(donations);
        }
      }
    };

    fetchProjectDonations();
  }, [page, projectData, itemPerPage, totalCount, order, term]);

  const orderChangeHandler = (orderBy: EOrderBy) => {
    if (orderBy === order.by) {
      setOrder({
        by: orderBy,
        direction:
          order.direction === EDirection.ASC ? EDirection.DESC : EDirection.ASC,
      });
    } else {
      setOrder({
        by: orderBy,
        direction: EDirection.DESC,
      });
    }
  };

  // Set POL token price

  if (totalCount === 0) {
    return (
      <div className='bg-white w-full h-[500px] flex items-center justify-center font-bold text-[25px] text-[#82899A]'>
        This project didn’t receive any contributions yet.
      </div>
    );
  }

  return (
    <div className='container flex  flex-col py-1 md:px-6 gap-10'>
      <div className='flex gap-10 lg:flex-row flex-col '>
        <div className='flex flex-col w-full  font-redHatText overflow-x-auto'>
          <div className='flex justify-between'>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2   font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Supporter
              <button onClick={() => orderChangeHandler(EOrderBy.Amount)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Date
              <button onClick={() => orderChangeHandler(EOrderBy.CreationDate)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-2  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Round
              <button onClick={() => orderChangeHandler(EOrderBy.Round)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2   font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Amount [POL]
              <button onClick={() => orderChangeHandler(EOrderBy.Amount)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-2  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Token
              <button onClick={() => orderChangeHandler(EOrderBy.Reward)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-2  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Unlock Remaining
              <button
                onClick={() => orderChangeHandler(EOrderBy.Reward)}
              ></button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-2  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Stream Details
              <button
                onClick={() => orderChangeHandler(EOrderBy.Reward)}
              ></button>
            </div>
          </div>

          <div className=''>
            {pageDonations?.map((donation: any) => (
              <div key={donation.id} className=' flex justify-between '>
                <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                  {checkMatchingFundAddress(donation.fromWalletAddress)
                    ? 'Matching pool allocation'
                    : donation.user.firstName
                      ? donation.user.firstName + ' ' + donation.user.lastName
                      : 'Anoynomous'}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                  {new Date(donation.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    year: 'numeric',
                    month: 'short',
                  })}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[180px]'>
                  {checkMatchingFundAddress(donation.fromWalletAddress)
                    ? 'q/acc round'
                    : donation.earlyAccessRound
                      ? `Early access - Round ${donation.earlyAccessRound.roundNumber}`
                      : donation.qfRound
                        ? 'q/acc round'
                        : `---`}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                  <div className='flex flex-col'>
                    <div className='flex gap-1 items-center'>
                      <span className='font-medium'>
                        {formatAmount(donation.amount)}
                      </span>
                      <Link
                        target='_blank'
                        href={`${config.SCAN_URL}/tx/${donation.transactionId}`}
                      >
                        <IconViewTransaction size={16} />
                      </Link>
                    </div>

                    <span className='text-xs font-medium  text-[#A5ADBF]'>
                      ${' '}
                      {formatAmount(
                        Math.round(donation.amount * Number(POLPrice) * 100) /
                          100,
                      )}
                    </span>
                  </div>
                </div>
                <div className='p-[18px_4px]  text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {donation?.rewardTokenAmount
                    ? formatAmount(round(donation.rewardTokenAmount, 2)) +
                      ' ' +
                      projectData?.abc.tokenTicker
                    : '-'}
                </div>
                <div className='p-[18px_4px]  text-[#1D1E1F]  flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {donation.rewardStreamStart
                    ? getDifferenceFromPeriod(
                        donation.rewardStreamStart,
                        donation.cliff / OneYearInMilliSecs,
                      )
                    : '-'}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                  {donation.rewardStreamStart !== null &&
                  donation.rewardStreamEnd !== null ? (
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {formatDateMonthDayYear(donation.rewardStreamEnd)} End
                      </span>
                      <span className='text-xs font-medium text-[#A5ADBF]'>
                        Starts on{' '}
                        {formatDateMonthDayYear(donation.rewardStreamStart)}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-center'>
            <Pagination
              currentPage={page}
              totalCount={totalCount}
              setPage={setPage}
              itemPerPage={itemPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSupportTable;
