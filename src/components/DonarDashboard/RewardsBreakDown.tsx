import React from 'react';
import { IconABC } from '../Icons/IconABC';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import DonarSupportTable from './DonarSupportTable';
import { Button, ButtonColor } from '../Button';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';
import { IconLockedTokens } from '../Icons/IconLockedTokens';
import { IconMinted } from '../Icons/IconMinted';

const RewardsBreakDown = () => {
  // window.scrollTo(0, 0);
  return (
    <>
      <div className='container flex flex-col gap-8 my-8 '>
        <div className='p-6 flex lg:flex-row flex-col bg-white rounded-lg gap-14'>
          {/* Project Banner */}
          <div
            className='lg:w-1/2  w-full h-[251px] bg-cover bg-center rounded-3xl relative'
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

          {/* Project Info */}
          <div className='flex flex-col gap-4 font-redHatText lg:w-1/2 w-full'>
            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconTotalSupply size={24} />
                <span className='text-[#4F576A] font-medium'>Total supply</span>
              </div>
              <span className='font-medium text-[#1D1E1F]'>
                25,000,000,000 ABC
              </span>
            </div>

            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconTotalDonars size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Total supporters
                </span>
              </div>
              <span className='font-medium text-[#1D1E1F]'>24</span>
            </div>

            <div className='flex  flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
              <div className='flex gap-2'>
                <IconTotalDonations size={24} />
                <span className='font-medium text-[#1D1E1F]'>
                  Total contributions
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  1,637,000 POL
                </span>
                <span className='font-medium text-[#82899A]'>~ $ 680,345</span>
              </div>
            </div>

            <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl  flex justify-center'>
              <span className='flex gap-4 text-[#5326EC]  font-bold'>
                Project Contract address <IconViewTransaction color='#5326EC' />
              </span>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl flex flex-col gap-8 md:p-6'>
          <DonarSupportTable />

          {/* Project Claim Rewards */}
          <div className='flex flex-col gap-4 font-redHatText  w-full p-8 border rounded-xl'>
            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconMinted size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Total tokens received
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>2500 ABC</span>
                <span className='font-medium text-[#82899A]'>~ $ 7,900</span>
              </div>
            </div>

            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconLockedTokens size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Locked tokens
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>800 ABC</span>
                <span className='font-medium text-[#82899A]'>~ $ 2,520.57</span>
              </div>
            </div>

            <div className='flex  flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
              <div className='flex gap-2 items-center'>
                <IconAvailableTokens size={32} />
                <span className='font-medium text-[#1D1E1F] text-2xl'>
                  Available to claim
                </span>
              </div>
              <div className='flex gap-1 items-center font-medium text-[#1D1E1F] '>
                <span className='text-2xl'>17000 ABC</span>
                <span>~ $ 5,355</span>
              </div>
            </div>

            <Button color={ButtonColor.Giv} className='flex justify-center '>
              Claim Tokens
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardsBreakDown;
