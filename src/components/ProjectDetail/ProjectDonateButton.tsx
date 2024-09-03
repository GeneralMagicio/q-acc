import Link from 'next/link';
import React from 'react';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { IconABC } from '../Icons/IconABC';
import { useProjectContext } from '@/context/project.context';

const ProjectDonateButton = () => {
  const { projectData } = useProjectContext();
  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <div className='flex justify-start items-center gap-2 '>
        <IconABC />
        <span className='text-[#4F576A] font-medium'>ABC current value</span>
        {/* <IconInfo /> */}
      </div>
      <div className='flex items-center justify-between text-sm  text-[#82899A] '>
        <h1>
          <span className='text-[#1D1E1F] font-bold'>---</span> in POL
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
            Support
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectDonateButton;
