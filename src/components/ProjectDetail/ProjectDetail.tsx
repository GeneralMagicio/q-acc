'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProjectDetailBanner from './ProjectDetailBanner';

import ProjectTabs from './ProjectTabs';
import DonateSection from './DonateSection';
import ProjectDonationTable from './ProjectDonationTable';
import RichTextViewer from '../RichTextViewer';
import ProjectSocials from './ProjectSocials';
import ProjectTeamMembers from './ProjectTeamMember';
import { useProjectContext } from '@/context/project.context';
import { IconViewTransaction } from '../Icons/IconViewTransaction';

import RoundCountBanner from '../RoundCountBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateCapAmount } from '@/helpers/round';
import { useFetchMostRecentEndRound } from './usefetchMostRecentEndRound';
import { Button, ButtonColor } from '../Button';
import { getPoolAddressByPair } from '@/helpers/getListedTokenData';
import config from '@/config/configuration';
import { Spinner } from '../Loading/Spinner';

export enum EProjectPageTabs {
  DONATIONS = 'supporters',
  MEMEBERS = 'members',
}

const ProjectDetail = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [progress, setProgress] = useState(0);
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const { projectData } = useProjectContext();
  const [isTokenListed, setIsTokenListed] = useState(false);

  const isRoundActive = !!activeRoundDetails;
  const isQaccRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);

  useEffect(() => {
    const updatePOLCap = async () => {
      if (activeRoundDetails) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(activeRoundDetails, Number(projectData?.id));

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

    if (projectData) {
      updatePOLCap();
    }
  }, [activeRoundDetails, projectData, maxPOLCap]);

  useEffect(() => {
    const fetchPoolAddress = async () => {
      if (projectData?.abc?.issuanceTokenAddress) {
        const { price, isListed } = await getPoolAddressByPair(
          projectData.abc.issuanceTokenAddress,
          config.WPOL_TOKEN_ADDRESS,
        );
        setIsTokenListed(isListed);
      }
    };

    fetchPoolAddress(); // Call the async function inside useEffect
  }, [projectData?.abc?.issuanceTokenAddress]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (isRoundActive || isQaccRoundEnded) {
      switch (tab) {
        case EProjectPageTabs.DONATIONS:
          setActiveTab(1);
          break;
        case EProjectPageTabs.MEMEBERS:
          setActiveTab(2);
          break;
        default:
          setActiveTab(0);
          break;
      }
    } else {
      switch (tab) {
        case EProjectPageTabs.MEMEBERS:
          setActiveTab(1);
          break;
        default:
          setActiveTab(0);
          break;
      }
    }
  }, [searchParams.get('tab')]);

  if (!projectData) {
    return (
      <div className='container flex justify-center items-center min-h-80'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className=''>
      <div className='container'>
        <div className='flex gap-6 flex-col lg:flex-row mt-10 justify-center'>
          <ProjectDetailBanner isRoundActive={isRoundActive} />

          <DonateSection />
        </div>
        {isRoundActive && (
          <div className='my-6'>
            {activeRoundDetails ? (
              <RoundCountBanner projectMaxedOut={progress >= 100} />
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      <ProjectTabs
        activeTab={activeTab}
        slug={projectData?.slug}
        isRoundActive={isRoundActive}
      />

      {activeTab === 0 && (
        <div className='flex flex-col gap-10 bg-white py-10 '>
          <div className='container max-w-[800px]'>
            <div className='flex md:flex-row flex-col gap-4 justify-center items-center md:justify-start'>
              <Link
                target='_blank'
                href={`https://polygonscan.com/token/${projectData?.abc?.issuanceTokenAddress}`}
                className=' w-[300px]  px-6 py-[10px] border border-[#5326EC] rounded-3xl  flex  justify-start cursor-pointer'
              >
                <span className='flex gap-4 text-[#5326EC]  font-bold font-redHatText'>
                  Project Contract Address
                  <IconViewTransaction color='#5326EC' />
                </span>
              </Link>

              {isTokenListed ? (
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    const url = `https://dapp.quickswap.exchange/swap/best/ETH/${projectData?.abc?.issuanceTokenAddress}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  color={ButtonColor.Pink}
                  className={`w-[300px] justify-center opacity-80 hover:opacity-100`}
                >
                  {'Get ' + projectData?.abc.tokenTicker + ' on QuickSwap'}
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className='flex flex-col'>
            <ProjectSocials />
          </div>

          <RichTextViewer description={projectData?.description} />
        </div>
      )}

      {isRoundActive || isQaccRoundEnded
        ? activeTab === 1 && <ProjectDonationTable />
        : activeTab === 1 && (
            <ProjectTeamMembers teamMembers={projectData?.teamMembers} />
          )}

      {/* Pass team members later */}
      {activeTab === 2 && (
        <ProjectTeamMembers teamMembers={projectData?.teamMembers} />
      )}
    </div>
  );
};

export default ProjectDetail;
