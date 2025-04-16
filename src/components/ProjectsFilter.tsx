import React, { FC } from 'react';
import { useFetchAllProjects } from '@/hooks/useFetchAllProjects';

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
    <div className='flex justify-between items-center mb-6 flex-wrap gap-4'>
      <h1 className='text-2xl text-gray-900 font-bold'>
        <span className='text-gray-900'>Explore</span>
        &nbsp;
        <span className='text-gray-400'>{totalProjects} Projects</span>
      </h1>
      <div className='flex gap-4 flex-wrap '>
        {projectsFilter.map((filter, index) => (
          <button
            key={index}
            className={`${
              seasonFilter === index
                ? 'bg-gray-900 text-white'
                : 'text-gray-900 bg-[#E8E9F0]'
            } px-4 py-3 rounded-xl text-redHatText select-none`}
            onClick={() => setSeasonFilter(index)}
          >
            <span className='text-sm'>{filter}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
