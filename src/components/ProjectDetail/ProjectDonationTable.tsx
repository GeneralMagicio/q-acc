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

const itemPerPage = 10;

const ProjectDonationTable = () => {
  const [page, setPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const id = 1;
  const tempPageDonations = {
    donations: [
      {
        id: '1',
        createdAt: '2024-08-26T10:00:00Z',
        donationType: 'REGULAR',
        anonymous: false,
        user: {
          id: 'user-1',
          name: 'John Doe',
          profilePicture: 'https://example.com/john-doe.jpg',
        },
        status: 'Completed',
        transactionNetworkId: 1,
        chainType: 'Ethereum',
        amount: '100.00',
        currency: 'ETH',
        transactionId:
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        valueUsd: '250.00',
      },
      {
        id: '2',
        createdAt: '2024-08-25T09:30:00Z',
        donationType: 'POIGNART',
        anonymous: true,
        user: null,
        status: 'Pending',
        transactionNetworkId: 137,
        chainType: 'Polygon',
        amount: '200.00',
        currency: 'MATIC',
        transactionId:
          '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
        valueUsd: '150.00',
      },
      {
        id: '3',
        createdAt: '2024-08-24T15:20:00Z',
        donationType: 'REGULAR',
        anonymous: false,
        user: {
          id: 'user-2',
          name: 'Jane Smith',
          profilePicture: 'https://example.com/jane-smith.jpg',
        },
        status: 'Completed',
        transactionNetworkId: 1,
        chainType: 'Ethereum',
        amount: '50.00',
        currency: 'ETH',
        transactionId:
          '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        valueUsd: '125.00',
      },
      {
        id: '4',
        createdAt: '2024-08-23T08:10:00Z',
        donationType: 'REGULAR',
        anonymous: true,
        user: null,
        status: 'Failed',
        transactionNetworkId: 56,
        chainType: 'BinanceSmartChain',
        amount: '300.00',
        currency: 'BNB',
        transactionId:
          '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
        valueUsd: '180.00',
      },
      {
        id: '5',
        createdAt: '2024-08-22T11:45:00Z',
        donationType: 'REGULAR',
        anonymous: false,
        user: {
          id: 'user-3',
          name: 'Michael Brown',
          profilePicture: 'https://example.com/michael-brown.jpg',
        },
        status: 'Completed',
        transactionNetworkId: 137,
        chainType: 'Polygon',
        amount: '75.00',
        currency: 'MATIC',
        transactionId:
          '0x123456abcdef123456abcdef123456abcdef123456abcdef123456abcdef123456',
        valueUsd: '95.00',
      },
    ],
  };

  const [pageDonations, setPageDonations] = useState<any>(tempPageDonations);

  useEffect(() => {
    const fetchProjectDonations = async () => {
      const data = await fecthProjectDonationsById(
        id,
        itemPerPage,
        page * itemPerPage,
      );

      const { donations, totalCount } = data;
      // setPageDonations(donations);

      console.log('DONATOPSN', data, donations, totalCount);
    };

    const temp = {
      donations: [
        {
          id: '1',
          createdAt: '2024-08-26T10:00:00Z',
          donationType: 'REGULAR',
          anonymous: false,
          user: {
            id: 'user-1',
            name: 'LOVEL GEORGE',
            profilePicture: 'https://example.com/john-doe.jpg',
          },
          status: 'Completed',
          transactionNetworkId: 1,
          chainType: 'Ethereum',
          amount: '100.00',
          currency: 'ETH',
          transactionId:
            '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          valueUsd: '250.00',
        },
        {
          id: '2',
          createdAt: '2024-08-25T09:30:00Z',
          donationType: 'POIGNART',
          anonymous: true,
          user: null,
          status: 'Pending',
          transactionNetworkId: 137,
          chainType: 'Polygon',
          amount: '200.00',
          currency: 'MATIC',
          transactionId:
            '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
          valueUsd: '150.00',
        },
        {
          id: '3',
          createdAt: '2024-08-24T15:20:00Z',
          donationType: 'REGULAR',
          anonymous: false,
          user: {
            id: 'user-2',
            name: 'Jane Smith',
            profilePicture: 'https://example.com/jane-smith.jpg',
          },
          status: 'Completed',
          transactionNetworkId: 1,
          chainType: 'Ethereum',
          amount: '50.00',
          currency: 'ETH',
          transactionId:
            '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          valueUsd: '125.00',
        },
        {
          id: '4',
          createdAt: '2024-08-23T08:10:00Z',
          donationType: 'REGULAR',
          anonymous: true,
          user: null,
          status: 'Failed',
          transactionNetworkId: 56,
          chainType: 'BinanceSmartChain',
          amount: '300.00',
          currency: 'BNB',
          transactionId:
            '0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef',
          valueUsd: '180.00',
        },
        {
          id: '5',
          createdAt: '2024-08-22T11:45:00Z',
          donationType: 'REGULAR',
          anonymous: false,
          user: {
            id: 'user-3',
            name: 'Michael Brown',
            profilePicture: 'https://example.com/michael-brown.jpg',
          },
          status: 'Completed',
          transactionNetworkId: 137,
          chainType: 'Polygon',
          amount: '75.00',
          currency: 'MATIC',
          transactionId:
            '0x123456abcdef123456abcdef123456abcdef123456abcdef123456abcdef123456',
          valueUsd: '95.00',
        },
      ],
    };
    setPageDonations(temp);
    fetchProjectDonations();
    console.log('PAGE', page);
  }, [page, id, itemPerPage]);
  const orderChangeHandler = (header: any) => {
    console.log('s');
  };

  const rowHeaders = [
    'Donor',
    'Donated On',
    'Round',
    'Amount [MATIC]',
    'Reward Token',
  ];

  // if (totalCount === 0) {
  //   return null;
  // }

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
              {rowHeaders.map((rowHeader, index) => (
                <div
                  key={index}
                  className='p-[8px_4px] flex gap-2 text-start w-full  font-medium text-[#1D1E1F] items-center min-w-[150px]'
                >
                  {rowHeader}
                  <button onClick={() => orderChangeHandler(rowHeader)}>
                    <IconSort size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className='overflow-x-auto '>
              {pageDonations.donations.map((donation: any) => (
                <>
                  <div className=' flex justify-between '>
                    <div className='p-[18px_4px] flex gap-2 text-start  w-full border-b min-w-[150px]'>
                      {donation.user ? donation.user.name : 'Anonymous'}
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
                totalCount={30}
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
                <span>24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDonationTable;
