import React from 'react';
import Link from 'next/link';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { RemainingTime } from './RemainingTime';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import Routes from '@/lib/constants/Routes';

export const RoundInfoSupporter = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  return (
    <div className='py-6 px-8 rounded-2xl shadow-GIV400 flex items-center justify-between bg-white z-1 relative'>
      <div className='text-gray-900 font-medium'>
        <div className='text-lg'>Early access</div>
        <div className='text-2xl'>
          Round {activeRoundDetails?.roundNumber} of 4
        </div>
      </div>
      <RemainingTime endDate={activeRoundDetails?.endDate} />
      <Link href={Routes.Projects}>
        <Button styleType={ButtonStyle.Solid} color={ButtonColor.Pink}>
          Support q/acc Projects
        </Button>
      </Link>
    </div>
  );
};
