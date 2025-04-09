import React, { useState } from 'react';
import { ProjectsSection } from './Projects/ProjectsSection';
import { ProjectsFilter } from './ProjectsFilter';

export const QaccProjectsCard = () => {
  const [seasonFilter, setSeasonFilter] = useState(0);
  return (
    <div className='bg-white relative pt-8 pb-5'>
      <div className='container '>
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
