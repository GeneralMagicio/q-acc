import React from 'react';
import useRemainingTime from '@/hooks/useRemainingTime';
import { OnBoardButton } from './OnBoardButton';

interface QaccRoundCounterProps {
  page?: string;
}
const QaccRoundCounter: React.FC<QaccRoundCounterProps> = ({ page }) => {
  const now = new Date();
  const remainingTime = useRemainingTime(
    now.toISOString(),
    '2024-11-25T12:00:00.000Z', // Currently set to start at 25th November
  );
  return (
    <div className='px-10 py-6 rounded-2xl font-redHatText z-40'>
      <div
        className={`flex  flex-col gap-6 md:flex-row justify-center items-center`}
      >
        {/* {page === 'project' ? (
          <div>
            <p className='text-[#1D1E1F] font-medium text-xl'>
              q/acc round starts in
            </p>
          </div>
        ) : (
          ''
        )} */}

        <div>
          {/* <div className='px-6 py-4 shadow-baseShadow rounded-xl'>
            <span className='text-[#5326EC] font-bold text-lg md:text-2xl '>
              {remainingTime}
            </span>
          </div> */}
        </div>

        {page === 'project' ? '' : <OnBoardButton />}
      </div>
    </div>
  );
};

export default QaccRoundCounter;
