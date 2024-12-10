import React from 'react';
import useRemainingTime from '@/hooks/useRemainingTime';
import { OnBoardButton } from './OnBoardButton';
import config from '@/config/configuration';

interface QaccRoundEndBannerProps {}
const QaccRoundEndBanner: React.FC<QaccRoundEndBannerProps> = ({}) => {
  let isAllocationDone = config.isAllocationDone;
  return (
    <div className='flex px-10 py-4  mx-auto w-[80%]  border-4 bg-white  rounded-2xl justify-center z-40 mt-12'>
      <div className='flex flex-col gap-2 justify-center font-redHatText'>
        {isAllocationDone ? (
          <span className='text-center text-[#1D1E1F] font-bold text-lg'>
            🎉 Check your account for token allocation!
          </span>
        ) : (
          <>
            <span className='text-center text-[#1D1E1F] font-bold text-lg'>
              🎉 The q/acc round ended on Dec 20.{' '}
            </span>
            <span className='text-[#4F576A] text-[16px] font-medium'>
              Check back in the next 2 weeks to see your token allocation.
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default QaccRoundEndBanner;
