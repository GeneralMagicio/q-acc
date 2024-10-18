import React, { useEffect, useState } from 'react';
import { formatAmount, formatNumber } from '@/helpers/donation';
import ProgressBar from '../ProgressBar';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { ProjectFormData } from '../Create/CreateProjectForm';
import { Button, ButtonColor } from '../Button';
import { getIpfsAddress } from '@/helpers/image';
import { fetchAbcToken } from '@/app/actions/fetch-abc-token';

export enum EDonationCardStates {
  beforeFirstRound = 'before',
  earlyAccess = 'early',
  betweenRounds = 'between',
  last = 'last',
}

interface ProjectDetailPreviewBannerProps {
  projectFormData: ProjectFormData;
}

const ProjectDetailPreviewDonationSection = ({
  projectFormData,
}: ProjectDetailPreviewBannerProps) => {
  const projectAddress = projectFormData.projectAddress;
  const [projectTokenData, setProjectTokenData] = useState<any>(null);

  useEffect(() => {
    if (projectAddress) {
      fetchAbcToken({ projectAddress }).then(data => {
        setProjectTokenData(data);
      });
    }
  }, [projectAddress]);

  let totalDonations = 10;
  let currentState = 'early';
  const { data: POLPrice } = useFetchTokenPrice();

  const totalPOLDonated = 1;
  const uniqueDonars = 1;
  const tokenPriceRange = {
    min: 1,
    max: 11,
  };

  let maxPOLAmount = 100000 / Number(POLPrice);
  let progress = Math.round((totalPOLDonated / maxPOLAmount) * 100 * 100) / 100; // calculate and round the progress to 2 decimal places

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
                {formatAmount(maxPOLAmount)} POL
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

  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <div className='flex justify-start items-center gap-2 '>
        <img
          className='w-6 h-6 rounded-full'
          src={getIpfsAddress(
            projectTokenData?.iconHash! ||
              'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
          )}
        />
        <div className='flex gap-2 items-center'>
          <span className='text-[#4F576A] font-medium'>
            {projectTokenData?.tokenTicker} range
          </span>
          <div className='relative group'>
            <IconTokenSchedule />
            <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
              The mint value of the ABC token will be within this range, based
              on the amount of POL this project receives.
            </div>
          </div>
        </div>

        {/* <IconInfo /> */}
      </div>
      <div className='flex items-center  text-sm  gap-2 text-[#82899A] flex-wrap  justify-between'>
        <h1 className='  p-2 bg-[#F7F7F9] rounded-lg pr-10'>
          <span className='text-[#1D1E1F] font-medium'>
            {tokenPriceRange.min.toFixed(3)} - {tokenPriceRange.max.toFixed(3)}
          </span>
          <span className='text-[#4F576A] text-xs '> POL</span>
        </h1>
        <span className='text-[#4F576A] font-medium'>
          ~${' '}
          {Number(POLPrice) &&
            formatNumber(Number(POLPrice) * tokenPriceRange.min)}{' '}
          -
          {Number(POLPrice) &&
            formatNumber(Number(POLPrice) * tokenPriceRange.max)}
        </span>
      </div>
    </div>
  );

  return (
    <div className='lg:w-[30%]'>
      <div className=' lg:w-[330px]  bg-white lg:min-h-[450px] h-full rounded-2xl p-6'>
        <div className='flex flex-col  h-full justify-between'>
          <div className=''>{renderContent()}</div>
          <div className=' md:relative fixed bottom-0 w-full bg-white left-0 p-5 md:p-0 z-10'>
            {PriceInfo()}
            <Button
              color={ButtonColor.Pink}
              className='w-full justify-center opacity-50 cursor-not-allowed my-6'
            >
              Starting Soon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPreviewDonationSection;
