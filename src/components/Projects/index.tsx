'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProjectsSection } from './ProjectsSection';
import { ProjectsFilter } from '../ProjectsFilter';
import { NewBanner } from '../Banner/NewBanner';

export const ProjectsView = () => {
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
    router.replace(`?${params.toString()}`, { scroll: false });
  };

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
