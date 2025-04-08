import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';
import React, { FC } from 'react';

const projectsFilter = ['All Projects', 'Season 1', 'Season 2'];

interface ProjectsFilterProps {
  setSeasonFilter: (season: number) => void;
  seasonFilter: number;
}

export const ProjectsFilter: FC<ProjectsFilterProps> = ({
  setSeasonFilter,
  seasonFilter,
}) => {
  const { data: allProjects } = useFetchAllProjects();
  const totalProjects =
    allProjects?.projects.filter(project => {
      if (seasonFilter === 0) return true;
      return project.seasonNumber === seasonFilter;
    }).length || 0;

  return (
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-xl text-gray-900 font-bold'>
        <span className='text-gray-900'>Explore</span>
        &nbsp;
        <span className='text-gray-400'>{totalProjects} Projects</span>
      </h1>
      <div className='flex gap-4'>
        {projectsFilter.map((filter, index) => (
          <button
            key={index}
            className={`${
              seasonFilter === index
                ? 'bg-gray-900 text-white'
                : 'text-gray-900 bg-[#E8E9F0]'
            } px-4 py-3 rounded-xl text-redHatText select-none`}
          >
            <span className='text-sm' onClick={() => setSeasonFilter(index)}>
              {filter}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
