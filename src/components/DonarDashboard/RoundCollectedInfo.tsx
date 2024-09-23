import type { FC } from 'react';

interface IRoundCollectedInfoProps {
  info: any;
  currentRound?: boolean;
}

export const RoundCollectedInfo: FC<IRoundCollectedInfoProps> = ({
  info,
  currentRound,
}) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg py-6 px-4 flex items-stretch justify-between ${currentRound && 'border-giv-500 border'}`}
    >
      <div className='flex flex-col justify-between'>
        <h3 className='text-base font-semibold text-gray-800'>
          Early Access - Round 4
        </h3>
        <div className='flex gap-4'>
          <p className='text-gray-500 text-sm'>Start date</p>
          <p className='text-gray-800 text-sm'>20th August 2021</p>
          <p className='text-gray-500 text-sm'>End date</p>
          <p className='text-gray-800 text-sm'>20th August 2021</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-2'>
        <div className='flex text-xs font-medium items-center justify-between'>
          <div>37% Collected</div>
          <div className='flex gap-2 items-center'>
            <span className='text-gray-400'>Total</span>
            <span className='text-base'>4,652,192 POL</span>
          </div>
        </div>
        <div className='w-80 h-2 bg-gray-200 rounded-lg overflow-hidden'>
          <div
            className={`h-full ${currentRound ? 'bg-giv-500' : 'bg-gray-500'}`}
            style={{ width: '37%' }}
          ></div>
        </div>
        <div className='flex gap-2 items-center self-end'>
          <div className='text-xs text-gray-500'>Round Cap</div>
          <span className='text-base'>9,999,999 POL</span>
          <div className='text-xs text-gray-500'>$ 526</div>
        </div>
      </div>
    </div>
  );
};
