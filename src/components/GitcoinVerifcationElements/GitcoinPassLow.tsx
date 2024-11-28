import React, { FC } from 'react';
import { Button, ButtonStyle, ButtonColor } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';
import { IconGitcoin } from '../Icons/IconGitcoin';
import { IconInfoCircle } from '../Icons/IconInfoCircle';
import config from '@/config/configuration';

interface IGitcoinPassLowProps {
  userGitcoinScore: number;
  onCheckScore: () => void;
}

export const GitcoinPassLow: FC<IGitcoinPassLowProps> = ({
  userGitcoinScore,
  onCheckScore,
}) => {
  return (
    <div className='flex flex-col'>
      <EligibilityBadge
        status={
          userGitcoinScore > config.GP_SCORER_SCORE_THRESHOLD
            ? EligibilityBadgeStatus.ELIGIBLE
            : EligibilityBadgeStatus.NOT_ELIGIBLE
        }
        className='block ml-auto'
      />
      <div className='bg-white my-2 rounded-xl p-4 text-base border-[1px] border-gray-200'>
        <div className='flex gap-2 text-gray-500 items-center'>
          <IconInfoCircle size={24} />
          <div className='text-xs'>Required Passport score to be eligible</div>
          <div>
            {' >'}
            {config.GP_SCORER_SCORE_THRESHOLD}
          </div>
        </div>
        <div className='bg-gray-50 mt-2 rounded-xl p-4 text-base text-black flex items-center justify-between'>
          Your Passport Score
          <div className='bg-black text-white py-2 px-6 rounded-full'>
            {userGitcoinScore}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='text-gray-800'>Passport connected</div>
        <Button
          styleType={ButtonStyle.Text}
          color={ButtonColor.Pink}
          className='shadow-GIV400'
          onClick={onCheckScore}
        >
          <div className='flex gap-2'>
            <IconGitcoin size={16} />
            Refresh Score
          </div>
        </Button>
      </div>
    </div>
  );
};
