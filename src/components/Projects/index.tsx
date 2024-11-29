'use client';
import React, { useEffect, useState } from 'react';
import RoundCountBanner from '../RoundCountBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { getMostRecentEndRound } from '@/helpers/round';
import { isEarlyAccessBranch } from '@/config/configuration';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner';

export const ProjectsView = () => {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [isRoundEnded, setIsRoundEnded] = useState(false);

  useEffect(() => {
    const checkRoundEnded = async () => {
      const res = await getMostRecentEndRound();

      return res?.__typename === 'QfRound';
    };

    const getData = async () => {
      const data = await checkRoundEnded();
      setIsRoundEnded(data);
    };

    getData();
  }, [activeRoundDetails, isRoundEnded]);
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
