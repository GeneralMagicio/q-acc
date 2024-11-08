'use client';
import React, { useEffect, useState } from 'react';
import { ProjectsBanner } from './ProjectsBanner';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { ProjectHoverCard } from '../ProjectCard/ProjectHoverCard';
import RoundCountBanner from '../RoundCountBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { getMostRecentEndRound } from '@/helpers/round';
import { isEarlyAccessBranch } from '@/config/configuration';
import QaccRoundCounter from '../QaccRoundCounter';

const projectCardStyle = '';

export const ProjectsView = () => {
  const { data: allProjects, isLoading } = useFetchAllProjects();
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
      <ProjectsBanner />
      <div className='container mx-auto'>
        <div className='my-[60px]'>
          {isEarlyAccessBranch ? (
            !isRoundEnded && <RoundCountBanner />
          ) : (
            <QaccRoundCounter page={'project'} />
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10'>
          {isLoading ? (
            <h1>Loading Projects...</h1>
          ) : (
            allProjects?.projects?.map(project => (
              // <Link href={`/project/${project.slug}`} key={project.id}>
              <ProjectHoverCard
                key={project.id}
                project={project}
                className={projectCardStyle}
              />
              // </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};
