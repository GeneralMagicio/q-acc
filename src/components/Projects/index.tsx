'use client';
import React from 'react';
import { ProjectsBanner } from './ProjectsBanner';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { ProjectHoverCard } from '../ProjectCard/ProjectHoverCard';
import RoundCountBanner from '../RoundCountBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';

const projectCardStyle = '';

export const ProjectsView = () => {
  const { data: allProjects, isLoading } = useFetchAllProjects();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  return (
    <>
      <ProjectsBanner />
      <div className='container mx-auto'>
        <div className='my-[60px]'>
          {activeRoundDetails && <RoundCountBanner />}
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
