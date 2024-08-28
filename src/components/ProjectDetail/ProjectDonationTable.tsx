import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { IconABC } from '../Icons/IconABC';
import { IconShare } from '../Icons/IconShare';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconSort } from '../Icons/IconSort';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { fecthProjectDonationsById } from '@/services/user.service';

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

  // get project data from context
  const id = 19;
  const [order, setOrder] = useState<IOrder>({
    by: EOrderBy.CreationDate,
    direction: EDirection.DESC,
  });

  const [pageDonations, setPageDonations] = useState<any>();

  useEffect(() => {
    const fetchProjectDonations = async () => {
      const data = await fecthProjectDonationsById(
        id,
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
  }, [page, id, itemPerPage, totalCount, order]);

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
    <div className='bg-white'>
      <div className=' container flex  flex-col py-10 gap-10'>
        <div>
          <h1 className='text-[#1D1E1F] text-[25px] font-bold border-b-2 pb-3'>
            All Donations
          </h1>
        </div>

        <div className='flex gap-10 lg:flex-row flex-col'>
          <div className='flex flex-col w-full lg:w-2/3 font-redHatText '>
            <div className='flex justify-between border-b-4 '>
              <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
                Donar
                {/* <button
                  onClick={() => orderChangeHandler(EOrderBy.CreationDate)}
                >
                  <IconSort size={16} />
                </button> */}
              </div>
              <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
                Donated On
                <button
                  onClick={() => orderChangeHandler(EOrderBy.CreationDate)}
                >
                  <IconSort size={16} />
                </button>
              </div>
              <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
                Round
                <button onClick={() => orderChangeHandler(EOrderBy.Round)}>
                  <IconSort size={16} />
                </button>
              </div>
              <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
                Amount [MATIC]
                <button onClick={() => orderChangeHandler(EOrderBy.Amount)}>
                  <IconSort size={16} />
                </button>
              </div>
              <div className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'>
                Reward Token
                <button onClick={() => orderChangeHandler(EOrderBy.Reward)}>
                  <IconSort size={16} />
                </button>
              </div>
            </div>

            <div className='overflow-x-auto '>
              {pageDonations?.map((donation: any) => (
                <>
                  <div className=' flex justify-between '>
                    <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                      {donation.user.firstName
                        ? donation.user.firstName
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
                      Early Bird
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

          <div className='w-full lg:w-1/4  p-6  gap-10 flex flex-col font-redHatText shadow-lg rounded-lg h-fit'>
            <div className=' flex flex-col gap-2'>
              <div className='flex gap-2'>
                <IconTotalDonations />
                <span className='font-medium text-[#4F576A]'>
                  Total Donations
                </span>
              </div>

              <h1 className='text-[41px] font-bold leading-[56px]'>
                $ 970,257
              </h1>
            </div>

            <div className=' flex flex-col gap-4'>
              {/* Total Supply */}
              <div>
                <div className='flex gap-2'>
                  <IconTotalSupply />
                  <span className='font-medium text-[#4F576A]'>
                    Total Supply
                  </span>
                </div>

                <h3 className='font-medium text-[#1D1E1F]'>
                  25,000,000,000 ABC
                </h3>
              </div>

              {/* Total Donars */}
              <div className=' flex justify-between'>
                <div className='flex gap-2'>
                  <IconTotalDonars />
                  <span className='font-medium text-[#4F576A]'>
                    Total donars
                  </span>
                </div>
                <span>{totalCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDonationTable;
