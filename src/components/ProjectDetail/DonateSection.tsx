import React, { useEffect, useState } from 'react';
import ProjectDonateButton from './ProjectDonateButton';
import { useProjectContext } from '@/context/project.context';
import { formatAmount } from '@/helpers/donation';
import ProgressBar from '../ProgressBar';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateCapAmount } from '@/helpers/round';

export enum EDonationCardStates {
  beforeFirstRound = 'before',
  earlyAccess = 'early',
  betweenRounds = 'between',
  last = 'last',
}

const DonateSection = () => {
  let totalDonations = 10;
  let currentState = 'early';
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  const [progress, setProgress] = useState(0);
  const [maxPOLCap, setMaxPOLCap] = useState(0);

  const {
    projectData,
    uniqueDonars,
    totalAmount: totalPOLDonated,
  } = useProjectContext();

  useEffect(() => {
    const updatePOLCap = async () => {
      if (activeRoundDetails) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(activeRoundDetails, Number(projectData.id));

        setMaxPOLCap(capAmount);
        console.log(totalDonationAmountInRound, '----------------------');

        let tempprogress = 0;
        if (maxPOLCap > 0) {
          tempprogress =
            Math.round((totalDonationAmountInRound / capAmount) * 100 * 100) /
            100;
          setProgress(tempprogress);
        }
      }
    };

    updatePOLCap();
  }, [totalPOLDonated, activeRoundDetails, projectData, maxPOLCap]);

  const renderContent = () => {
    const renderDonationInfo = () => {
      return totalDonations && totalDonations !== 0 ? (
        <div className='mb-20px flex flex-col gap-2'>
          <div className='inline-block w-fit text-sm text-[#82899A] bg-[#F7F7F9] rounded-md px-1 py-1'>
            Total amount received
          </div>
          <h3 className='text-[41px] font-bold'>
            {' '}
            {formatAmount(totalPOLDonated)} POL
          </h3>
          <h2 className='text-[#1D1E1F] font-bold font-redHatText'>
            {' '}
            ~ ${' '}
            {formatAmount(
              Math.round(totalPOLDonated * Number(POLPrice) * 100) / 100,
            )}
          </h2>
          <p className='text-gray-700'>
            From{' '}
            <span className='font-bold text-[#1D1E1F]'>{uniqueDonars}</span>{' '}
            supporters
          </p>

          {/* Percentage Bar */}

          <div className='flex flex-col gap-2 mt-12'>
            <div
              className={`px-2 py-[2px] rounded-md  w-fit flex gap-2 font-redHatText text-xs font-medium ${progress === 100 ? 'bg-[#5326EC] text-white' : 'bg-[#F7F7F9] text-[#1D1E1F]'} `}
            >
              {progress === 0
                ? 'Getting started !'
                : progress !== 100
                  ? progress + '% collected'
                  : 'Maxed out this round!'}

              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  Bonding curves have a mint price and a burn price. This shows
                  the mint price.
                </div>
              </div>
            </div>
            <ProgressBar progress={progress} isStarted={false} />
            <div className='flex justify-between px-2 font-redHatText  font-medium items-center'>
              <span className='text-[#A5ADBF] text-xs'> Round Cap</span>
              <span className='text-[#1D1E1F]'>
                {formatAmount(maxPOLCap)} POL
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='mb-4'>
          <h1 className='font-bold text-3xl text-gray-800  leading-normal'>
            Donate first!
          </h1>
        </div>
      );
    };

    const renderMintInfo = (state: string | null = null) => (
      <>
        <div className='pt-2'>
          {state === 'before' ? (
            <p className='text-[#A5ADBF]'>Early access window start in</p>
          ) : state === 'last' ? (
            <p className='text-[#A5ADBF]'>Round ends in</p>
          ) : (
            <p className='text-[#A5ADBF]'>This mint round closes in</p>
          )}

          <p className='font-bold'>7 days, 8 hours, 32 min</p>
        </div>
        <div className='flex justify-between '>
          <p className='text-[#A5ADBF]'>Mint rounds remaining</p>
          <span className='mx-6 justify-start font-bold'>5</span>
        </div>
      </>
    );

    switch (currentState) {
      case EDonationCardStates.beforeFirstRound:
        return (
          <>
            <h1 className='text-2xl font-bold text-[#A5ADBF] mb-5'>
              Early access window starts on{' '}
              <span className='text-black'>Aug 15</span>
            </h1>

            {renderMintInfo('before')}
          </>
        );

      case EDonationCardStates.earlyAccess:
        return <>{renderDonationInfo()}</>;

      case EDonationCardStates.betweenRounds:
        return (
          <>
            {renderDonationInfo()}
            {renderMintInfo()}
          </>
        );

      default:
        return (
          <>
            {renderDonationInfo()}
            {renderMintInfo('last')}
          </>
        );
    }
  };
  return (
    <div className='lg:w-[30%]'>
      <div className=' lg:w-[330px]  bg-white lg:min-h-[450px] h-full rounded-2xl p-6'>
        <div className='flex flex-col  h-full justify-between'>
          <div className=''>{renderContent()}</div>
          <div className=' md:relative fixed bottom-0 w-full bg-white left-0 p-5 md:p-0 z-10'>
            <ProjectDonateButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
