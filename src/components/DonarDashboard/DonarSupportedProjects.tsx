import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import config from '@/config/configuration';
import { getIpfsAddress } from '@/helpers/image';

import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { formatAmount, formatNumber } from '@/helpers/donation';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconMinted } from '../Icons/IconMinted';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';
import { Button, ButtonColor } from '../Button';
import { IconBreakdownArrow } from '../Icons/IconBreakdownArrow';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateCapAmount } from '@/helpers/round';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';

const DonarSupportedProjects = ({
  projectId,
  project,
  uniqueDonors,
  totalClaimableRewardTokens,
  totalContributions,
  projectDonations,
  totalContribution,
  totalRewardTokens,
  onClickBreakdown,
}: any) => {
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [maxPOLCap, setMaxPOLCap] = useState(0);

  useEffect(() => {
    const updatePOLCap = async () => {
      if (activeRoundDetails) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(activeRoundDetails, Number(projectId));

        setMaxPOLCap(capAmount);
      }
    };

    updatePOLCap();
  }, [activeRoundDetails, projectId, maxPOLCap]);

  const { data: allRounds } = useFetchAllRound();
  const tokenPriceRangeStatus = useTokenPriceRangeStatus({
    project,
    allRounds,
  });
  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxPOLCap,
    contractAddress: project.abc?.fundingManagerAddress || '',
  });
  return (
    <div className='p-6 flex lg:flex-row flex-col gap-14 bg-white rounded-xl shadow-lg'>
      {/* Project Details */}
      <div className='flex flex-col gap-10 w-full lg:w-1/2'>
        {/* Project Banner */}
        <div
          className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
          style={{
            backgroundImage: `url('${project.image}')`,
          }}
        >
          <div className=' flex flex-col absolute  bottom-[24px] left-[24px] md:bottom-[24px] md:left-[24px] gap-2'>
            <div className='border rounded-md bg-white p-1 block w-fit'>
              <img
                className='w-6 h-6 rounded-full'
                src={getIpfsAddress(
                  project.abc?.icon ||
                    'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                )}
              />
            </div>
            <div className='flex flex-col text-white gap-2'>
              <h1 className='text-2xl md:text-[41px] font-bold leading-10'>
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 font-redHatText'>
          <Link
            target='_blank'
            href={`${config.SCAN_URL}/address/${project?.abc?.issuanceTokenAddress}`}
          >
            <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl flex justify-center'>
              <span className='flex gap-4 text-[#5326EC] font-bold'>
                Project Contract Address
                <IconViewTransaction color='#5326EC' />
              </span>
            </div>{' '}
          </Link>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalSupply size={24} />
              <span className='text-[#4F576A] font-medium font-redHatText'>
                Total Supply
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>
              {formatAmount(project.abc.totalSupply) || '---'}{' '}
              {project.abc.tokenTicker}
            </span>
          </div>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalDonars size={24} />
              <span className='text-[#4F576A] font-medium  font-redHatText'>
                Total supporters
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>{uniqueDonors}</span>
          </div>

          <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
            <div className='flex gap-2'>
              <IconTotalDonations size={24} />
              <span className='font-medium text-[#1D1E1F]'>
                Total contributions
              </span>
            </div>
            <div className='flex gap-1'>
              <span className='font-medium text-[#1D1E1F]'>
                {formatAmount(totalContributions) || 0} POL{' '}
              </span>
              <span className='font-medium text-[#82899A]'>
                ~ $ {formatAmount(project.totalDonations) || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Claim and Reward */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2  font-redHatText'>
        {activeRoundDetails && (
          <>
            <div className='flex items-center gap-2'>
              <img
                className='w-6 h-6 rounded-full'
                src={getIpfsAddress(
                  project.abc?.icon ||
                    'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                )}
              />
              <span className='text-[#4F576A] font-medium'>
                {project.abc.tokenTicker} range
                {tokenPriceRangeStatus.isSuccess &&
                tokenPriceRangeStatus.data?.isPriceUpToDate
                  ? ' '
                  : ' (Calculating) '}
              </span>
              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  The mint value of the ABC token will be within this range,
                  based on the amount of POL this project receives.
                </div>
              </div>
            </div>

            {/* Conditional Rendering for Token Price Range */}
            <div className='flex justify-between text-[#1D1E1F] font-medium'>
              {tokenPriceRangeStatus.isSuccess &&
              tokenPriceRangeStatus.data?.isPriceUpToDate ? (
                <>
                  <h2 className='flex gap-1 items-center'>
                    {tokenPriceRange.min.toFixed(2)} -{' '}
                    {tokenPriceRange.max.toFixed(2)}
                    <span className='text-[#4F576A] text-xs pb-1'>POL</span>
                  </h2>
                  <h2 className='text-[#4F576A]'>
                    ~${' '}
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.min)}{' '}
                    -
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.max)}
                  </h2>
                </>
              ) : (
                <>
                  <div className='p-2 w-[80%] rounded-lg bg-[#F7F7F9] text-[#1D1E1F] font-medium flex items-center gap-1'>
                    ---
                    <span className='text-gray-400 text-xs'>POL</span>
                  </div>
                  <div className='w-[20%] text-gray-400 text-right font-medium'>
                    ~$ ---
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <hr />

        <h1 className='flex p-[4px_16px] bg-[#EBECF2] w-fit rounded-md'>
          You supported this project{' '}
          {projectDonations > 1 && (
            <span className='font-medium'>&nbsp;{projectDonations}&nbsp;</span>
          )}
          {projectDonations === 1 ? (
            <span className='font-bold'>&nbsp;once</span>
          ) : (
            'times'
          )}
          .
        </h1>

        <div className='flex justify-between p-2 bg-[#F7F7F9] rounded-lg'>
          <div className='flex gap-2'>
            <IconTotalDonations size={24} />
            <span className='text-[#4F576A] font-medium '>
              Your contribution
            </span>
          </div>
          <span className='font-medium text-[#1D1E1F]'>
            {formatAmount(totalContribution)} POL
          </span>
        </div>

        <div className='flex justify-between p-2'>
          <div className='flex gap-2'>
            <IconMinted size={24} />
            <span className='text-[#4F576A] font-medium '>
              Your project tokens{' '}
            </span>
          </div>
          <div className='flex gap-1'>
            <span className='font-medium text-[#1D1E1F]'>
              {formatAmount(totalRewardTokens) || '---'}{' '}
              {project.abc.tokenTicker}
            </span>
            <span className='font-medium text-[#82899A]'>
              ~ ${' '}
              {formatAmount(
                totalRewardTokens * (project.abc.tokenPrice * Number(POLPrice)),
              ) || '---'}
            </span>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#EBECF2] rounded-md'>
          <div className='flex gap-2'>
            <IconAvailableTokens size={24} />
            <span className='font-medium text-[#1D1E1F]'>
              Available to claim
            </span>
            <div className='relative group'>
              <IconTokenSchedule />
              <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                The tokens have been unlocked and are now available for you to
                claim. Once claimed, they will be transferred to your wallet.
              </div>
            </div>
          </div>
          <div className='flex gap-1 font-medium text-[#1D1E1F]'>
            <span>
              {totalClaimableRewardTokens !== null
                ? `${formatAmount(totalClaimableRewardTokens)} ${project.abc?.tokenTicker || ''}`
                : '---'}
            </span>
            <span>
              ~ $
              {totalClaimableRewardTokens !== null
                ? formatAmount(
                    totalClaimableRewardTokens * project.abc.tokenPrice,
                  )
                : '---'}
            </span>
          </div>
        </div>

        {/* Claim Rewards */}
        <Button
          color={ButtonColor.Gray}
          className='flex justify-center'
          disabled={
            totalClaimableRewardTokens === null ||
            totalClaimableRewardTokens <= 0
          }
        >
          Claim Tokens
        </Button>
        <Button
          color={ButtonColor.Base}
          className='flex justify-center shadow-lg '
          onClick={onClickBreakdown}
        >
          Tokens & Contributions Breakdown <IconBreakdownArrow />
        </Button>
      </div>
    </div>
  );
};

export default DonarSupportedProjects;
