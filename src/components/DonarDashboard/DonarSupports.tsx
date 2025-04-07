'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import RewardsBreakDown from './RewardsBreakDown';
import DonarSupportedProjects from './DonarSupportedProjects';
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
    } else {
      setShowBreakDown(false);
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
                <DonarSupportedProjects
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
          </button>
        </Link>
        <RewardsBreakDown />
      </>
    );
  }
};

export default DonarSupports;
