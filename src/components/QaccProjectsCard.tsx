'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectsSection } from './Projects/ProjectsSection';
import { ProjectsFilter } from './ProjectsFilter';

export const QaccProjectsCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const seasonParam = searchParams.get('season');
  const seasonFilter = seasonParam ? parseInt(seasonParam) : 0;

  const setSeasonFilter = (newSeason: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSeason === 0) {
      params.delete('season');
    } else {
      params.set('season', newSeason.toString());
    }

    router.replace(`?${params.toString()}`, { scroll: false }); // prevents scroll to top
  };

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
