'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectDetailBanner from './ProjectDetailBanner';

import ProjectTabs from './ProjectTabs';
import DonateSection from './DonateSection';
import RichTextViewer from '../RichTextViewer';
import ProjectSocials from './ProjectSocials';
import ProjectTeamMembers from './ProjectTeamMember';
import { useFetchProjectById } from '@/hooks/useFetchProjectById';
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

  const description =
    '<h1>The novelty of rich text has sadly wore off</h1><a href="" target="_blank">This is a link</a><p><br></p><p><img src="https://giveth.mypinata.cloud/ipfs/QmbtyYZyBLFoGSqBgYvH84Z5VQmzSoBbvBc8RvksvChmTN"></p><h2>but I can still try to cause trouble with grey-area projects</h2><p><br></p><p><strong>like this one... I mean... it has "drugs" in the title... but is that really a violation? I\'m raising money to develop drugs to help sleepy people... is that so bad</strong></p><p><br></p><p><strong class="ql-size-small">is it any different really than what the pharmaceutical industry does?</strong></p>';

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
      {activeTab === 0 && (
        <div className='flex flex-col gap-10 bg-white py-10'>
          {/* <RichTextEditor name="projectDescription" /> */}

          <RichTextViewer description={description} />
          <div className='flex flex-col container'>
            <ProjectSocials />
          </div>
        </div>
      )}

      {activeTab === 1 && <h1>Donation</h1>}

      {/* Pass team members later */}
      {activeTab === 2 && <ProjectTeamMembers />}
    </div>
  );
};

export default ProjectDetail;
