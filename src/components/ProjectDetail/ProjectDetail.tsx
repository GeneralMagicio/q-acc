'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProjectDetailBanner from './ProjectDetailBanner';

import ProjectTabs from './ProjectTabs';
import DonateSection from './DonateSection';
import ProjectDonationTable from './ProjectDonationTable';
import RichTextViewer from '../RichTextViewer';
import ProjectSocials from './ProjectSocials';
import ProjectTeamMembers from './ProjectTeamMember';
import { useProjectContext } from '@/context/project.context';
import { IconViewTransaction } from '../Icons/IconViewTransaction';

import config from '@/config/configuration';
export enum EProjectPageTabs {
  DONATIONS = 'supporters',
  MEMEBERS = 'members',
}

const ProjectDetail = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const projectId = 1;

  const { projectData } = useProjectContext();

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
  if (!projectData) {
    return <>Loading</>;
  }
  return (
    <div className=''>
      <div className='container'>
        <div className='flex gap-6 flex-col lg:flex-row mt-10 justify-center'>
          <ProjectDetailBanner />

          <DonateSection />
        </div>
      </div>

      <ProjectTabs activeTab={activeTab} slug={projectData?.slug} />

      {activeTab === 0 && (
        <div className='flex flex-col gap-10 bg-white py-10'>
          <RichTextViewer description={projectData?.description} />

          <div className='container'>
            <Link
              target='_blank'
              href={`${config.SCAN_URL}/address/${projectData?.abc?.projectAddress}`}
              className='  w-fit px-6 py-[10px] border border-[#5326EC] rounded-3xl  flex  justify-start cursor-pointer'
            >
              <span className='flex gap-4 text-[#5326EC]  font-bold font-redHatText'>
                Project Contract Address
                <IconViewTransaction color='#5326EC' />
              </span>
            </Link>
          </div>

          <div className='flex flex-col container'>
            <ProjectSocials />
          </div>
        </div>
      )}

      {activeTab === 1 && <ProjectDonationTable />}
      {/* Pass team members later */}
      {activeTab === 2 && (
        <ProjectTeamMembers teamMembers={projectData?.teamMembers} />
      )}
    </div>
  );
};

export default ProjectDetail;
