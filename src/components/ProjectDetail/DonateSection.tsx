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
  const [totalAmountDonated, setTotalAmountDonated] = useState(0);

  const {
    projectData,
    uniqueDonars,
    totalAmount: totalPOLDonated,
  } = useProjectContext();

  const isRoundActive = !!activeRoundDetails;

  useEffect(() => {
    const updatePOLCap = async () => {
      const { capAmount, totalDonationAmountInRound }: any =
        await calculateCapAmount(activeRoundDetails, Number(projectData.id));

      setMaxPOLCap(capAmount);
      setTotalAmountDonated(totalDonationAmountInRound);

      let tempprogress = 0;
      if (maxPOLCap > 0) {
        tempprogress =
          Math.round((totalDonationAmountInRound / capAmount) * 100 * 100) /
          100;
        setProgress(tempprogress);
      }
    };

    updatePOLCap();
  }, [totalPOLDonated, activeRoundDetails, projectData, maxPOLCap, progress]);

  const renderContent = () => {
    const renderDonationInfo = () => {
      return totalDonations && totalDonations !== 0 ? (
        <div className='mb-20px flex flex-col gap-2 font-redHatText'>
          <div className='inline-block w-fit text-sm text-[#82899A] rounded-md px-1 py-1'>
            Backed by{' '}
            <span className='text-[#1D1E1F] text-base font-semibold'>
              {uniqueDonars}
            </span>{' '}
            supporters
          </div>

          <div className='p-2 bg-[#EBECF2] rounded-lg flex flex-col gap-4'>
            <span className='text-[#1D1E1F] text-sm font-semibold'>
              Total received
            </span>
            <div className='flex gap-2 items-center'>
              <span className='text-[#1D1E1F] font-bold text-lg'>
                ~ ${' '}
                {formatAmount(
                  Math.round(totalAmountDonated * Number(POLPrice) * 100) / 100,
                )}
              </span>
              <span className='text-[#4F576A] font-medium'>
                {' '}
                {formatAmount(totalAmountDonated)} POL
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
      <div className=' w-full  bg-white lg:min-h-[450px] h-full rounded-2xl p-6'>
        <div className='flex flex-col  h-full justify-between'>
          <div className=''>{renderContent()}</div>
          <div className=' md:relative fixed bottom-0 w-full bg-white left-0 p-5 md:p-0 z-20'>
            <ProjectDonateButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
