import React from 'react';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchRoundDetails';
import useRemainingTime from '@/hooks/useRemainingTime';

interface RoundCountBannerProps {
  projectMaxedOut?: boolean;
}
const RoundCountBanner: React.FC<RoundCountBannerProps> = ({
  projectMaxedOut = false,
}) => {
  const { data: roundDetails, isLoading } = useFetchActiveRoundDetails();
  const remainingTime = useRemainingTime(roundDetails?.endDate);

  return (
    <div className='px-10 py-6  bg-white rounded-2xl shadow-baseShadow font-redHatText'>
      <div className='flex md:flex-row flex-col gap-6 md:justify-between items-center'>
        <span className='text-[#1D1E1F] font-medium text-lg'>
          Early access - Round {roundDetails?.roundNumber} of 4
        </span>
        <div className='flex flex-col md:flex-row items-center md:gap-6'>
          {projectMaxedOut ? (
            <span className='px-6 py-4 flex items-center justify-stretch bg-white shadow-baseShadow rounded-xl text-[#4F576A] font-bold text-2xl font-redHatText'>
              Project maxed out this round
            </span>
          ) : (
            <>
              <span className='text-[#4F576A] text-lg font-medium'>
                Remaining time
              </span>
              <div className='px-6 py-4 shadow-baseShadow rounded-xl'>
                <span className='text-[#5326EC] font-bold text-lg md:text-2xl '>
                  {isLoading ? '.......' : remainingTime}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoundCountBanner;
