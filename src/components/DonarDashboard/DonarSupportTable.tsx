import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconSort } from '../Icons/IconSort';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { useProjectContext } from '@/context/project.context';
import { fecthProjectDonationsById } from '@/services/donation.services';

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

const DonarSupportTable = () => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { projectData } = useProjectContext();

  const [order, setOrder] = useState<IOrder>({
    by: EOrderBy.CreationDate,
    direction: EDirection.DESC,
  });

  const [pageDonations, setPageDonations] = useState<any>();

  useEffect(() => {
    const fetchProjectDonations = async () => {
      const data = await fecthProjectDonationsById(
        parseInt('19'),
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

  if (totalCount === 0) {
    return (
      <div className='bg-white w-full h-[500px] flex items-center justify-center text-5xl'>
        No Donations Yet
      </div>
    );
  }

  return (
    <div className='container flex  flex-col py-10 md:px-6 gap-10'>
      <div>
        <h1 className='text-[#4F576A] text-[25px] font-bold border-b pb-2'>
          Your supports & rewards breakdown
        </h1>
      </div>
      <div className='flex justify-between p-4 bg-[#F7F7F9] items-center rounded-xl'>
        <div className='flex gap-2'>
          <IconTotalDonations size={32} />
          <h1 className='text-[#1D1E1F] md:text-[25px] font-bold '>
            All your supports
          </h1>
        </div>

        <div className='flex gap-2 text-[#1D1E1F] '>
          <h1 className='md:text-[25px] font-bold '>4,705 MATIC</h1>
          <span className='font-medium'>~ $ 2,255</span>
        </div>
      </div>

      <div className='flex gap-10 lg:flex-row flex-col '>
        <div className='flex flex-col w-full  font-redHatText overflow-x-auto'>
          <div className='flex justify-between px-10'>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-4  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Date
              <button onClick={() => orderChangeHandler(EOrderBy.CreationDate)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-4  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Round
              <button onClick={() => orderChangeHandler(EOrderBy.Round)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full border-b-4   font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Amount [MATIC]
              <button onClick={() => orderChangeHandler(EOrderBy.Amount)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-4  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Token
              <button onClick={() => orderChangeHandler(EOrderBy.Reward)}>
                <IconSort size={16} />
              </button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-4  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Unlock Remaining
              <button
                onClick={() => orderChangeHandler(EOrderBy.Reward)}
              ></button>
            </div>
            <div className='p-[8px_4px] flex gap-2 text-start w-full  border-b-4  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
              Stream Details
              <button
                onClick={() => orderChangeHandler(EOrderBy.Reward)}
              ></button>
            </div>
          </div>

          <div className='px-10'>
            {pageDonations?.map((donation: any) => (
              <>
                <div className=' flex justify-between '>
                  <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                    {new Date(donation.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'short',
                    })}
                  </div>
                  <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                    Early window - Round 1
                  </div>
                  <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1 items-center'>
                        <span className='font-medium'>{donation.amount}</span>
                        <IconViewTransaction size={16} />
                      </div>

                      <span className='text-xs font-medium  text-[#A5ADBF]'>
                        $ 233
                      </span>
                    </div>
                  </div>
                  <div className='p-[18px_4px]  text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px]'>
                    600 ABC
                  </div>
                  <div className='p-[18px_4px]  text-[#1D1E1F] font-medium flex gap-2 text-start border-b w-full min-w-[150px]'>
                    6 Months 14 Days
                  </div>
                  <div className='p-[18px_4px] flex gap-2 text-start  border-b w-full min-w-[150px]'>
                    <div className='flex flex-col'>
                      <div className='flex gap-1 items-center'>
                        <span className='font-medium'>Feb 24, 2024 End</span>
                      </div>

                      <span className='text-xs font-medium  text-[#A5ADBF]'>
                        Starts on Aug 30, 2024
                      </span>
                    </div>
                  </div>
                </div>
              </>
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

export default DonarSupportTable;
