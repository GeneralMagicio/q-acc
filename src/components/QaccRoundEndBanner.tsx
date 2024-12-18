import React from 'react';
import { isAllocationDone } from '@/config/configuration';
import QaccRoundStats from './QaccRoundStats';

interface QaccRoundEndBannerProps {}
const QaccRoundEndBanner: React.FC<QaccRoundEndBannerProps> = ({}) => {
  return (
    <div className='flex  flex-col p-9 gap-9 mx-auto w-[80%] bg-[#F6F3FF] rounded-xl  justify-center z-40 mt-12'>
      <div className='flex flex-col gap-2 justify-center font-sans'>
        {isAllocationDone ? (
          <span className='text-center text-[#5326EC] font-bold text-[30px]'>
            🎉 Check your account for token allocation! 🎉
          </span>
        ) : (
          <>
            <span className='text-center text-[#5326EC] font-bold text-[30px]'>
              The q/acc round season 1 ended on Dec 20 🎉
            </span>
            <span className='text-[#5326EC] text-[16px] font-medium text-center'>
              Check back in the next 2 weeks to see your token allocation.
            </span>
          </>
        )}
      </div>

      <QaccRoundStats />
    </div>
  );
};

export default QaccRoundEndBanner;
