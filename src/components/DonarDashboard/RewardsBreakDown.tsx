import React from 'react';
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
import {
  formatAmount,
  calculateLockedRewardTokenAmount,
  calculateClaimableRewardTokenAmount,
} from '@/helpers/donation';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import { useDonorContext } from '@/context/dashboard.context';

const RewardsBreakDown: React.FC = () => {
  const { donationsGroupedByProject, projectDonorData } = useDonorContext();
  const { data: user } = useFetchUser();
  const userId = user?.id;
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: isSafeAccount } = useCheckSafeAccount();

  if (
    !donationsGroupedByProject ||
    Object.keys(donationsGroupedByProject).length === 0
  ) {
    return <p>No data available</p>;
  }

  const projectDonations = donationsGroupedByProject[Number(projectId)] || [];
  const project = projectDonations[0]?.project;
  const projectData = projectDonorData[Number(projectId)] || {
    uniqueDonors: 0,
    donarContributions: 0,
    userProjectContributionSum: 0,
  };

  const totalSupply = project?.abc?.totalSupply || '---';
  const totalSupporters = projectData.uniqueDonors;
  const totalContributions = projectData.userProjectContributionSum;
  const totalTokensReceived = projectDonations.reduce(
    (sum: any, donation: any) => sum + (donation.rewardTokenAmount || 0),
    0,
  );

  let lockedTokens = 0;
  let availableToClaim = 0;

  projectDonations.forEach((donation: any) => {
    const lockedRewardTokenAmount = calculateLockedRewardTokenAmount(
      donation.rewardTokenAmount,
      donation.rewardStreamStart,
      donation.rewardStreamEnd,
      donation.cliff,
    );
    const claimableRewardTokenAmount = calculateClaimableRewardTokenAmount(
      donation.rewardTokenAmount,
      lockedRewardTokenAmount,
    );

    lockedTokens += lockedRewardTokenAmount || 0;
    availableToClaim += claimableRewardTokenAmount || 0;
  });

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
              {formatAmount(totalSupply)} {project?.abc?.tokenTicker}
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
                  Total contributions
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(totalContributions)} POL
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~ ${formatAmount(totalContributions * Number(POLPrice)) || 0}
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
            totalContributions={totalContributions}
          />
        </div>

        {/* Claim Rewards */}
        <div className='flex flex-col gap-4 font-redHatText w-full p-8 border rounded-xl'>
          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconMinted size={24} />
              <span className='text-[#4F576A] font-medium'>
                Total tokens received
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>
              {formatAmount(totalTokensReceived)} {project?.abc?.tokenTicker}
            </span>
          </div>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconLockedTokens size={24} />
              <span className='text-[#4F576A] font-medium'>Locked tokens</span>
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

          <Button color={ButtonColor.Gray} disabled={availableToClaim <= 0}>
            Claim Tokens
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RewardsBreakDown;
