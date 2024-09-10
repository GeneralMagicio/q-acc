import React from 'react';
import Image from 'next/image';
import { useProjectContext } from '@/context/project.context';
const ProjectDetailBanner = () => {
  const { projectData } = useProjectContext();

  const bgSrc =
    projectData?.image !== 'https://example.com/image.jpg'
      ? projectData.image
      : '/images/project-card/card-image.jpeg';
  return (
    <div
      className='w-full h-[440px] lg:h-[546px] lg:w-[80%]  bg-cover bg-center rounded-3xl relative'
      style={{
        backgroundImage: `url(${bgSrc})`,
      }}
    >
      <div className=' flex flex-col absolute  bottom-[40px] left-[40px] md:bottom-[40px] md:left-[40px] gap-2'>
        <div className='border rounded-md bg-white p-1 block w-fit'>
          <Image
            height={64}
            width={65}
            src={'/images/Vector.png'}
            alt='abc vector'
          />
        </div>
        <div className='flex flex-col text-white gap-2'>
          <h1 className='font-normal font-redHatText'>ABC</h1>
          <h1 className='text-4xl md:text-[41px]  font-bold leading-10'>
            {projectData?.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailBanner;
