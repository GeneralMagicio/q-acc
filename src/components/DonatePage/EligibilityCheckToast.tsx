import React from 'react';
import config from '@/config/configuration';

export const EligibilityCheckToast = () => {
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
            eligible to support each project with up to {config.LOW_CAP_TEXT}.
          </li>
          <li>
            With <span className='font-bold'>Privado zkID credentials</span>,
            you are eligible to support each project with up{' '}
            {config.HIGH_CAP_TEXT}.
          </li>
        </ul>
      </p>
    </div>
  );
};
