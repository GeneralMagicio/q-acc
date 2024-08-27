import Link from 'next/link';
import React from 'react';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { IconInfo } from '../Icons/IconInfo';
import { IconABC } from '../Icons/IconABC';

const ProjectDonateButton = () => {
  const PriceInfo = () => (
    <div className='flex flex-col'>
      <div className='flex justify-start items-center gap-2'>
        <IconABC />
        <span>PAN Price</span>
        <IconInfo />
      </div>
      <div className='flex items-center justify-between text-sm font-normal font-redHatText text-[#82899A] '>
        <span>--- in USD</span>
        <span>--- in MATIC</span>
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
        <Link id='Donate_Project' href={'/donate'}>
          <Button color={ButtonColor.Pink} className='w-full justify-center'>
            Donate
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectDonateButton;
