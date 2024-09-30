'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProjectDetailPreviewBanner from '@/components/ProjectPreview/ProjectDetailPreviewBanner';
import ProjectDetailPreviewDonationSection from './ProjectDetailPreviewDonationSection';
import ProjectPreviewSocials from '@/components/ProjectPreview/ProjectPreviewSocials';

import ProjectPreviewTabs from '@/components/ProjectPreview/ProjectPreviewTabs';
import ProjectDonationTable from '@/components/ProjectDetail/ProjectDonationTable';
import RichTextViewer from '../RichTextViewer';
import ProjectTeamMembers from '@/components/ProjectDetail/ProjectTeamMember';
import { IconViewTransaction } from '../Icons/IconViewTransaction';

import config from '@/config/configuration';
import RoundCountBanner from '../RoundCountBanner';
import { ProjectFormData } from '../Create/CreateProjectForm';

export enum EProjectPageTabs {
  DONATIONS = 'supporters',
  MEMEBERS = 'members',
}

const ProjectDetailPreview = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('previewData');
    if (storedData) {
      setProjectData(JSON.parse(storedData));
    }
  }, []);

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

  console.log(projectData);

  if (!projectData) {
    return <>Loading</>;
  }

  return (
    <div className=''>
      <div className='container'>
        <div className='flex gap-6 flex-col lg:flex-row mt-10 justify-center'>
          <ProjectDetailPreviewBanner projectData={projectData} />
          <ProjectDetailPreviewDonationSection projectData={projectData} />
        </div>
        <div className='my-6'>{<RoundCountBanner />}</div>
      </div>

      <ProjectPreviewTabs activeTab={activeTab} />

      {activeTab === 0 && (
        <div className='flex flex-col gap-10 bg-white py-10'>
          <RichTextViewer description={projectData?.projectDescription} />

          <div className='container'>
            <Link
              target='_blank'
              href={`${config.SCAN_URL}/address/${projectData?.projectAddress}`}
              className='  w-fit px-6 py-[10px] border border-[#5326EC] rounded-3xl  flex  justify-start cursor-pointer'
            >
              <span className='flex gap-4 text-[#5326EC]  font-bold font-redHatText'>
                Project Contract Address
                <IconViewTransaction color='#5326EC' />
              </span>
            </Link>
          </div>

          <div className='flex flex-col container'>
            <ProjectPreviewSocials projectData={projectData} />
          </div>
        </div>
      )}

      {activeTab === 1 && <ProjectDonationTable />}
      {/* Pass team members later */}
      {activeTab === 2 && (
        <div>
          <ProjectTeamMembers
            teamMembers={projectData?.team.map(member => ({
              ...member,
              image: member.image?.ipfsHash || '',
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPreview;
