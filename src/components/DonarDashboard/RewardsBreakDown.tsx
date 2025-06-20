'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useSearchParams } from 'next/navigation';
import ProjectUserDonationTable from './ProjectUserDonationTable';
import { IconABC } from '../Icons/IconABC';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { Button, ButtonColor } from '../Button';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';
import { IconLockedTokens } from '../Icons/IconLockedTokens';
import { IconMinted } from '../Icons/IconMinted';
import { formatAmount } from '@/helpers/donation';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import { useDonorContext } from '@/context/dashboard.context';
import {
  useClaimRewards,
  useReleasableForStream,
  useReleasedForStream,
} from '@/hooks/useClaimRewards';
import { useTokenSupplyDetails } from '@/hooks/useTokenSupplyDetails';

const RewardsBreakDown: React.FC = () => {
  const { address } = useAccount();
  const { donationsGroupedByProject, projectDonorData } = useDonorContext();
  const { data: user } = useFetchUser();
  const userId = user?.id;
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: isSafeAccount } = useCheckSafeAccount();

  // if (
  //   !donationsGroupedByProject ||
  //   Object.keys(donationsGroupedByProject).length === 0
  // ) {
  //   return <p>No data available</p>;
  // }

  const projectDonations = donationsGroupedByProject[Number(projectId)] || [];
  const project = projectDonations[0]?.project;
  const projectData = projectDonorData[Number(projectId)] || {
    uniqueDonors: 0,
    donarContributions: 0,
    userProjectContributionSum: 0,
    totalContributions: 0,
  };
  const { data: tokenDetails } = useTokenSupplyDetails(
    project?.abc?.fundingManagerAddress,
  );

  const totalSupporters = projectData.uniqueDonors;
  const totalContributions = projectData.totalContributions;
  const totalUserContributions = projectData.userProjectContributionSum;
  const totalTokensReceived = projectDonations.reduce(
    (sum: any, donation: any) => sum + (donation.rewardTokenAmount || 0),
    0,
  );

  const [lockedTokens, setLockedTokens] = useState(0);

  const releasable = useReleasableForStream({
    paymentProcessorAddress: project?.abc?.paymentProcessorAddress!,
    client: project?.abc?.paymentRouterAddress!,
    receiver: address,
    streamId: BigInt(1),
  });

  const released = useReleasedForStream({
    paymentProcessorAddress: project?.abc?.paymentProcessorAddress!,
    client: project?.abc?.paymentRouterAddress!,
    receiver: address,
    streamId: BigInt(1),
  });

  const availableToClaim = releasable.data
    ? Number(ethers.formatUnits(releasable.data, 18)) // Format BigInt data to decimal
    : 0;

  const tokensAlreadyClaimed = released.data
    ? Number(ethers.formatUnits(released.data, 18)) // Format BigInt data to decimal
    : 0;

  const isTokenClaimable =
    releasable.data !== undefined && availableToClaim > 0;

  const { claim } = useClaimRewards({
    paymentProcessorAddress: project?.abc?.paymentProcessorAddress!,
    paymentRouterAddress: project?.abc?.paymentRouterAddress!,
    onSuccess: () => {
      // do after 5 seconds
      // setTimeout(() => {
      //   claimedTributesAndMintedTokenAmounts.refetch();
      // }, 5000);
      // projectCollateralFeeCollected.refetch();

      releasable.refetch();

      console.log('Successly Clamied Tokens');
    },
  });

  useEffect(() => {
    setLockedTokens(totalTokensReceived - tokensAlreadyClaimed);
  }, [releasable, released, totalTokensReceived]);

  return (
    <div className='container flex flex-col gap-8 my-8'>
      {/* Project Information and Overview */}
      <div className='p-6 flex lg:flex-row flex-col bg-white rounded-lg gap-14'>
        {/* Project Banner */}
        <div
          className='lg:w-1/2 w-full h-[251px] bg-cover bg-center rounded-3xl relative'
          style={{
            backgroundImage: `url('${project?.image}')`,
          }}
        >
          <div className='flex flex-col absolute bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2'>
            <div className='border rounded-md bg-white p-1 block w-fit'>
              <IconABC size={40} />
            </div>
            <div className='flex flex-col text-white gap-2'>
              <h1 className='text-2xl md:text-[41px] font-bold leading-10'>
                {project?.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className='flex flex-col gap-4 font-redHatText lg:w-1/2 w-full'>
          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalSupply size={24} />
              <span className='text-[#4F576A] font-medium'>Total supply</span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>
              {formatAmount(Number(tokenDetails?.issuance_supply)) || '---'}{' '}
              {project?.abc?.tokenTicker}
            </span>
          </div>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalDonars size={24} />
              <span className='text-[#4F576A] font-medium'>
                Total supporters
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>
              {totalSupporters}
            </span>
          </div>

          {!isSafeAccount && (
            <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
              <div className='flex gap-2'>
                <IconTotalDonations size={24} />
                <span className='font-medium text-[#1D1E1F]'>
                  Total received
                </span>
              </div>
              <div className='flex gap-2'>
                {/* <span className='font-medium text-[#1D1E1F]'>
                  ~ ${formatAmount(totalContributions * Number(POLPrice)) || 0}
                </span> */}
                <span className='font-medium text-[#82899A]'>
                  {formatAmount(totalContributions)} POL
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donations Breakdown */}
      <div className='bg-white rounded-xl flex flex-col gap-8 md:p-6'>
        <div className='flex flex-col gap-4 w-full p-8 border rounded-xl'>
          <h2 className='text-2xl font-bold'>
            Your tokens & contributions breakdown
          </h2>
          <ProjectUserDonationTable
            userId={parseInt(userId as string)}
            project={project}
            totalContributions={totalUserContributions}
          />
        </div>

        {/* Claim Rewards */}
        {tokensAlreadyClaimed > 0 ? (
          <div className='flex flex-col gap-4 font-redHatText w-full p-8 border rounded-xl'>
            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconMinted size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Total tokens received
                </span>
              </div>
              <span className='font-medium text-[#1D1E1F]'>
                {formatAmount(tokensAlreadyClaimed)} {project?.abc?.tokenTicker}
              </span>
            </div>

            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconLockedTokens size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Locked tokens
                </span>
              </div>
              <span className='font-medium text-[#1D1E1F]'>
                {formatAmount(lockedTokens)} {project?.abc?.tokenTicker}
              </span>
            </div>

            <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
              <div className='flex gap-2 items-center'>
                <IconAvailableTokens size={32} />
                <span className='font-medium text-[#1D1E1F] text-2xl'>
                  Available to claim
                </span>
              </div>
              <span className='text-2xl'>
                {formatAmount(availableToClaim)} {project?.abc?.tokenTicker}
              </span>
            </div>

            <Button
              color={isTokenClaimable ? ButtonColor.Giv : ButtonColor.Gray}
              onClick={() => claim.mutateAsync()}
              disabled={availableToClaim <= 0}
              loading={claim.isPending}
              className='flex  justify-center'
            >
              Claim Tokens
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RewardsBreakDown;
