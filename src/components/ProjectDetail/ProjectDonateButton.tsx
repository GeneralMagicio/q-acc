import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { useProjectContext } from '@/context/project.context';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { getIpfsAddress } from '@/helpers/image';
import { checkUserOwnsNFT } from '@/helpers/token';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import useRemainingTime from '@/hooks/useRemainingTime';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { formatNumber } from '@/helpers/donation';
import { calculateCapAmount } from '@/helpers/round';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { getAdjustedEndDate } from '@/helpers/date';
import { getPoolAddressByPair } from '@/helpers/getListedTokenData';
import config from '@/config/configuration';

const ProjectDonateButton = () => {
  const { projectData, totalAmount: totalPOLDonated } = useProjectContext();
  const { data: POLPrice } = useFetchTokenPrice();

  const { address } = useAccount();
  const router = useRouter();
  const [ownsNFT, setOwnsNFT] = useState(false);
  const [loadingNFTCheck, setLoadingNFTCheck] = useState(true);
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const [progress, setProgress] = useState(0);
  const adjustedEndDate = getAdjustedEndDate(activeRoundDetails?.endDate);

  const remainingTime = useRemainingTime(
    activeRoundDetails?.startDate,
    adjustedEndDate,
  );
  const [isTokenListed, setIsTokenListed] = useState(false);
  const [currentTokenPrice, setCurrentTokenPrice] = useState(0);
  useEffect(() => {
    const fetchPoolAddress = async () => {
      if (projectData?.abc?.issuanceTokenAddress) {
        const { price, isListed } = await getPoolAddressByPair(
          projectData.abc.issuanceTokenAddress,
          config.ERC_TOKEN_ADDRESS,
        );
        setIsTokenListed(isListed);
        setCurrentTokenPrice(Number(price));
      }
    };

    // fetchPoolAddress();
  }, [
    projectData?.abc?.issuanceTokenAddress,
    currentTokenPrice,
    isTokenListed,
  ]);
  useEffect(() => {
    const updatePOLCap = async () => {
      if (activeRoundDetails) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(activeRoundDetails, Number(projectData.id));

        setMaxPOLCap(capAmount);
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

  useEffect(() => {
    const checkNFT = async () => {
      if (projectData?.abc?.nftContractAddress && address) {
        const res = await checkUserOwnsNFT(
          projectData.abc.nftContractAddress,
          address,
        );
        setOwnsNFT(res);
      }
      setLoadingNFTCheck(false);
    };
    checkNFT();
  }, [projectData?.abc?.nftContractAddress, address]);

  const handleSupport = (e: any) => {
    e.stopPropagation();
    if (activeRoundDetails?.__typename === 'QfRound') {
      router.push(`/support/${projectData.slug}`);
    } else if (ownsNFT) {
      router.push(`/support/${projectData.slug}`);
    }
  };

  // New token price logic

  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxPOLCap,
    contractAddress: projectData.abc?.fundingManagerAddress || '',
  });

  const { data: allRounds } = useFetchAllRound();
  const tokenPriceRangeStatus = useTokenPriceRangeStatus({
    project: projectData,
    allRounds,
  });

  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <div className='flex justify-start items-center gap-2 '>
        <img
          className='w-6 h-6 rounded-full'
          src={getIpfsAddress(
            projectData.abc?.icon! ||
              'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
          )}
        />
        <div className='flex gap-2 items-center'>
          <span className='text-[#4F576A] font-medium'>
            {projectData?.abc?.tokenTicker} range
            {tokenPriceRangeStatus.isSuccess &&
            tokenPriceRangeStatus.data?.isPriceUpToDate
              ? ' '
              : ' (Calculating) '}
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
      <div className='flex items-center text-sm gap-2 text-[#82899A] flex-wrap justify-between'>
        {tokenPriceRangeStatus.isSuccess &&
        tokenPriceRangeStatus.data?.isPriceUpToDate ? (
          <>
            <h1 className='p-2 bg-[#F7F7F9] rounded-lg pr-10'>
              <span className='text-[#1D1E1F] font-medium'>
                {tokenPriceRange.min.toFixed(2)} -{' '}
                {tokenPriceRange.max.toFixed(2)}
              </span>
              <span className='text-[#4F576A] text-xs'> POL</span>
            </h1>
            <span className='text-[#4F576A] font-medium'>
              ~${' '}
              {Number(POLPrice) &&
                formatNumber(Number(POLPrice) * tokenPriceRange.min)}{' '}
              -{' '}
              {Number(POLPrice) &&
                formatNumber(Number(POLPrice) * tokenPriceRange.max)}
            </span>
          </>
        ) : (
          <>
            <h1 className='p-2 bg-[#F7F7F9] rounded-lg pr-10'>
              <span className='text-[#1D1E1F] font-medium'>---</span>
              <span className='text-[#4F576A] text-xs'> POL</span>
            </h1>
            <span className='text-[#4F576A] font-medium'>~$ ---</span>
          </>
        )}
      </div>
    </div>
  );

  const listedPriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <div className='flex justify-start items-center gap-2 '>
        <img
          className='w-6 h-6 rounded-full'
          src={getIpfsAddress(
            projectData.abc?.icon! ||
              'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
          )}
        />
        <div className='flex gap-2 items-center'>
          <span className='text-[#4F576A] font-medium'>
            {projectData?.abc?.tokenTicker} Price
          </span>
        </div>

        {/* <IconInfo /> */}
      </div>
      <div className='flex items-center text-sm gap-2 text-[#82899A] flex-wrap justify-between'>
        {isTokenListed &&
        tokenPriceRangeStatus.isSuccess &&
        tokenPriceRangeStatus.data?.isPriceUpToDate ? (
          <>
            <h1 className=' flex-1 p-2 bg-[#F7F7F9] rounded-lg pr-10 '>
              <span className='text-[#1D1E1F] font-medium'>
                {currentTokenPrice.toFixed(2)}
              </span>
              <span className='text-[#4F576A] text-xs'> POL</span>
            </h1>
            <span className='text-[#4F576A] font-medium'>
              ${' '}
              {Number(POLPrice) &&
                formatNumber(Number(POLPrice) * currentTokenPrice)}
            </span>
          </>
        ) : (
          <>
            <h1 className='p-2 bg-[#F7F7F9] rounded-lg pr-10'>
              <span className='text-[#1D1E1F] font-medium'>---</span>
              <span className='text-[#4F576A] text-xs'> POL</span>
            </h1>
            <span className='text-[#4F576A] font-medium'>~$ ---</span>
          </>
        )}
      </div>
    </div>
  );

  let currentState = 'early';
  return (
    <div className='flex flex-col gap-4'>
      {activeRoundDetails && PriceInfo()}
      {isTokenListed && listedPriceInfo()}
      {currentState === EDonationCardStates.beforeFirstRound ? (
        <Button
          color={ButtonColor.Pink}
          className='w-full justify-center opacity-50 cursor-not-allowed'
        >
          Starting Soon
        </Button>
      ) : (
        <>
          {isTokenListed ? (
            <Button
              color={ButtonColor.Pink}
              className='w-full justify-center'
              onClick={() => {
                const url = `https://quickswap.exchange/#/swap?currency0=${config.ERC_TOKEN_ADDRESS}&currency1=${projectData?.abc?.issuanceTokenAddress}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              Get ${projectData?.abc?.tokenTicker} on QuickSwap
            </Button>
          ) : (
            <Button
              color={ButtonColor.Pink}
              className='w-full justify-center'
              onClick={handleSupport}
              disabled={
                (activeRoundDetails?.__typename === 'EarlyAccessRound' &&
                  !ownsNFT) ||
                progress >= 100 ||
                remainingTime === 'Time is up!' ||
                remainingTime === '--:--:--'
              }
              loading={loadingNFTCheck}
            >
              {remainingTime === 'Time is up!' || remainingTime === '--:--:--'
                ? 'Buy Token'
                : progress >= 100
                  ? 'Project Maxed Out'
                  : 'Buy Token'}
            </Button>
          )}

          {activeRoundDetails ? (
            activeRoundDetails.__typename === 'EarlyAccessRound' ? (
              !ownsNFT ? (
                <span className='text-[#EA960D] p-1 rounded-full bg-[#FFFBEF] text-xs px-2 text-center font-medium'>
                  Missing early access NFT
                </span>
              ) : (
                <span className='text-[#2EA096] p-1 rounded-full bg-[#D2FFFB] text-xs px-2 text-center font-medium'>
                  You are on the early access list
                </span>
              )
            ) : null
          ) : null}
        </>
      )}
    </div>
  );
};

export default ProjectDonateButton;
