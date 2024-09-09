import Link from 'next/link';
import React from 'react';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { IconABC } from '../Icons/IconABC';
import { useProjectContext } from '@/context/project.context';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';

const ProjectDonateButton = () => {
  const { projectData } = useProjectContext();
  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <div className='flex justify-start items-center gap-2 '>
        <IconABC />
        <div className='flex gap-2 items-center'>
          <span className='text-[#4F576A] font-medium'>ABC current value</span>
          <div className='relative group'>
            <IconTokenSchedule />
            <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
              <h3 className='font-bold'>ABC Current Value</h3>
              Bonding curves have a mint price and a burn price. This shows the
              mint price.
            </div>
          </div>
        </div>

        {/* <IconInfo /> */}
      </div>
      <div className='flex items-center  text-sm  gap-2 text-[#82899A] '>
        <h1 className=' w-[200px] p-2 bg-[#F7F7F9] rounded-lg'>
          <span className='text-[#1D1E1F] font-medium'>230</span>
          <span className='text-[#4F576A] text-xs '> POL</span>
        </h1>
        <span className='text-[#4F576A] font-medium'>$ ---</span>
      </div>
    </div>
  );
  let currentState = 'early';
  return (
    <div className='flex flex-col gap-4'>
      {PriceInfo()}
      {currentState === EDonationCardStates.beforeFirstRound ? (
        <Button
          color={ButtonColor.Pink}
          className='w-full justify-center opacity-50 cursor-not-allowed'
        >
          Starting Soon
        </Button>
      ) : (
        <Link id='Donate_Project' href={`/donate/${projectData.slug}`}>
          <Button color={ButtonColor.Pink} className='w-full justify-center'>
            Support This Project
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectDonateButton;
