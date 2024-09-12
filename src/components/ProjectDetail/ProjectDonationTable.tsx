import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconSort } from '../Icons/IconSort';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { useProjectContext } from '@/context/project.context';
import { fecthProjectDonationsById } from '@/services/donation.services';

import { fetchTokenPrice } from '@/helpers/token';

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

const ProjectDonationTable = () => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { projectData, uniqueDonars, totalAmount } = useProjectContext();
  const [tokenPrice, setTokenPrice] = useState(1);
  // get project data from context
  const id = 19;
  const [order, setOrder] = useState<IOrder>({
    by: EOrderBy.CreationDate,
    direction: EDirection.DESC,
  });

  const [pageDonations, setPageDonations] = useState<any>();

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setTokenPrice(price);
    };

    fetchPrice();
  }, []);

  useEffect(() => {
    const fetchProjectDonations = async () => {
      const data = await fecthProjectDonationsById(
        parseInt(projectData?.id),
        itemPerPage,
        page * itemPerPage,
        { field: order.by, direction: order.direction },
      );

      if (data) {
        const { donations, totalCount } = data;
        setTotalCount(totalCount);
        setPageDonations(donations);
      }

      console.log(pageDonations, 'donations');
    };

    fetchProjectDonations();
  }, [page, projectData, itemPerPage, totalCount, order]);

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

  return (
    <div className='bg-white'>
      <div className=' container flex  flex-col py-10 gap-10'>
        <div>
          <h1 className='text-[#1D1E1F] text-[25px] font-bold border-b-2 pb-3'>
            All supporters
          </h1>
        </div>

        <div className='flex gap-10 lg:flex-row flex-col'>
          {totalCount === 0 ? (
            <div className='bg-white w-full h-[400px] flex items-center justify-center text-[25px] text-[#82899A] font-bold'>
              This project has not received any contributions.
            </div>
          ) : (
            <div className='flex flex-col w-full lg:w-3/4 font-redHatText overflow-x-auto '>
              <div className='flex justify-between  '>
                <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px] border-b-2'>
                  Supporter
                  {/* <button
              onClick={() => orderChangeHandler(EOrderBy.CreationDate)}
            >
              <IconSort size={16} />
            </button> */}
                </div>
                <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px] border-b-2'>
                  Date
                  <button
                    onClick={() => orderChangeHandler(EOrderBy.CreationDate)}
                  >
                    <IconSort size={16} />
                  </button>
                </div>
                <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px] border-b-2'>
                  Round
                  <button onClick={() => orderChangeHandler(EOrderBy.Round)}>
                    <IconSort size={16} />
                  </button>
                </div>
                <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px] border-b-2'>
                  Amount [POL]
                  <button onClick={() => orderChangeHandler(EOrderBy.Amount)}>
                    <IconSort size={16} />
                  </button>
                </div>
                <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px] border-b-2'>
                  Tokens
                  <button onClick={() => orderChangeHandler(EOrderBy.Reward)}>
                    <IconSort size={16} />
                  </button>
                </div>
              </div>

              <div className=' '>
                {pageDonations?.map((donation: any) => (
                  <div
                    key={donation.transactionId}
                    className=' flex justify-between '
                  >
                    <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                      {!donation.anonymous
                        ? donation?.user?.firstName +
                          ' ' +
                          donation?.user?.lastName
                        : 'Anoynomous'}
                    </div>
                    <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                      {new Date(donation.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          year: 'numeric',
                          month: 'short',
                        },
                      )}
                    </div>
                    <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                      {donation.earlyAccessRound
                        ? `Early window - Round ${donation.earlyAccessRound.roundNumber}`
                        : '---'}
                    </div>
                    <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                      <div className='flex flex-col'>
                        <div className='flex gap-1 items-center'>
                          <span className='font-medium'>{donation.amount}</span>
                          <Link
                            target='_blank'
                            href={`https://cardona-zkevm.polygonscan.com/tx/${donation.transactionId}`}
                          >
                            <IconViewTransaction size={16} color='#4F576A' />
                          </Link>
                        </div>

                        <span className='text-xs font-medium  text-[#A5ADBF]'>
                          ${' '}
                          {Math.round(donation.amount * tokenPrice * 100) / 100}
                        </span>
                      </div>
                    </div>
                    <div className='p-[18px_4px]  text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px]'>
                      {donation.rewardTokenAmount || '---'}
                      {'  '}
                      {projectData?.abc?.tokenTicker}
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
          )}

          {/* Donation Card */}
          <div className='w-full lg:w-1/4  p-6  gap-10 flex flex-col font-redHatText shadow-tabShadow rounded-lg h-fit'>
            <div className=' flex flex-col gap-2'>
              <div className='flex gap-2'>
                <IconTotalDonations />
                <span className='font-medium text-[#4F576A]'>
                  Total support
                </span>
              </div>

              <h1 className='text-[25px] text-[#1D1E1F] font-bold leading-[56px]'>
                {totalAmount} POL
              </h1>
              <h2 className='font-medium text-[#1D1E1F]'>
                ~ $ {Math.round(totalAmount * tokenPrice * 100) / 100}
              </h2>
            </div>

            <div className=' flex flex-col gap-4 font-redHatText'>
              {/* Total Donars */}
              <div className=' flex justify-between'>
                <div className='flex gap-2'>
                  <IconTotalDonars />
                  <span className='font-medium text-[#4F576A]'>
                    Total supporters
                  </span>
                </div>
                <span className='font-semibold'>{uniqueDonars}</span>
              </div>

              {/* Total Supply */}
              <div className='flex  flex-wrap  gap-2 justify-between'>
                <div className='flex gap-2'>
                  <IconTotalSupply />
                  <span className='font-medium text-[#4F576A]'>
                    Total Supply
                  </span>
                </div>

                <h3 className='font-medium text-[#1D1E1F]'>
                  {projectData?.abc?.totalSupply || '---'}{' '}
                  {projectData?.abc?.tokenTicker}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDonationTable;
