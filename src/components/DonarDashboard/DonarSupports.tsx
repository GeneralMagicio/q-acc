import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RewardsBreakDown from './RewardsBreakDown';
import DonarSuppotedProjects from './DonarSupportedProjects';
import { useDonorContext } from '@/context/dashboard.context';

const DonarSupports = () => {
  const [showBreakDown, setShowBreakDown] = useState<boolean>(false);
  const {
    donationsGroupedByProject,
    projectDonorData,
    totalCount,
    loading,
    error,
  } = useDonorContext();
  const searchParams = useSearchParams();

  const projectId = searchParams.get('projectId');

  useEffect(() => {
    if (projectId) {
      setShowBreakDown(true);
    }
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!totalCount) {
    return (
      <div className='container'>
        <div className='bg-white rounded-xl py-40 text-center text-gray-400 text-2xl font-bold'>
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

            const donationData = projectDonorData[Number(projectId)] || {
              uniqueDonors: 0,
              totalContributions: 0,
              donationCount: 0,
              userProjectContributionSum: 0,
            };

            return (
              <div key={projectId}>
                <DonarSuppotedProjects
                  projectId={projectId}
                  project={project}
                  uniqueDonors={donationData.uniqueDonors}
                  totalClaimableRewardTokens={0}
                  totalContributions={donationData.totalContributions}
                  projectDonations={donationData.donationCount}
                  totalContribution={donationData.userProjectContributionSum}
                  totalRewardTokens={0}
                  onClickBreakdown={() => {
                    setShowBreakDown(true);
                    // setProjectDonorDataForBreakDown({
                    //   uniqueDonors: donationData.uniqueDonors,
                    //   donarContributions: donationData.totalContributions,
                    //   donationCount: donationData.donationCount,
                    //   userProjectContributionSum:
                    //     donationData.userProjectContributionSum,
                    // });
                    // setProjectDonationsForBreakDown(projectDonations);
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
        <Link href={`/dashboard?tab=contributions`}>
          <button
            onClick={() => {
              setShowBreakDown(false);
            }}
            className='bg-white container p-6 rounded-2xl flex items-center gap-3'
          >
            <h1 className='text-[#1D1E1F] text-lg font-bold'>Go Back</h1>
          </button>
        </Link>
        <RewardsBreakDown />
      </>
    );
  }
};

export default DonarSupports;
