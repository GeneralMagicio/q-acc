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
      <span className='text-[#1D1E1F] font-medium text-lg font-redHatText'>
        {activeRoundDetails?.__typename === 'EarlyAccessRound'
          ? 'Early access - Round ' + activeRoundDetails?.roundNumber + ' of 4'
          : activeRoundDetails?.__typename === 'QfRound'
            ? 'q/acc Round'
            : 'No Active Round'}
      </span>
      <RemainingTime
        startDate={activeRoundDetails?.startDate}
        endDate={activeRoundDetails?.endDate}
      />
      <Link href={Routes.Projects}>
        <Button styleType={ButtonStyle.Solid} color={ButtonColor.Pink}>
          Support q/acc Projects
        </Button>
      </Link>
    </div>
  );
};
