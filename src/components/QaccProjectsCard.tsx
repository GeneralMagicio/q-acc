import React, { useState } from 'react';
import { ProjectsSection } from './Projects/ProjectsSection';
import { ProjectsFilter } from './ProjectsFilter';

export const QaccProjectsCard = () => {
  const [seasonFilter, setSeasonFilter] = useState(0);
  return (
    <div className='bg-white pt-2 pb-5 z-0'>
      <div className='container relative'>
        <ProjectsFilter
          seasonFilter={seasonFilter}
          setSeasonFilter={setSeasonFilter}
        />
        <div className=''>
          <ProjectsSection seasonFilter={seasonFilter} />
        </div>
      </div>
    </div>
  );
};
