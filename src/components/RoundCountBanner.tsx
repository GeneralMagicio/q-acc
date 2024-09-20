import { useFetchRoundDetails } from '@/hooks/useFetchRoundDetails';
import React, { useEffect, useState } from 'react';

const RoundCountBanner = () => {
  const { data: roundDetails, isLoading } = useFetchRoundDetails();
  console.log(roundDetails);
  const [timeRemaining, setTimeRemaining] = useState('');
  useEffect(() => {
    if (roundDetails) {
      const startDate: any = new Date();
      const updatedAt: any = new Date(roundDetails.endDate);
      const diffInMilliseconds: any = updatedAt - startDate;

      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
      );

      const formattedDifference = `${days} days , ${hours} hours , ${minutes} min`;
      setTimeRemaining(formattedDifference);
    }
  }, [roundDetails]);
  return (
    <div className='my-[60px] px-10 py-6  bg-white rounded-2xl shadow-baseShadow font-redHatText'>
      <div className='flex md:flex-row flex-col gap-6 md:justify-between items-center'>
        <span className='text-[#1D1E1F] font-medium text-lg'>
          Early access - Round {roundDetails?.roundNumber} of 4
        </span>
        <div className='flex flex-col md:flex-row items-center md:gap-6'>
          <span className='text-[#4F576A] text-lg font-medium'>
            Remaining time
          </span>
          <div className='px-6 py-4 shadow-baseShadow rounded-xl'>
            <span className='text-[#5326EC] font-bold text-lg md:text-2xl '>
              {isLoading ? '.......' : timeRemaining}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundCountBanner;
