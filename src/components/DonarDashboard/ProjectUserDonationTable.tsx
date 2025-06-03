import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
import { IconSort } from '../Icons/IconSort';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { fetchProjectDonors } from '@/services/donation.services';
import {
  addCliff,
  formatDateMonthDayYear,
  getDifferenceFromPeriod,
  OneYearInMilliSecs,
} from '@/helpers/date';
import { formatAmount } from '@/helpers/donation';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import config from '@/config/configuration';
import { IProject } from '@/types/project.type';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import { CHAIN_IMAGES, fetchUSDPrices } from '@/helpers/squidTransactions';
import { POLYGON_POS_CHAIN_IMAGE } from '../DonatePage/SelectChainModal';
import { Spinner } from '../Loading/Spinner';

interface ProjectUserDonationTableProps {
  userId: number;
  project: IProject;
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

const getStatusClassesBadges = (status: string) => {
  if (status === 'pending' || status === 'swap_pending')
    return 'bg-[#FFFBEF] text-[#EA960D] border-[#FFEAB5]';
  if (status === 'failed')
    return 'bg-[#FFD6D0] text-[#C71D06] border-[#FFB3A9]';
  return 'bg-gray-200 text-gray-800 border-gray-500';
};

const getStatusClassesAmount = (status: string) => {
  if (status === 'pending' || status === 'swap_pending')
    return ' text-[#EA960D] font-medium';
  if (status === 'failed') return ' text-[#C71D06] font-medium';
  return 'text-[#1D1E1F]';
};

const ProjectUserDonationTable: React.FC<ProjectUserDonationTableProps> = ({
  userId,
  project,
  totalContributions,
}) => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageDonations, setPageDonations] = useState<any[]>([]);
  const { data: POLPrice } = useFetchTokenPrice();
  const [usdPrices, setUsdPrices] = useState<any>({});
  const [usdPricesLoading, setUsdPricesLoading] = useState(false);

  const [order, setOrder] = useState<{ by: EOrderBy; direction: EDirection }>({
    by: EOrderBy.Date,
    direction: EDirection.DESC,
  });
  const { data: isSafeAccount } = useCheckSafeAccount();

  useEffect(() => {
    const fetchUserDonationData = async () => {
      // const data = await fetchUserDonations(userId);
      const donationsByProjectId = await fetchProjectDonors(
        Number(project?.id),
        1000,
      );
      const userDonations = donationsByProjectId?.donations.filter(
        (donation: any) => donation.user.id == userId,
      );
      if (userDonations) {
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
  }, [userId, project?.id, page, order]);

  useEffect(() => {
    const uniqueTokens = Array.from(
      new Set(
        pageDonations
          ?.map((donation: any) => {
            const chainId = donation.swapTransaction?.fromChainId;
            const tokenAddress = donation.swapTransaction?.fromTokenAddress;
            // Ensure both values exist before adding to the set
            return chainId && tokenAddress
              ? `${chainId}-${tokenAddress}`
              : null;
          })
          .filter(Boolean), // Remove null/undefined values
      ),
    ).map((key: any) => {
      const [chainId, tokenAddress] = key.split('-');
      return { chainId: Number(chainId), tokenAddress };
    });

    const getPrices = async () => {
      setUsdPricesLoading(true);
      const prices = await fetchUSDPrices(uniqueTokens);
      setUsdPrices(prices);
      setUsdPricesLoading(false);
    };
    getPrices();
  }, [pageDonations]);

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
        <div className='flex gap-2 text-[#1D1E1F] justify-center items-center '>
          <h1 className='md:text-[24px] font-bold '>
            ~ $ {formatAmount(totalContributions * Number(POLPrice))}
          </h1>
          <span className='font-medium'>
            {formatAmount(totalContributions)} POL
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
            {/* <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Round
            </div> */}
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-2 font-medium text-[#1D1E1F] items-center min-w-[250px]'>
              Amount
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
            {pageDonations.map(donation => {
              const tokenKey =
                donation.swapTransaction?.fromChainId +
                `-` +
                donation.swapTransaction?.fromTokenAddress;
              const tokenData = usdPrices[tokenKey] || {};
              const tokenUsdPrice = tokenData.usdPrice || Number(POLPrice);
              const tokenImageUrl =
                tokenData.imageUrl || POLYGON_POS_CHAIN_IMAGE;
              return (
                <div key={donation.id} className='flex justify-between'>
                  <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
                    <div className='flex   items-center gap-2 flex-wrap'>
                      {formatDateMonthDayYear(donation.createdAt)}
                      {donation?.qfRound?.seasonNumber && (
                        <span className='px-2 py-[2px] border-2 border-[#EBECF2] bg-[#F7F7F9] rounded-3xl text-xs text-[1D1E1F] font-medium leading-4'>
                          Season {donation.qfRound.seasonNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* <div className='p-[18px_4px] flex gap-2 text-start border-b w-full min-w-[150px]'>
    {isSafeAccount
      ? 'Early access'
      : donation.earlyAccessRound
        ? `Early access - Round ${donation.earlyAccessRound.roundNumber}`
        : 'q/acc round'}
  </div> */}
                  <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[250px]'>
                    <div className='flex gap-1 items-center'>
                      <div>
                        <div className='flex relative px-2'>
                          <div className='flex items-center'>
                            <div className='w-6 h-6  absolute right-6 p-[4px] bg-[#fff] rounded-full shadow-baseShadow'>
                              <img
                                className='rounded-full  w-full'
                                src={
                                  CHAIN_IMAGES[
                                    donation.swapTransaction?.fromChainId
                                  ] || POLYGON_POS_CHAIN_IMAGE
                                }
                                alt='From Chain  Logo'
                              />
                            </div>
                            <div className='w-6 h-6 z-10 p-[4px] bg-[#fff] rounded-full shadow-baseShadow'>
                              <img
                                className='rounded-full  w-full'
                                src={tokenImageUrl}
                                alt='To Chain Logo'
                                width={16}
                                height={16}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex flex-wrap items-center  gap-2 ${getStatusClassesAmount(donation.status)}`}
                      >
                        <div className='flex flex-col'>
                          <div className='flex gap-1 items-center flex-wrap'>
                            <span className='font-medium'>
                              {donation.fromTokenAmount
                                ? formatAmount(donation.fromTokenAmount)
                                : formatAmount(donation.amount)}
                            </span>
                            <span
                              className={`text-[#1D1E1F] text-xs align-top font-medium ${getStatusClassesAmount(donation.status)} `}
                            >
                              {donation.swapTransaction?.fromTokenSymbol ||
                                'POL'}
                            </span>
                            <Link
                              target='_blank'
                              href={`${config.SCAN_URL}/tx/${donation.transactionId}`}
                            >
                              <IconViewTransaction
                                size={16}
                                color={`${donation.status === 'failed' ? '#C71D06' : donation.status === 'pending' || donation.status === 'swap_pending' ? '#EA960D' : '#4F576A'}`}
                              />
                            </Link>
                          </div>

                          <span
                            className={`text-xs font-medium  text-[#A5ADBF] ${getStatusClassesAmount(donation.status)}`}
                          >
                            {usdPricesLoading ? (
                              <Spinner size={10} />
                            ) : (
                              <>
                                {donation.isSwap
                                  ? formatAmount(donation.amount) + ' POL'
                                  : ''}
                              </>
                            )}
                          </span>
                        </div>
                        {donation.status !== 'verified' && (
                          <span
                            className={`px-2 py-[2px] border-2  font-medium text-xs rounded-[50px] capitalize flex items-center ${getStatusClassesBadges(donation.status)}`}
                          >
                            {donation.status === 'pending' ||
                            donation.status === 'swap_pending' ? (
                              'Pending'
                            ) : (
                              <span>{donation.status}</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='p-[18px_4px] text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px] '>
                    {donation?.rewardTokenAmount
                      ? formatAmount(
                          Math.round(donation.rewardTokenAmount * 100) / 100,
                        ) +
                        ' ' +
                        project?.abc?.tokenTicker
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
                          {addCliff(donation.rewardStreamStart, donation.cliff)}
                        </span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              );
            })}
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
