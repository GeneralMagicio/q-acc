import React, { useEffect, useState } from 'react';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { Button, ButtonColor } from '../Button';
import RewardsBreakDown from './RewardsBreakDown';
import { IconMinted } from '../Icons/IconMinted';
import { IconLockedTokens } from '../Icons/IconLockedTokens';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';
import { IconBreakdownArrow } from '../Icons/IconBreakdownArrow';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { fetchUserDonations } from '@/services/donation.services';
import { getIpfsAddress } from '@/helpers/image';

const DonarSupports = () => {
  const [showBreakDown, setShowBreakDown] = useState<boolean>(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserDonations(userId);
        if (res) {
          setDonations(res.donations);
          setTotalCount(res.totalCount);
        }
      } catch (err) {
        setError('Failed to fetch donations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!showBreakDown) {
    return (
      <div className='container flex flex-col gap-10'>
        {donations.map(donation => (
          <div
            key={donation.id}
            className='p-6 flex lg:flex-row flex-col gap-14 bg-white rounded-xl shadow-lg'
          >
            {/* Project Details */}
            <div className='flex flex-col gap-10 w-full lg:w-1/2'>
              {/* Project Banner */}
              <div
                className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
                style={{
                  backgroundImage: `url('${donation.project.image}')`,
                }}
              >
                <div className=' flex flex-col absolute  bottom-[24px] left-[24px] md:bottom-[24px] md:left-[24px] gap-2'>
                  <div className='border rounded-md bg-white p-1 block w-fit'>
                    <img
                      className='w-6 h-6 rounded-full'
                      src={getIpfsAddress(
                        donation.project.abc?.icon! ||
                          'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                      )}
                    />
                  </div>
                  <div className='flex flex-col text-white gap-2'>
                    <h1 className='text-2xl md:text-[41px] font-bold leading-10'>
                      {donation.project.title}
                    </h1>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-4 font-redHatText'>
                <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl flex justify-center'>
                  <span className='flex gap-4 text-[#5326EC] font-bold'>
                    Project Contract Address{' '}
                    <IconViewTransaction color='#5326EC' />
                  </span>
                </div>

                <div className='flex justify-between p-2'>
                  <div className='flex gap-2'>
                    <IconTotalSupply size={24} />
                    <span className='text-[#4F576A] font-medium font-redHatText'>
                      Total Supply
                    </span>
                  </div>
                  <span className='font-medium text-[#1D1E1F]'>
                    {donation.project.abc.totalSupply || '-'}{' '}
                    {donation.project.abc.tokenName}
                  </span>
                </div>

                <div className='flex justify-between p-2'>
                  <div className='flex gap-2'>
                    <IconTotalDonars size={24} />
                    <span className='text-[#4F576A] font-medium  font-redHatText'>
                      Total supporters
                    </span>
                  </div>
                  {/*todo: give total donors of project*/}
                  <span className='font-medium text-[#1D1E1F]'>24</span>
                </div>

                <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
                  <div className='flex gap-2'>
                    <IconTotalDonations size={24} />
                    <span className='font-medium text-[#1D1E1F]'>
                      Total contributions
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    <span className='font-medium text-[#1D1E1F]'>
                      {donation.project.totalDonations} POL
                      {/*todo: calculate it as sum of donation amounts*/}
                    </span>
                    <span className='font-medium text-[#82899A]'>
                      ~ $ {donation.project.totalDonations}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Claim and Reward */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2  font-redHatText'>
              <div className='flex items-center gap-2'>
                <img
                  className='w-6 h-6 rounded-full'
                  src={getIpfsAddress(
                    donation.project.abc?.icon! ||
                      'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                  )}
                />
                <span className='text-[#4F576A] font-medium'>
                  {donation.project.abc.tokenName} current value
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    Bonding curves have a mint price and a burn price. This
                    shows the mint price.
                  </div>
                </div>
              </div>
              <div className='flex justify-between text-[#1D1E1F] font-medium'>
                <h2 className='flex gap-1 items-center'>
                  2.02 <span className='text-[#4F576A] text-xs pb-1'>POL</span>
                </h2>
                <h2 className='text-[#4F576A]'>$ 3.88</h2>
              </div>
              <hr />

              {/*todo: calculate it*/}
              <h1 className=' flex p-[4px_16px] bg-[#EBECF2]  w-fit rounded-md'>
                You support this project{' '}
                <span className='font-medium'>&nbsp;4&nbsp; </span>
                times.
              </h1>

              <div className='flex justify-between p-2 bg-[#F7F7F9] rounded-lg'>
                <div className='flex gap-2'>
                  <IconTotalDonations size={24} />
                  <span className='text-[#4F576A] font-medium '>
                    Your contribution
                  </span>
                </div>
                <span className='font-medium text-[#1D1E1F]'>
                  {donation.amount} POL
                </span>
              </div>

              <div className='flex justify-between p-2'>
                <div className='flex gap-2'>
                  <IconMinted size={24} />
                  <span className='text-[#4F576A] font-medium '>
                    Your project tokens{' '}
                  </span>
                </div>
                <div className='flex gap-1'>
                  <span className='font-medium text-[#1D1E1F]'>
                    {' '}
                    {donation.rewardTokenAmount || '-'}{' '}
                    {donation.project.abc.tokenName}
                  </span>
                  <span className='font-medium text-[#82899A]'>
                    ~ ${' '}
                    {donation.rewardTokenAmount *
                      donation.project.abc.tokenPrice || '-'}
                  </span>
                </div>
              </div>

              <div className='flex justify-between p-2'>
                <div className='flex gap-2'>
                  <IconLockedTokens size={24} />
                  <span className='text-[#4F576A] font-medium '>
                    Locked tokens
                  </span>
                </div>
                <div className='flex gap-1'>
                  {/*todo: calculate locked amount*/}
                  <span className='font-medium text-[#1D1E1F]'>
                    {donation.rewardTokenAmount || '-'}{' '}
                    {donation.project.abc.tokenName}
                  </span>
                  <span className='font-medium text-[#82899A]'>
                    ~ ${' '}
                    {donation.rewardTokenAmount *
                      donation.project.abc.tokenPrice || '-'}
                  </span>
                </div>
              </div>

              <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#EBECF2] rounded-md'>
                <div className='flex gap-2'>
                  <IconAvailableTokens size={24} />
                  <span className='font-medium text-[#1D1E1F]'>
                    Available to claim
                  </span>
                </div>
                {/*todo: calculate this*/}
                <div className='flex gap-1 font-medium text-[#1D1E1F]'>
                  <span>1,637,000 POL</span>
                  <span>~ $ 680,345</span>
                </div>
              </div>

              {/* Claim Rewards */}
              <Button color={ButtonColor.Giv} className='flex justify-center '>
                Claim Tokens
              </Button>
              <Button
                color={ButtonColor.Base}
                className='flex justify-center shadow-lg '
                onClick={() => setShowBreakDown(true)}
              >
                Tokens & Contributions Breakdown <IconBreakdownArrow />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <div className='bg-white container p-6 rounded-2xl flex items-center gap-3'>
          <button onClick={() => setShowBreakDown(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
            >
              <path
                d='M25.3332 15.9993H6.6665M6.6665 15.9993L15.9998 25.3327M6.6665 15.9993L15.9998 6.66602'
                stroke='#030823'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <h1 className='text-[#1D1E1F] text-lg font-bold'>Go Back</h1>
        </div>
        <RewardsBreakDown />
      </>
    );
  }
};

export default DonarSupports;
