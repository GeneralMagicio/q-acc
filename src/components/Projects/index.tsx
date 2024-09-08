'use client';
import React from 'react';
import { ProjectsBanner } from './ProjectsBanner';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { ProjectHoverCard } from '../ProjectCard/ProjectHoverCard';

const projectCardStyle = '';

export const ProjectsView = () => {
  const { data: allProjects, isLoading } = useFetchAllProjects();
  return (
    <>
      <ProjectsBanner />
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-10'>
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
