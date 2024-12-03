'use client';
import React from 'react';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner';
import { useFetchMostRecentEndRound } from '../ProjectDetail/usefetchMostRecentEndRound';

export const ProjectsView = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const isRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  const isRoundActive = !!activeRoundDetails;
  return (
    <>
      {/* <ProjectsBanner /> */}
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='container'>
        <ProjectsSection />
      </div>
    </>
  );
};
