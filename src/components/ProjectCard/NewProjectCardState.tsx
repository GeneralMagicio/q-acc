import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProject } from '@/types/project.type';
import ProjectCardImage from './ProjectCardImage';

import { getIpfsAddress } from '@/helpers/image';
import { fetchProjectDonationsById } from '@/services/donation.services';
import { calculateTotalDonations, formatNumber } from '@/helpers/donation';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { calculateCapAmount } from '@/helpers/round';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { SupportButton } from './SupportButton';
import { Button, ButtonColor } from '../Button';
import config from '@/config/configuration';
import { getPoolAddressByPair } from '@/helpers/getListedTokenData';

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: IProject;
}

export const NewProjectCardState: FC<ProjectCardProps> = ({
  className,
  project,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const [totalPOLDonated, setTotalPOLDonated] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [amountDonatedInRound, setAmountDonatedInRound] = useState(0);

  const router = useRouter();
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  // const isQaccRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  const [isTokenListed, setIsTokenListed] = useState(false);
  const [currentTokenPrice, setCurrentTokenPrice] = useState(0);

  useEffect(() => {
    if (project?.id) {
      const fetchProjectDonations = async () => {
        const data = await fetchProjectDonationsById(
          parseInt(project?.id),
          1000,
          0,
        );

        if (data) {
          const { donations, totalCount } = data;

          setTotalPOLDonated(calculateTotalDonations(donations));
        }
      };
      fetchProjectDonations();
    }
  }, [project]);

  useEffect(() => {
    const updatePOLCap = async () => {
      const { capAmount, totalDonationAmountInRound }: any =
        await calculateCapAmount(activeRoundDetails, Number(project.id));

      setMaxPOLCap(capAmount);
      setAmountDonatedInRound(totalDonationAmountInRound);
    };

    updatePOLCap();
  }, [activeRoundDetails, project, progress]);

  const handleCardClick = () => {
    router.push(`/project/${project.slug}`);
  };

  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxPOLCap,
    contractAddress: project.abc?.fundingManagerAddress || '',
  });

  const { data: allRounds } = useFetchAllRound();
  const tokenPriceRangeStatus = useTokenPriceRangeStatus({
    project,
    allRounds,
  });

  const capitalizeFirstLetter = (str: string) => {
    return str
      .toLowerCase() // Make the whole string lowercase first
      .replace(/(?:^|\.\s*)([a-z])/g, match => match.toUpperCase()); // Capitalize first letter of each sentence
  };
  const polPriceNumber = Number(POLPrice);
  const totalHeightClass = activeRoundDetails
    ? 'h-project-card-full'
    : 'h-project-card';

  useEffect(() => {
    const fetchPoolAddress = async () => {
      if (project?.abc?.issuanceTokenAddress) {
        const { price, isListed } = await getPoolAddressByPair(
          project.abc.issuanceTokenAddress,
          config.WPOL_TOKEN_ADDRESS,
        );
        setIsTokenListed(isListed);
        setCurrentTokenPrice(1 / Number(price));
        console.log(
          'Current Price  Address:',
          isTokenListed,
          currentTokenPrice,
        );
      }
    };

    fetchPoolAddress(); // Call the async function inside useEffect
  }, [project?.abc?.issuanceTokenAddress]);

  return (
    <div
      className={`${className} relative cursor-pointer rounded-xl ${progress === 100 ? 'shadow-cardShadow' : ''}`}
    >
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-4  w-full ${totalHeightClass} rounded-xl bg-white overflow-hidden shadow-tabShadow shadow-gray-200 `}
        {...props}
      >
        <div className='relative h-[250px]'>
          <ProjectCardImage
            src={project.image}
            alt='Project Card'
            fallbackSrc='/images/project-card/card-image.jpeg'
          />

          {!activeRoundDetails
            ? (project.seasonNumber !== 1 ||
                project.batchNumbersWithSafeTransactions?.length != 0) && (
                <div className='absolute bg-white    right-[-2px] top-0   py-[2px]  pr-0 pl-2 rounded-tr-xl rounded-bl-2xl '>
                  <svg
                    className='absolute left-[-18px] top-[-1px]'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M18 0V18C18 18 17.8462 7.84622 14 4C10.1538 0.153782 0 0 0 0H18Z'
                      fill='white'
                    />
                  </svg>
                  <span className='text-[#1D1E1F] font-redHatText font-semibold'>
                    {project.batchNumbersWithSafeTransactions?.length != 0
                      ? ' DEX listing soon'
                      : 'New!'}
                  </span>

                  <svg
                    className=' absolute bottom-[-18px] right-[1px]'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M18 0V18C18 18 17.8462 7.84622 14 4C10.1538 0.153782 0 0 0 0H18Z'
                      fill='white'
                    />
                  </svg>
                </div>
              )
            : project.seasonNumber !== 1 && (
                <div className='absolute bg-white    right-[-2px] top-0   py-[2px]  pr-0 pl-2 rounded-tr-xl rounded-bl-2xl '>
                  <svg
                    className='absolute left-[-18px] top-[-1px]'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M18 0V18C18 18 17.8462 7.84622 14 4C10.1538 0.153782 0 0 0 0H18Z'
                      fill='white'
                    />
                  </svg>
                  <span className='text-[#1D1E1F] font-redHatText font-semibold'>
                    New!
                  </span>

                  <svg
                    className=' absolute bottom-[-18px] right-[1px]'
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M18 0V18C18 18 17.8462 7.84622 14 4C10.1538 0.153782 0 0 0 0H18Z'
                      fill='white'
                    />
                  </svg>
                </div>
              )}
        </div>

        <div
          className={`bg-white absolute h-fit ${activeRoundDetails || isTokenListed ? ' bottom-[-120px] ' : ' bottom-[-80px] '} hover:bottom-0 no-hover transition-bottom duration-500 ease-in-out left-4 right-4 py-4`}
        >
          <div className='absolute bg-white    left-0 -top-11 w-16 h-16 p-3 rounded-tr-xl rounded-bl-xl '>
            <svg
              className='absolute top-[-18px] left-0'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
            >
              <path
                d='M0 18V0C0 0 0.153782 10.1538 4 14C7.84622 17.8462 18 18 18 18H0Z'
                fill='white'
              />
            </svg>
            <Image
              src={project.icon || '/images/project-card/logo.svg'}
              alt='Project Icon'
              width={50}
              height={50}
            />
            <svg
              className=' absolute bottom-5 right-[-18px]'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
            >
              <path
                d='M0 18V0C0 0 0.153782 10.1538 4 14C7.84622 17.8462 18 18 18 18H0Z'
                fill='white'
              />
            </svg>
          </div>

          <svg
            className='absolute -top-[18px] right-0'
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
          >
            <path
              d='M18 18V0C18 0 17.8462 10.1538 14 14C10.1538 17.8462 0 18 0 18H18Z'
              fill='white'
            />
          </svg>

          <div className='relative flex flex-col gap-4 font-redHatText'>
            <div className='flex flex-col'>
              <h2 className='text-lg font-bold'>{project.title}</h2>
            </div>
            <div className='min-h-[100px] text-ellipsis'>
              <p className='text-gray-500  overflow-hidden    font-redHatText  line-clamp-4 leading-6 px-2'>
                {project.descriptionSummary &&
                  capitalizeFirstLetter(project.descriptionSummary)}
                {/* {project.teaser ? project.teaser : '\u00A0'} */}
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              {/* Amount in this Round or Total Receieved */}
              <div className='p-2 flex justify-between items-center bg-[#EBECF2] rounded-lg'>
                <div className='text-[#1D1E1F] font-medium text-sm'>
                  {activeRoundDetails
                    ? 'Received this round'
                    : 'Total received'}
                </div>

                {activeRoundDetails ? (
                  // Amount in this Round
                  <div className='flex flex-col'>
                    <span className='text-[#1D1E1F] font-bold text-lg'>
                      {' '}
                      ~ ${' '}
                      {polPriceNumber
                        ? `${' ' + formatNumber(polPriceNumber * amountDonatedInRound)}`
                        : ''}
                    </span>
                    <span className='text-[#4F576A] font-medium text-right'>
                      {formatNumber(amountDonatedInRound)} POL
                    </span>
                  </div>
                ) : (
                  // Total Receieved
                  <div className='flex flex-col'>
                    <span className='text-[#1D1E1F] font-bold text-lg'>
                      {' '}
                      ~ ${' '}
                      {polPriceNumber
                        ? `${' ' + formatNumber(polPriceNumber * totalPOLDonated)}`
                        : ''}
                    </span>
                    <span className='text-[#4F576A] font-medium text-right'>
                      {formatNumber(totalPOLDonated)} POL
                    </span>
                  </div>
                )}
              </div>

              {/* QuickSwap Price */}
              <div className='p-2 flex justify-between items-center  rounded-lg'>
                <div className='flex gap-2 items-center justify-center'>
                  <div className='w-6 h-6 relative rounded-full overflow-hidden'>
                    <Image
                      src={getIpfsAddress(
                        project.abc?.icon! ||
                          'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                      )}
                      alt=''
                      width={48}
                      height={48}
                    />
                  </div>
                  <span className='text-sm text-[#4F576A] font-medium'>
                    {' '}
                    {project?.abc?.tokenTicker} price on Quickswap
                  </span>
                </div>
                <div className='flex flex-col'>
                  {isTokenListed ? (
                    <>
                      <span className='text-[#1D1E1F] font-bold text-lg'>
                        {' '}
                        ~ ${' '}
                        {polPriceNumber
                          ? `${' ' + formatNumber(polPriceNumber * currentTokenPrice)}`
                          : ''}
                      </span>
                      <span className='text-[#4F576A] font-medium'>
                        {' '}
                        {currentTokenPrice.toFixed(2)} POL
                      </span>
                    </>
                  ) : (
                    <>
                      <span className='text-[#4F576A] font-bold text-lg text-right'>
                        ---
                      </span>
                      <span className='text-[#4F576A] font-medium'>
                        --- POL
                      </span>
                    </>
                  )}
                </div>
              </div>
              <hr />
              {/* Market Cap Price */}
              <div className='p-2 flex justify-between items-center  rounded-lg'>
                <span className='text-sm text-[#4F576A] font-medium'>
                  {' '}
                  {project?.abc?.tokenTicker} Market Cap
                </span>
                <div className='flex flex-col'>
                  <span className='text-[#1D1E1F] font-bold text-lg text-right'>
                    {' '}
                    $ 400,000
                  </span>
                  <div className='flex gap-1 text-[#4F576A] font-medium items-center'>
                    <span className='text-xs'>24h Change</span>
                    <span>9.56%</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M3.33398 8.00065L8.00065 3.33398M8.00065 3.33398L12.6673 8.00065M8.00065 3.33398V12.6673'
                        stroke='#4F576A'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className='w-full flex flex-col gap-2'>
              {activeRoundDetails ? (
                <SupportButton
                  project={project}
                  disabled={maxPOLCap === amountDonatedInRound}
                />
              ) : (
                isTokenListed && (
                  <Button
                    className='w-full  flex justify-center items-center'
                    color={ButtonColor.Giv}
                    onClick={e => {
                      e.stopPropagation();
                      const url = `https://quickswap.exchange/#/swap?currency0=ETH&currency1=${project?.abc?.issuanceTokenAddress}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Buy {project.abc?.tokenTicker} on Quickswap
                  </Button>
                )
              )}

              <Button
                className='w-full  flex justify-center items-center'
                color={ButtonColor.Base}
              >
                Review Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
