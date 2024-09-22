import React from 'react';
import { useFetchRoundDetails } from '@/hooks/useFetchRoundDetails';

export const RoundInfoSupporter = () => {
  const { data: roundDetails, isLoading } = useFetchRoundDetails();

  return (
    <div className='py-6 px-8 rounded-2xl shadow-md flex'>
      <div className='text-gray-900 font-medium'>
        <div className='text-lg'>Early access</div>
        <div className='text-2xl'>Round {roundDetails?.roundNumber} of 4</div>
      </div>
    </div>
  );
};
