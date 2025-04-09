import { Inter, Nunito_Sans } from 'next/font/google';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateRemainingTime } from '@/helpers/date';
import Routes from '@/lib/constants/Routes';

const nunito = Nunito_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const Announced = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
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
      } else if (now === _startDate) {
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
        <Link href={Routes.Projects}>
          <button
            className={`flex items-center py-3 px-6 rounded-xl bg-gray-950 shadow-banner-button font-semibold tracking-wide ${inter.className}`}
          >
            <span>Get Started</span>
            <IconArrowRight size={24} />
          </button>
        </Link>
      </div>
      {isStarted && (
        <div className='flex justify-center items-center text-white bg-gray-800 w-full relative z-10 py-2 gap-20 overflow-hidden'>
          <Image
            src='/images/home/matching-pool.svg'
            alt='Matching Pool image'
            width={234}
            height={100}
            className='object-contain'
          />
          <div className='text-nowrap'>
            <div className={`${inter.className} mb-1`}>Matching Pool</div>
            <div className='text-tusker-grotesk text-5xl'>$ 250,000</div>
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
