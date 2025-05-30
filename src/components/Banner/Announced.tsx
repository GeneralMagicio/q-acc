import { Inter, Nunito_Sans } from 'next/font/google';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateRemainingTime } from '@/helpers/date';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { Spinner } from '../Loading/Spinner';
import { OnBoardButton } from './OnBoardButton';

const nunito = Nunito_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const Announced = () => {
  const { data: activeRoundDetails, isLoading: isPolPriceLoading } =
    useFetchActiveRoundDetails();
  const { data: POLPrice } = useFetchTokenPrice();
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const calcRemTime = () => {
      const startDate = activeRoundDetails?.startDate;
      const endDate = activeRoundDetails?.endDate;
      if (!startDate || !endDate) return;
      const _startDate = new Date(startDate);
      const _endDate = new Date(endDate);
      const now = new Date();
      let _targetDate = new Date();

      if (now < _startDate) {
        _targetDate = _startDate;
        isStarted && setIsStarted(false);
      } else if (now.getTime() === _startDate.getTime()) {
        setRemainingTime('00:00:00');
        setIsStarted(true);
      } else {
        _targetDate = _endDate;
        setIsStarted(true);
      }

      setRemainingTime(calculateRemainingTime(_targetDate));
    };
    calcRemTime();

    const interval = setInterval(() => {
      calcRemTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoundDetails?.endDate, activeRoundDetails?.startDate, isStarted]);

  const targetDate = new Date(
    (isStarted ? activeRoundDetails?.endDate : activeRoundDetails?.startDate) ||
      '',
  );

  return (
    <>
      <div className='flex text-peach items-center px-2 py-4 gap-6 flex-wrap justify-center relative z-10'>
        <div className={`${inter.className} text-white`}>
          q/acc round {isStarted ? `ends` : `starts`} in
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-3xl tracking-widest text-center'>
            {remainingTime}
          </div>
          <div className={`${nunito.className} text-sm`}>
            On{' '}
            {targetDate.toLocaleString('en-US', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            })}
          </div>
        </div>
        <OnBoardButton />
      </div>
      {isStarted && (
        <div className='flex justify-center items-center text-white bg-gray-900 w-full relative z-10 py-2 gap-20 overflow-hidden'>
          <Image
            src='/images/home/matching-pool.svg'
            alt='Matching Pool image'
            width={234}
            height={100}
            className='object-contain'
          />
          <div className='text-nowrap'>
            <div className={`${inter.className} mb-1 text-center`}>
              Matching Pool
            </div>
            <div className='text-tusker-grotesk text-5xl'>
              {/* $&nbsp; */}
              {isPolPriceLoading ? (
                <Spinner />
              ) : (
                (activeRoundDetails?.__typename === 'QfRound'
                  ? activeRoundDetails.allocatedFundUSD
                    ? Number(activeRoundDetails.allocatedFund)
                    : Number(activeRoundDetails.allocatedFund) * (POLPrice || 0)
                  : 0
                ).toLocaleString('en-US') || '0'
              )}{' '}
              POL
            </div>
          </div>
          <Image
            src='/images/home/matching-pool.svg'
            alt='Matching Pool image'
            width={234}
            height={100}
            className='object-contain scale-x-[-1]'
          />
        </div>
      )}
    </>
  );
};
