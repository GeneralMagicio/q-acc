import React from 'react';
import floor from 'lodash/floor';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { formatAmount } from '@/helpers/donation';

export const EligibilityCheckToast = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  let low_cap, high_cap;

  if (activeRoundDetails) {
    if (
      'roundUSDCapPerUserPerProjectWithGitcoinScoreOnly' in activeRoundDetails
    ) {
      low_cap =
        activeRoundDetails?.roundUSDCapPerUserPerProjectWithGitcoinScoreOnly ||
        1000 / activeRoundDetails?.tokenPrice;
    }

    high_cap =
      (activeRoundDetails?.roundUSDCapPerUserPerProject || 15000) /
      activeRoundDetails?.tokenPrice;
  }

  return (
    <div className='flex p-4 rounded-lg border-[1px] border-violet-500 bg-violet-50 gap-2 font-redHatText text-violet-500 flex-col'>
      <h1 className='font-medium'>Caps enable a fair launch!</h1>
      <p className='pb-2 '>
        Individual caps allow more people to participate in the important early
        stage of a project’s token economy. 
      </p>
      <p className='pb-2 '>
        <ul className='list-disc px-4'>
          <li>
            {' '}
            With <span className='font-bold'>Gitcoin Passport</span>, you are
            eligible to support each project with up to{' '}
            {formatAmount(floor(Number(low_cap)))} POL .
          </li>
          <li>
            With <span className='font-bold'>Privado zkID credentials</span>,
            you are eligible to support each project with up{' '}
            {formatAmount(floor(Number(high_cap)))} POL .
          </li>
        </ul>
      </p>
    </div>
  );
};
