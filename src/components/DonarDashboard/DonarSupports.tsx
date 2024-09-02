import React, { useState } from 'react';
import { IconABC } from '../Icons/IconABC';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { Button, ButtonColor } from '../Button';
import RewardsBreakDown from './RewardsBreakDown';
import { IconMinted } from '../Icons/IconMinted';
import { IconLockedTokens } from '../Icons/IconLockedTokens';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';

const DonarSupports = () => {
  const [showBreakDown, setShowBreakDown] = useState<boolean>(true);

  const data = [
    {
      type: 'FACEBOOK',
      link: 'https://www.facebook.com/globalecovillagenetwork.ua',
    },
    {
      type: 'INSTAGRAM',
      link: 'https://www.instagram.com/gen_ukraine/',
    },
    {
      type: 'YOUTUBE',
      link: 'https://www.youtube.com/channel/UCwxI6So5TBExWxsHFmNjtDg',
    },
  ];

  if (!showBreakDown) {
    return (
      <div className='container flex flex-col gap-10'>
        {data.map((item, index) => (
          <div
            key={index}
            className='p-6 flex  lg:flex-row flex-col gap-14 bg-white  rounded-xl '
          >
            {/* Project Details */}
            <div className='flex flex-col gap-10 w-full lg:w-1/2 '>
              {/* Project Banner */}
              <div
                className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
                style={{
                  backgroundImage:
                    "url('https://giveth.mypinata.cloud/ipfs/QmcQFkNQ3o6f555whoRtFqJgPz6k9nb8WfNEBHk3j2i3CW')",
                }}
              >
                <div className=' flex flex-col absolute  bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2'>
                  <div className='border rounded-md bg-white p-1 block w-fit'>
                    <IconABC size={40} />
                  </div>
                  <div className='flex flex-col text-white gap-2'>
                    <h1 className='text-2xl md:text-[41px]  font-bold leading-10'>
                      The amazing Pancake project
                    </h1>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-4 font-redHatText'>
                <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl  flex justify-center'>
                  <span className='flex gap-4 text-[#5326EC]  font-bold'>
                    Project Contract address{' '}
                    <IconViewTransaction color='#5326EC' />
                  </span>
                </div>

                <div className='flex justify-between p-2'>
                  <div className='flex gap-2'>
                    <IconTotalDonars size={24} />
                    <span>Total Supporters</span>
                  </div>
                  <span className='font-medium text-[#1D1E1F]'>24</span>
                </div>

                <div className='flex justify-between p-2'>
                  <div className='flex gap-2'>
                    <IconTotalSupply size={24} />
                    <span>Total Supply</span>
                  </div>
                  <span className='font-medium text-[#1D1E1F]'>
                    25,000,000,000 ABC
                  </span>
                </div>

                <div className='flex  flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
                  <div className='flex gap-2'>
                    <IconTotalDonations size={24} />
                    <span className='font-medium text-[#1D1E1F]'>
                      Total supports
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    <span className='font-medium text-[#1D1E1F]'>
                      1,637,000 POL
                    </span>
                    <span className='font-medium text-[#82899A]'>
                      ~ $ 680,345
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Claim and Reward */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2  font-redHatText'>
              <div className='flex - gap-2'>
                <IconABC size={24} />
                <span className='text-[#4F576A] font-medium'>
                  ABC current value
                </span>
              </div>
              <div className='flex justify-between text-[#1D1E1F] font-medium'>
                <h2>
                  2.02 <span className='text-[#4F576A] text-xs'>in POL</span>
                </h2>
                <h2>
                  3.88 <span className='text-[#4F576A] text-xs'>in USD</span>
                </h2>
              </div>
              <hr />

              <h1 className=' flex p-[4px_16px] bg-[#EBECF2]  w-fit rounded-md'>
                You support this project{' '}
                <span className='font-medium'>&nbsp;4&nbsp; </span>
                time.
              </h1>

              <div className='flex justify-between p-2 bg-[#F7F7F9] rounded-lg'>
                <div className='flex gap-2'>
                  <IconTotalDonations size={24} />
                  <span>Your support</span>
                </div>
                <span className='font-medium text-[#1D1E1F]'>4,705.94 POL</span>
              </div>

              <div className='flex justify-between p-2'>
                <div className='flex gap-2'>
                  <IconMinted size={24} />
                  <span>Your project tokens </span>
                </div>
                <div className='flex gap-1'>
                  <span className='font-medium text-[#1D1E1F]'>2500 ABC</span>
                  <span className='font-medium text-[#82899A]'>
                    ~ $ 7,900.45
                  </span>
                </div>
              </div>

              <div className='flex justify-between p-2'>
                <div className='flex gap-2'>
                  <IconLockedTokens size={24} />
                  <span>Locked tokens</span>
                </div>
                <div className='flex gap-1'>
                  <span className='font-medium text-[#1D1E1F]'>800 ABC</span>
                  <span className='font-medium text-[#82899A]'>
                    ~ $ 2,520.57
                  </span>
                </div>
              </div>

              <div className='flex  flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#EBECF2] rounded-md'>
                <div className='flex gap-2'>
                  <IconAvailableTokens size={24} />
                  <span className='font-medium text-[#1D1E1F]'>
                    Available to claim
                  </span>
                </div>
                <div className='flex gap-1 font-medium text-[#1D1E1F]'>
                  <span>1,637,000 POL</span>
                  <span>~ $ 680,345</span>
                </div>
              </div>

              {/* Claim Rewards */}
              <Button color={ButtonColor.Giv} className='flex justify-center '>
                Claim Rewards
              </Button>
              <Button
                color={ButtonColor.Base}
                className='flex justify-center shadow-lg '
                onClick={() => setShowBreakDown(true)}
              >
                Supports & Rewards Breakdown
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <div className='bg-white container  p-6 rounded-2xl flex items-center gap-3'>
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
