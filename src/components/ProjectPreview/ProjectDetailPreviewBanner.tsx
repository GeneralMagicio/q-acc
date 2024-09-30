import React from 'react';
import { useAccount } from 'wagmi';
import { ProjectFormData } from '../Create/CreateProjectForm';
import { fetchAbcToken } from '@/app/actions/fetch-abc-token';

interface ProjectDetailPreviewBannerProps {
  projectData: ProjectFormData;
}

const ProjectDetailPreviewBanner = ({
  projectData,
}: ProjectDetailPreviewBannerProps) => {
  const { address } = useAccount();
  const projectTokenData = address
    ? fetchAbcToken({ userAddress: address })
    : null;
  // const { data: projectTokenData } = useFetchProjectByUserId(
  //   parseInt(userData?.id ?? ''),
  // );

  // console.log({ userData });
  console.log({ projectTokenData });

  const bgSrc = projectData?.banner
    ? projectData.banner
    : '/images/project-card/card-image.jpeg';

  const logoSrc = projectData?.logo
    ? projectData.logo
    : '/images/project-card/logo.svg';
  return (
    <div
      className='w-full h-[440px] lg:h-[546px] lg:w-[80%]  bg-cover bg-center rounded-3xl relative'
      style={{
        backgroundImage: `url(${bgSrc})`,
      }}
    >
      <div className=' flex flex-col absolute  bottom-[40px] left-[40px] md:bottom-[40px] md:left-[40px] gap-2'>
        <div className='border rounded-md bg-white p-1 block w-fit'>
          <div
            className='w-[64px] h-[64px] bg-cover bg-center p-3 rounded-full'
            style={{
              backgroundImage: `url(${logoSrc})`,
            }}
          ></div>
        </div>
        <div className='flex flex-col text-white gap-2'>
          <h1 className='font-normal font-redHatText'>
            {projectData?.abc?.tokenTicker}
          </h1>
          <h1 className='text-4xl md:text-[41px]  font-bold leading-10'>
            {projectData?.projectName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPreviewBanner;
