import React from 'react';
import Link from 'next/link';
import useRemainingTime from '@/hooks/useRemainingTime';

const QaccRoundCounter = () => {
  const now = new Date();
  const remainingTime = useRemainingTime(
    now.toISOString(),
    '2024-11-25T12:00:00.000Z', // Currently set to start at 25th November
  );
  return (
    <div className='px-10 py-6  bg-white rounded-2xl shadow-baseShadow font-redHatText z-40'>
      <div className='flex  flex-col gap-6 md:flex-row md:justify-between'>
        <div>
          <div className='px-6 py-4 shadow-baseShadow rounded-xl'>
            <span className='text-[#5326EC] font-bold text-lg md:text-2xl '>
              {remainingTime}
            </span>
          </div>
        </div>
        <div className='flex justify-center'>
          <Link href={'/create/profile'}>
            <div className='px-10 py-6 text-sm flex justify-center items-center text-[white] font-bold bg-[#E1458D] rounded-full shadow-tabShadow'>
              Create Account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QaccRoundCounter;
