import React from 'react';
import { useProjectContext } from '@/context/project.context';
import { isEarlyAccessBranch } from '@/config/configuration';
const ProjectDetailBanner = () => {
  const { projectData } = useProjectContext();

  const bgSrc =
    projectData?.image !== 'https://example.com/image.jpg'
      ? projectData.image
      : '/images/project-card/card-image.jpeg';
  return (
    <div
      className={`w-full h-[440px] lg:h-[546px] ${isEarlyAccessBranch ? 'lg:w-[80%]' : 'lg:w-[100%] '}  bg-cover bg-center rounded-3xl relative`}
      style={{
        backgroundImage: `url(${bgSrc})`,
      }}
    >
      <div className=' flex flex-col absolute  bottom-[40px] left-[40px] md:bottom-[40px] md:left-[40px] gap-2'>
        <div className='border rounded-md bg-white p-1 block w-fit'>
          {/* <Image
            height={64}
            width={64}
            src={getIpfsAddress(
              projectData.abc?.icon! ||
                'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
            )}
            alt='Token Tikcer'
          /> */}
          <div
            className='w-[64px] h-[64px] bg-cover bg-center p-3 rounded-full'
            style={{
              backgroundImage: `url(${projectData?.icon})`,
            }}
          ></div>
        </div>
        <div className='flex flex-col text-white gap-2'>
          <h1 className='font-normal font-redHatText'>
            {projectData?.abc?.tokenTicker}
          </h1>
          <h1 className='text-4xl md:text-[41px]  font-bold leading-10'>
            {projectData?.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailBanner;
