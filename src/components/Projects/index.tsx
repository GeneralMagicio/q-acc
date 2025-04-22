'use client';
import React, { useState } from 'react';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner/Banner';
import { ProjectsFilter } from '../ProjectsFilter';

export const ProjectsView = () => {
  const [seasonFilter, setSeasonFilter] = useState(0);

  return (
    <>
      <Banner />
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
