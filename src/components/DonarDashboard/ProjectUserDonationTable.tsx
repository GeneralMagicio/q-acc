import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
import { IconSort } from '../Icons/IconSort';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { fetchProjectDonors } from '@/services/donation.services';
import {
  formatDateMonthDayYear,
  getDifferenceFromPeriod,
  OneYearInMilliSecs,
} from '@/helpers/date';
import { formatAmount } from '@/helpers/donation';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import config from '@/config/configuration';

interface ProjectUserDonationTableProps {
  userId: number;
  projectId: number;
  totalContributions: number;
}

interface Donation {
  id: number;
  amount: number;
  createdAt: string;
  rewardTokenAmount: number;
  cliff: number;
  rewardStreamStart: string;
  rewardStreamEnd: string;
  transactionId: string;
  earlyAccessRound?: {
    roundNumber: number;
  };
  project: {
    id: number;
    abc: {
      tokenTicker: string;
      tokenPrice: number;
    };
  };
}

const itemPerPage = 5;

enum EOrderBy {
  Date = 'Date',
  Round = 'Round',
  Amount = 'Amount',
  Tokens = 'Tokens',
}

enum EDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

const ProjectUserDonationTable: React.FC<ProjectUserDonationTableProps> = ({
  userId,
  projectId,
  totalContributions,
}) => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageDonations, setPageDonations] = useState<Donation[]>([]);
  const { data: POLPrice } = useFetchTokenPrice();

  const [order, setOrder] = useState<{ by: EOrderBy; direction: EDirection }>({
    by: EOrderBy.Date,
    direction: EDirection.DESC,
  });

  useEffect(() => {
    const fetchUserDonationData = async () => {
      // const data = await fetchUserDonations(userId);
      const donationsByProjectId = await fetchProjectDonors(
        Number(projectId),
        1000,
      );
      const userDonations = donationsByProjectId?.donations.filter(
        (donation: any) => donation.user.id == userId,
      );
      if (userDonations) {
        // const { donations } = data;

        // Filter donations for the specified projectId

        // const filteredDonations = donations.filter(
        //   (donation: Donation) => donation.project.id === projectId,
        // );

        // Sort the donations based on the order state
        const sortedDonations = userDonations.sort(
          (
            a: {
              createdAt: string | number | Date;
              amount: number;
              rewardTokenAmount: number;
            },
            b: {
              createdAt: string | number | Date;
              amount: number;
              rewardTokenAmount: number;
            },
          ) => {
            if (order.by === EOrderBy.Date) {
              return order.direction === EDirection.ASC
                ? new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime();
            } else if (order.by === EOrderBy.Amount) {
              return order.direction === EDirection.ASC
                ? a.amount - b.amount
                : b.amount - a.amount;
            } else if (order.by === EOrderBy.Tokens) {
              return order.direction === EDirection.ASC
                ? a.rewardTokenAmount - b.rewardTokenAmount
                : b.rewardTokenAmount - a.rewardTokenAmount;
            }
            return 0;
          },
        );

        setTotalCount(sortedDonations.length);
        setPageDonations(
          sortedDonations.slice(page * itemPerPage, (page + 1) * itemPerPage),
        );
      }
    };

    fetchUserDonationData();
  }, [userId, projectId, page, order]);

  // Function to handle sorting
  const handleSort = (sortBy: EOrderBy) => {
    setOrder(prevOrder => ({
      by: sortBy,
      direction:
        prevOrder.by === sortBy && prevOrder.direction === EDirection.ASC
          ? EDirection.DESC
          : EDirection.ASC,
    }));
  };

  if (totalCount === 0) {
    return (
      <div className='container bg-white w-full h-[500px] flex items-center justify-center text-[25px] font-bold text-[#82899A] rounded-2xl'>
        You haven’t made any contributions to this project yet.
      </div>
    );
  }

  return (
    <div className='container flex flex-col py-10 md:px-6 gap-10'>
      {/* Summary Section */}
      <div className='flex justify-between p-4 bg-[#F7F7F9] items-center rounded-xl'>
        <div className='flex gap-2'>
          <IconTotalDonations size={32} />
          <h1 className='text-[#1D1E1F] md:text-[25px] font-bold '>
            All your contributions
          </h1>
        </div>
        <div className='flex gap-2 text-[#1D1E1F] '>
          <h1 className='md:text-[25px] font-bold '>
            {formatAmount(totalContributions)} POL
          </h1>
          <span className='font-medium'>
            ~ ${formatAmount(totalContributions * Number(POLPrice))}
          </span>
        </div>
      </div>

      <div className='flex gap-10 lg:flex-row flex-col '>
        <div className='flex flex-col w-full font-redHatText overflow-x-auto'>
          <div className='flex justify-between px-10'>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Date
              <button onClick={() => handleSort(EOrderBy.Date)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Round
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Amount [POL]
              <button onClick={() => handleSort(EOrderBy.Amount)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Tokens
              <button onClick={() => handleSort(EOrderBy.Tokens)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Unlock Remaining
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Stream Details
            </div>
          </div>

          <div className='px-10'>
            {pageDonations.map(donation => (
              <div key={donation.id} className='flex justify-between'>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {formatDateMonthDayYear(donation.createdAt)}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {donation.earlyAccessRound
                    ? `Early access - Round ${donation.earlyAccessRound.roundNumber}`
                    : 'q/acc round'}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
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
                    <span className='text-xs font-medium text-[#A5ADBF]'>
                      $ {formatAmount(donation.amount * Number(POLPrice))}
                    </span>
                  </div>
                </div>
                <div className='p-[18px_4px] text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px] '>
                  {donation?.rewardTokenAmount
                    ? formatAmount(
                        Math.round(donation.rewardTokenAmount * 100) / 100,
                      ) +
                      ' ' +
                      donation.project.abc.tokenTicker
                    : '-'}
                </div>
                <div className='p-[18px_4px] text-[#1D1E1F] flex gap-2 text-start border-b w-full min-w-[150px]'>
                  {donation.rewardStreamStart
                    ? getDifferenceFromPeriod(
                        donation.rewardStreamStart,
                        donation.cliff / OneYearInMilliSecs,
                      )
                    : '-'}
                </div>
                <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
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

export default ProjectUserDonationTable;
