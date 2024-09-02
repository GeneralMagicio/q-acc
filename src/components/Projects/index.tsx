import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProjectsBanner } from './ProjectsBanner';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { fetchAllProjects } from '@/services/project.service';

const projectCardStyle = '';

export const ProjectsView = () => {
  const { data: allProjects } = useQuery({
    queryKey: ['allProjects'],
    queryFn: fetchAllProjects,
    gcTime: Infinity,
    staleTime: Infinity,
  });
  return (
    <>
      <ProjectsBanner />
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-10'>
          {allProjects?.projects?.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              className={projectCardStyle}
            />
          ))}
        </div>
      </div>
    </>
  );
};
