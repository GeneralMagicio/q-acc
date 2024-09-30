import React, { useEffect, useMemo, useState } from 'react';
import RewardsBreakDown from './RewardsBreakDown';
import {
  fetchProjectDonors,
  fetchUserDonations,
} from '@/services/donation.services';
import { useFetchUser } from '@/hooks/useFetchUser';
import {
  calculateClaimableRewardTokenAmount,
  calculateLockedRewardTokenAmount,
  calculateTotalContributions,
  calculateUniqueDonors,
  groupDonationsByProject,
} from '@/helpers/donation';
import DonarSuppotedProjects from './DonarSuppotedProjects';

const DonarSupports = () => {
  const [showBreakDown, setShowBreakDown] = useState<boolean>(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [projectDonorData, setProjectDonorData] = useState<
    Record<number, { uniqueDonors: number; totalContributions: number }>
  >({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: user } = useFetchUser();
  const [projectDonorDataForBreakDown, setProjectDonorDataForBreakDown] =
    useState<
      Record<number, { uniqueDonors: number; totalContributions: number }>
    >({});
  const [projectDonationsForBreakDown, setProjectDonationsForBreakDown] =
    useState<any[]>([]);

  console.log('user', user);

  const userId = user?.id;
  // if (!userId) {
  //   throw new Error('user not found!');
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }
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

  const donationsGroupedByProject = useMemo(() => {
    return groupDonationsByProject(donations);
  }, [donations]);

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
  }, [donations.length, donationsGroupedByProject]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!totalCount) {
    return (
      <div className='container'>
        <div className='bg-white rounded-xl py-40 text-center text-gray-400 text-2xl'>
          You didn’t support any project.
        </div>
      </div>
    );
  }

  if (!showBreakDown) {
    return (
      <div className='container flex flex-col gap-10 mb-10'>
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
              <div key={projectId}>
                <DonarSuppotedProjects
                  projectId={projectId}
                  project={project}
                  uniqueDonors={uniqueDonors}
                  totalClaimableRewardTokens={totalClaimableRewardTokens}
                  totalContributions={totalContributions}
                  projectDonations={projectDonations}
                  totalContribution={totalContribution}
                  totalRewardTokens={totalRewardTokens}
                  onClickBreakdown={() => {
                    setShowBreakDown(true);
                    setProjectDonorDataForBreakDown(project);
                    setProjectDonationsForBreakDown(projectDonations);
                  }}
                />
              </div>
            );
          },
        )}
      </div>
    );
  } else {
    return (
      <>
        <button
          onClick={() => setShowBreakDown(false)}
          className='bg-white container p-6 rounded-2xl flex items-center gap-3'
        >
          <div className='flex gap-3'>
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

            <h1 className='text-[#1D1E1F] text-lg font-bold'>Go Back</h1>
          </div>
        </button>

        <RewardsBreakDown
          projectDonations={projectDonationsForBreakDown}
          projectDonorData={projectDonorDataForBreakDown}
        />
      </>
    );
  }
};

export default DonarSupports;
