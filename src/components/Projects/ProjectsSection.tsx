import React, { FC } from 'react';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import { Spinner } from '../Loading/Spinner';
import { NewProjectCardState } from '../ProjectCard/NewProjectCardState';

interface ProjectsSectionProps {
  seasonFilter: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const ProjectsSection: FC<ProjectsSectionProps> = ({ seasonFilter }) => {
  const { data: allProjects, isLoading } = useFetchAllProjects();

  const filteredProjects = allProjects?.projects.filter(project => {
    if (seasonFilter === 0) return true;
    return project.seasonNumber === seasonFilter;
  });

  const shuffledProjects = shuffleArray(filteredProjects || []);

  const sortedProjects =
    seasonFilter === 0
      ? [...shuffledProjects].sort((a, b) => b.seasonNumber - a.seasonNumber)
      : shuffledProjects;

  return isLoading ? (
    <div className='min-h-80 flex items-center justify-center '>
      <Spinner />
    </div>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10'>
      {sortedProjects?.map(project => (
        <NewProjectCardState key={project.id} project={project} />
      ))}
    </div>
  );
};
