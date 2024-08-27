'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectDetailBanner from './ProjectDetailBanner';
import ProjectTabs from './ProjectTabs';
import DonateSection from './DonateSection';
import { useFetchProjectById } from '@/hooks/useFetchProjectById';
import ProjectTeamMembers from './ProjectTeamMember';

export enum EProjectPageTabs {
  DONATIONS = 'donations',
  MEMEBERS = 'members',
}

const ProjectDetail = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const projectId = 1;

  const { data: projectById } = useFetchProjectById(projectId);
  console.log(projectById);

  // const teamMembers = projectById.members;

  useEffect(() => {
    switch (searchParams.get('tab')) {
      case EProjectPageTabs.DONATIONS:
        setActiveTab(1);
        break;
      case EProjectPageTabs.MEMEBERS:
        setActiveTab(2);
        break;
      default:
        setActiveTab(0);
        break;
    }
  }, [searchParams.get('tab')]);
  return (
    <div className=''>
      <div className='container'>
        <div className='flex gap-6 flex-col lg:flex-row mt-10'>
          <ProjectDetailBanner />

          <DonateSection />
        </div>
      </div>

      <ProjectTabs activeTab={activeTab} slug={'slug'} />
      {activeTab === 0 && <>ABOUT</>}
      {activeTab === 1 && <h1>Donation</h1>}

      {/* Pass team members later */}
      {activeTab === 2 && <ProjectTeamMembers />}
    </div>
  );
};

export default ProjectDetail;
