'use client';
import React from 'react';
import RoundCountBanner from '../RoundCountBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { isEarlyAccessBranch } from '@/config/configuration';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner';
import { useFetchMostRecentEndRound } from '../ProjectDetail/usefetchMostRecentEndRound';

export const ProjectsView = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const isRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  return (
    <>
      {/* <ProjectsBanner /> */}
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='container'>
        <div className='my-[60px]'>
          {isEarlyAccessBranch ? !isRoundEnded && <RoundCountBanner /> : null}
        </div>
        <ProjectsSection />
      </div>
    </>
  );
};
