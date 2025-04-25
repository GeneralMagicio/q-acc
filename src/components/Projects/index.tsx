'use client';
import React, { useState } from 'react';
import { ProjectsSection } from './ProjectsSection';
import { ProjectsFilter } from '../ProjectsFilter';
import { NewBanner } from '../Banner/NewBanner';

export const ProjectsView = () => {
  const [seasonFilter, setSeasonFilter] = useState(0);

  return (
    <>
      <NewBanner />
      <div className='container my-14'>
        <ProjectsFilter
          seasonFilter={seasonFilter}
          setSeasonFilter={setSeasonFilter}
        />
        <div className=''>
          <ProjectsSection seasonFilter={seasonFilter} />
        </div>
      </div>
    </>
  );
};
