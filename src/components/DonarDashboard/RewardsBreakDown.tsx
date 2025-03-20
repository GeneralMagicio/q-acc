import React from 'react';
import Link from 'next/link';
import ProjectUserDonationTable from './ProjectUserDonationTable'; // Import the ProjectUserDonationTable component
import { IconABC } from '../Icons/IconABC';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
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

import config from '@/config/configuration';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';

interface RewardsBreakDownProps {
  projectDonations: any[];
  projectDonorData: {
    uniqueDonors: number;
    donarContributions: number;
    userProjectContributionSum: number;
  };
}

const RewardsBreakDown: React.FC<RewardsBreakDownProps> = ({
  projectDonations,
  projectDonorData,
}) => {
  const { data: user } = useFetchUser();
  const userId = user?.id;
  const project = projectDonations[0]?.project;
  const totalSupply = project?.abc?.totalSupply || '---';

  const totalSupporters = projectDonorData.uniqueDonors;
  const totalContributions = projectDonorData.userProjectContributionSum;
  const totalTokensReceived = projectDonations.reduce(
    (sum, donation) => sum + (donation.rewardTokenAmount || 0),
    0,
  );
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: isSafeAccount } = useCheckSafeAccount();

  // Calculate locked tokens and available to claim tokens
  let lockedTokens = 0;
  let availableToClaim = 0;

  projectDonations.forEach(donation => {
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

  console.log('project?.abc?.tokenTicker', project?.abc?.tokenTicker);

  return (
    <>
      <div className='container flex flex-col gap-8 my-8'>
        {/* Project Information and Overview */}
        <div className='p-6 flex lg:flex-row flex-col bg-white rounded-lg gap-14'>
          {/* Project Banner */}
          <div
            className='lg:w-1/2 w-full h-[251px] bg-cover bg-center rounded-3xl relative'
            style={{
              backgroundImage: `url('${project.image}')`,
            }}
          >
            <div className='flex flex-col absolute bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2'>
              <div className='border rounded-md bg-white p-1 block w-fit'>
                <IconABC size={40} />
              </div>
              <div className='flex flex-col text-white gap-2'>
                <h1 className='text-2xl md:text-[41px] font-bold leading-10'>
                  {project.title}
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
                    ~ ${' '}
                    {formatAmount(totalContributions * Number(POLPrice)) || 0}
                  </span>
                </div>
              </div>
            )}

            <Link
              target='_blank'
              href={`https://polygonscan.com/address/${project?.abc?.projectAddress}`}
            >
              <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl flex justify-center'>
                <span className='flex gap-4 text-[#5326EC] font-bold'>
                  Project Contract Address{' '}
                  <IconViewTransaction color='#5326EC' />
                </span>
              </div>{' '}
            </Link>
          </div>
        </div>

        <div className='bg-white rounded-xl flex flex-col gap-8 md:p-6'>
          {/* Donation List Section */}
          <div className='flex flex-col gap-4 w-full p-8 border rounded-xl'>
            <h2 className='text-2xl font-bold'>
              Your tokens & contributions breakdown
            </h2>
            {/* Include ProjectUserDonationTable */}
            <ProjectUserDonationTable
              userId={parseInt(userId as string)}
              project={project}
              totalContributions={totalContributions}
            />
          </div>

          {/* Project Claim Rewards */}
          <div className='flex flex-col gap-4 font-redHatText w-full p-8 border rounded-xl'>
            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconMinted size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Total tokens received
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(totalTokensReceived)}{' '}
                  {project?.abc?.tokenTicker}
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~ ${' '}
                  {formatAmount(
                    totalTokensReceived *
                      (project?.abc?.tokenPrice * Number(POLPrice)),
                  )}
                </span>
              </div>
            </div>

            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconLockedTokens size={24} />
                <span className='text-[#4F576A] font-medium'>
                  Locked tokens
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    Your tokens are locked as part of the q/acc protocol’s token
                    lock mechanism. This lock is designed to ensure the
                    project’s and supporter’s long-term commitment to the
                    project. Tokens begin to unlock gradually after a set period
                    called the "cliff." This system helps prevent token holders
                    from dumping tokens at the end of each round following the
                    token price increase.
                  </div>
                </div>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(lockedTokens)} {project?.abc?.tokenTicker}
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~ ${' '}
                  {formatAmount(
                    lockedTokens *
                      (project?.abc?.tokenPrice * Number(POLPrice)),
                  )}
                </span>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
              <div className='flex gap-2 items-center'>
                <IconAvailableTokens size={32} />
                <span className='font-medium text-[#1D1E1F] text-2xl'>
                  Available to claim
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    The tokens have been unlocked and are now available for you
                    to claim
                  </div>
                </div>
              </div>
              <div className='flex gap-1 items-center font-medium text-[#1D1E1F]'>
                <span className='text-2xl'>
                  {formatAmount(availableToClaim)} {project?.abc?.tokenTicker}
                </span>
                <span>
                  ~ ${' '}
                  {formatAmount(availableToClaim * project?.abc?.tokenPrice)}
                </span>
              </div>
            </div>

            <Button
              color={ButtonColor.Gray}
              className='flex justify-center'
              disabled={availableToClaim <= 0} // Disable if 0 or null
            >
              Claim Tokens
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardsBreakDown;
