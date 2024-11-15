import React, { type HTMLAttributes } from 'react';
import Link from 'next/link';
import useRemainingTime from '@/hooks/useRemainingTime';
import { usePrivado } from '@/hooks/usePrivado';
import Routes from '@/lib/constants/Routes';

export const customButtonClass: HTMLAttributes<HTMLDivElement>['className'] =
  'font-redHatText px-10 py-6 flex justify-center items-center text-[white] font-bold bg-pink-500 rounded-full shadow-tabShadow text-sm';
interface QaccRoundCounterProps {
  page?: string;
}
const QaccRoundCounter: React.FC<QaccRoundCounterProps> = ({ page }) => {
  const { isVerified } = usePrivado();
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

        {page === 'project' ? (
          ''
        ) : (
          <>
            {isVerified ? (
              <Link href={Routes.Projects}>
                <div className={customButtonClass}>View Projects</div>
              </Link>
            ) : (
              <Link href={Routes.CreateProfile}>
                <div className={customButtonClass}>Get Verified</div>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QaccRoundCounter;
