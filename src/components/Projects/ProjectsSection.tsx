import React from 'react';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { Spinner } from '../Loading/Spinner';
import { ProjectHoverCard } from '../ProjectCard/ProjectHoverCard';

export const ProjectsSection = () => {
  const { data: allProjects, isLoading } = useFetchAllProjects();
  return isLoading ? (
    <div className='min-h-80 flex items-center justify-center '>
      <Spinner />
    </div>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10'>
      {allProjects?.projects.map(project => (
        <ProjectHoverCard key={project.id} project={project} />
      ))}
    </div>
  );
};
