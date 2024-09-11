import React, { useEffect, useState } from 'react';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { Button, ButtonColor } from '../Button';
import RewardsBreakDown from './RewardsBreakDown';
import {
  fetchProjectDonors,
  fetchUserDonations,
} from '@/services/donation.services';
import { getIpfsAddress } from '@/helpers/image';
import { fetchTokenPrice } from '@/helpers/token';
import { useFetchUser } from '@/hooks/useFetchUser';
import { IconTokenSchedule } from '@/components/Icons/IconTokenSchedule';
import { IconMinted } from '@/components/Icons/IconMinted';
import { IconAvailableTokens } from '@/components/Icons/IconAvailableTokens';
import { IconBreakdownArrow } from '@/components/Icons/IconBreakdownArrow';

// Helper to group donations by project
const groupDonationsByProject = (donations: any[]) => {
  return donations.reduce(
    (grouped, donation) => {
      const projectId = donation.project.id;
      if (!grouped[projectId]) {
        grouped[projectId] = [];
      }
      grouped[projectId].push(donation);
      return grouped;
    },
    {} as Record<number, any[]>,
  );
};

// Helper function to calculate unique donors
const calculateUniqueDonors = (donations: any[]) => {
  const uniqueDonors = new Set();
  donations.forEach(donation => {
    if (donation.user?.walletAddress) {
      uniqueDonors.add(donation.user.walletAddress);
    }
  });
  return uniqueDonors.size;
};

// Helper function to calculate total contributions in POL
const calculateTotalContributions = (donations: any[]) => {
  return donations.reduce((total, donation) => total + donation.amount, 0);
};

// Calculate locked reward token amount based on stream data
const calculateLockedRewardTokenAmount = (
  rewardTokenAmount: number,
  rewardStreamStart: Date,
  rewardStreamEnd: Date,
  cliff: number,
) => {
  const now = new Date();
  const streamStart = new Date(rewardStreamStart);
  const streamEnd = new Date(rewardStreamEnd);

  if (!rewardTokenAmount || !rewardStreamStart || !rewardStreamEnd || !cliff) {
    return 0;
  }

  if (now < streamStart) {
    return rewardTokenAmount + cliff;
  }

  if (now > streamEnd) {
    return 0;
  }

  const totalStreamTime = streamEnd.getTime() - streamStart.getTime();
  const elapsedTime = now.getTime() - streamStart.getTime();
  const remainingProportion = 1 - elapsedTime / totalStreamTime;

  return rewardTokenAmount * remainingProportion;
};

// Calculate claimable reward token amount
const calculateClaimableRewardTokenAmount = (
  rewardTokenAmount: number,
  lockedRewardTokenAmount: number | null,
) => {
  if (rewardTokenAmount === undefined || lockedRewardTokenAmount === null) {
    return 0;
  }
  return rewardTokenAmount - lockedRewardTokenAmount;
};

