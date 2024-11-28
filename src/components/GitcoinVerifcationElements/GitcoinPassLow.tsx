import React, { FC } from 'react';
import { Button, ButtonStyle, ButtonColor } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';
import { IconGitcoin } from '../Icons/IconGitcoin';
import { IconInfoCircle } from '../Icons/IconInfoCircle';
import config from '@/config/configuration';
import links from '@/lib/constants/links';
import { IconExternalLink } from '../Icons/IconExternalLink';

interface IGitcoinPassLowProps {
  userGitcoinScore: number;
  isScoreFetching: boolean;
  onCheckScore: () => void;
}

export const GitcoinPassLow: FC<IGitcoinPassLowProps> = ({
  userGitcoinScore,
  isScoreFetching,
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
        {EligibilityBadgeStatus.NOT_ELIGIBLE && (
          <a href={links.PASSPORT} target='_blank' referrerPolicy='no-referrer'>
            <Button
              styleType={ButtonStyle.Solid}
              color={ButtonColor.Pink}
              className='ml-auto mt-2'
            >
              <div className='flex items-center gap-1'>
                Increase Score
                <IconExternalLink size={16} />
              </div>
            </Button>
          </a>
        )}
      </div>
      <div className='flex justify-between items-center'>
        <div className='text-gray-800'>Passport connected</div>
        <Button
          styleType={ButtonStyle.Text}
          color={ButtonColor.Pink}
          className='shadow-GIV400'
          onClick={onCheckScore}
          loading={isScoreFetching}
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
