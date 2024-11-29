import React, { FC } from 'react';
import { Button, ButtonStyle, ButtonColor } from '../Button';
import links from '@/lib/constants/links';
import { IconExternalLink } from '../Icons/IconExternalLink';
import { IconGitcoin } from '../Icons/IconGitcoin';

interface IGitcoinLowProps {
  userGitcoinScore: number;
  isScoreFetching: boolean;
  onCheckScore: () => void;
}

export const GitcoinLow: FC<IGitcoinLowProps> = ({
  userGitcoinScore,
  isScoreFetching,
  onCheckScore,
}) => {
  return (
    <div className='bg-white my-2 rounded-xl p-4 text-base border-[1px] border-gray-200'>
      <div className='bg-gray-50 mt-2 rounded-xl p-4 text-base text-black flex items-center justify-between'>
        Your Passport Score
        <div className='bg-black text-white py-2 px-6 rounded-full'>
          {userGitcoinScore}
        </div>
      </div>
      <div className='flex gap-2 items-center justify-end mt-4'>
        <a href={links.PASSPORT} target='_blank' referrerPolicy='no-referrer'>
          <Button
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
            className=' shadow-GIV400'
          >
            <div className='flex items-center gap-1'>
              Increase Score to 15
              <IconExternalLink size={16} />
            </div>
          </Button>
        </a>
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