const DonarSupports = () => {
  const [showBreakDown, setShowBreakDown] = useState<boolean>(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [projectDonorData, setProjectDonorData] = useState<
    Record<number, { uniqueDonors: number; totalContributions: number }>
  >({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [POLPrice, setPOLPrice] = useState(1);
  const { data: user } = useFetchUser();

  const userId = user?.id;
  if (!userId) {
    throw new Error('user not found!');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserDonations(parseInt(userId));
        if (res) {
          setDonations(res.donations);
          setTotalCount(res.totalCount);
        }
      } catch (err) {
        setError('Failed to fetch donations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setPOLPrice(price);
    };

    fetchPrice();
  }, []);

  const donationsGroupedByProject = groupDonationsByProject(donations);

  // Fetch project donations for all grouped projects
  useEffect(() => {
    const fetchProjectDonations = async () => {
      const donorData: Record<
        number,
        { uniqueDonors: number; totalContributions: number }
      > = {};

      const projectIds = Object.keys(donationsGroupedByProject).map(Number);

      for (const projectId of projectIds) {
        try {
          const donationsByProjectId = await fetchProjectDonors(projectId);
          if (donationsByProjectId?.donations) {
            donorData[projectId] = {
              uniqueDonors: calculateUniqueDonors(
                donationsByProjectId.donations,
              ),
              totalContributions: calculateTotalContributions(
                donationsByProjectId.donations,
              ),
            };
          }
        } catch (err) {
          setError('Failed to fetch project donations');
          console.error(err);
        }
      }

      setProjectDonorData(donorData);
    };

    if (donations.length > 0) {
      fetchProjectDonations();
    }
  }, [donationsGroupedByProject]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!showBreakDown) {
    return (
      <div className='container flex flex-col gap-10'>
        {Object.entries(donationsGroupedByProject).map(
          ([projectId, projectDonations]: [string, any]) => {
            const project = projectDonations[0].project;
            const totalContribution = projectDonations.reduce(
              (sum: any, donation: { amount: number }) => sum + donation.amount,
              0,
            );
            const totalRewardTokens = projectDonations.reduce(
              (sum: any, donation: { rewardTokenAmount: number }) =>
                sum + (donation.rewardTokenAmount || 0),
              0,
            );

            // Get unique donors and total contributions from the fetched donor data
            const uniqueDonors =
              projectDonorData[Number(projectId)]?.uniqueDonors || 0;
            const totalContributions =
              projectDonorData[Number(projectId)]?.totalContributions || 0;

            // Sum up locked and claimable amounts for all donations
            let totalLockedRewardTokens = 0;
            let totalClaimableRewardTokens = 0;

            projectDonations.forEach((donation: any) => {
              const lockedRewardTokenAmount = calculateLockedRewardTokenAmount(
                donation.rewardTokenAmount,
                donation.rewardStreamStart,
                donation.rewardStreamEnd,
                donation.cliff,
              );
              const claimableRewardTokenAmount =
                calculateClaimableRewardTokenAmount(
                  donation.rewardTokenAmount,
                  lockedRewardTokenAmount,
                );

              totalLockedRewardTokens += lockedRewardTokenAmount || 0;
              totalClaimableRewardTokens += claimableRewardTokenAmount || 0;
            });

            return (
              <div
                key={projectId}
                className='p-6 flex lg:flex-row flex-col gap-14 bg-white rounded-xl shadow-lg'
              >
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
                    <div className='w-full p-[10px_16px] border border-[#5326EC] rounded-3xl flex justify-center'>
                      <span className='flex gap-4 text-[#5326EC] font-bold'>
                        Project Contract Address{' '}
                        <IconViewTransaction color='#5326EC' />
                      </span>
                    </div>

                    <div className='flex justify-between p-2'>
                      <div className='flex gap-2'>
                        <IconTotalSupply size={24} />
                        <span className='text-[#4F576A] font-medium font-redHatText'>
                          Total Supply
                        </span>
                      </div>
                      <span className='font-medium text-[#1D1E1F]'>
                        {project.abc.totalSupply || '-'}{' '}
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
                      <span className='font-medium text-[#1D1E1F]'>
                        {uniqueDonors}
                      </span>
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
                          {totalContributions || 0} POL{' '}
                        </span>
                        <span className='font-medium text-[#82899A]'>
                          ~ $ {project.totalDonations || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Claim and Reward */}
                <div className='flex flex-col gap-4 w-full lg:w-1/2  font-redHatText'>
                  <div className='flex items-center gap-2'>
                    <img
                      className='w-6 h-6 rounded-full'
                      src={getIpfsAddress(
                        project.abc?.icon ||
                          'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                      )}
                    />
                    <span className='text-[#4F576A] font-medium'>
                      {project.abc.tokenTicker} current value
                    </span>
                    <div className='relative group'>
                      <IconTokenSchedule />
                      <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                        Bonding curves have a mint price and a burn price. This
                        shows the mint price.
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between text-[#1D1E1F] font-medium'>
                    <h2 className='flex gap-1 items-center'>
                      {project.abc.tokenPrice / POLPrice || '-'}{' '}
                      <span className='text-[#4F576A] text-xs pb-1'>POL</span>
                    </h2>
                    <h2 className='text-[#4F576A]'>
                      $ {project.abc.tokenPrice || '-'}
                    </h2>
                  </div>
                  <hr />

                  <h1 className='flex p-[4px_16px] bg-[#EBECF2] w-fit rounded-md'>
                    You support this project{' '}
                    {projectDonations.length > 1 && (
                      <span className='font-medium'>
                        &nbsp;{projectDonations.length}&nbsp;
                      </span>
                    )}
                    {projectDonations.length === 1 ? (
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
                      {totalContribution} POL
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
                        {totalRewardTokens || '-'} {project.abc.tokenTicker}
                      </span>
                      <span className='font-medium text-[#82899A]'>
                        ~ ${totalRewardTokens * project.abc.tokenPrice || '-'}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#EBECF2] rounded-md'>
                    <div className='flex gap-2'>
                      <IconAvailableTokens size={24} />
                      <span className='font-medium text-[#1D1E1F]'>
                        Available to claim
                      </span>
                    </div>
                    <div className='flex gap-1 font-medium text-[#1D1E1F]'>
                      <span>
                        {totalClaimableRewardTokens !== null
                          ? `${parseFloat(totalClaimableRewardTokens.toFixed(2)).toString()} ${project.abc.tokenTicker}`
                          : '-'}
                      </span>
                      <span>
                        ~ $
                        {totalClaimableRewardTokens !== null
                          ? parseFloat(
                              (
                                totalClaimableRewardTokens *
                                project.abc.tokenPrice
                              ).toFixed(2),
                            ).toString()
                          : '-'}
                      </span>
                    </div>
                  </div>

                  {/* Claim Rewards */}
                  <Button
                    color={ButtonColor.Giv}
                    className='flex justify-center'
                    disabled={
                      totalClaimableRewardTokens === null ||
                      totalClaimableRewardTokens <= 0
                    } // Disable if 0 or null
                  >
                    Claim Tokens
                  </Button>
                  <Button
                    color={ButtonColor.Base}
                    className='flex justify-center shadow-lg '
                    onClick={() => setShowBreakDown(true)}
                  >
                    Tokens & Contributions Breakdown <IconBreakdownArrow />
                  </Button>
                </div>
              </div>
            );
          },
        )}
      </div>
    );
  } else {
    return (
      <>
        <div className='bg-white container p-6 rounded-2xl flex items-center gap-3'>
          <button onClick={() => setShowBreakDown(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
            >
              <path
                d='M25.3332 15.9993H6.6665M6.6665 15.9993L15.9998 25.3327M6.6665 15.9993L15.9998 6.66602'
                stroke='#030823'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <h1 className='text-[#1D1E1F] text-lg font-bold'>Go Back</h1>
        </div>
        <RewardsBreakDown />
      </>
    );
  }
};

export default DonarSupports;
