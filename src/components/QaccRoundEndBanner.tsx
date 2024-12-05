import React from 'react';
import useRemainingTime from '@/hooks/useRemainingTime';
import { OnBoardButton } from './OnBoardButton';

interface QaccRoundEndBannerProps {}
const QaccRoundEndBanner: React.FC<QaccRoundEndBannerProps> = ({}) => {
  const now = new Date();
  const remainingTime = useRemainingTime(
    now.toISOString(),
    '2024-11-25T12:00:00.000Z', // Currently set to start at 25th November
  );
  return (
    <div className='flex px-10 py-4  border-4 bg-white  rounded-2xl justify-center z-40 mt-12'>
      <div className='flex flex-col gap-2 justify-center font-redHatText'>
        <span className='text-center text-[#1D1E1F] font-bold text-lg'>
          🎉 The q/acc round ended on Dec 20.{' '}
        </span>
        <span className='text-[#4F576A] text-[16px] font-medium'>
          Check back in the next 2 weeks to see your token allocation.
        </span>
      </div>
    </div>
  );
};

export default QaccRoundEndBanner;
