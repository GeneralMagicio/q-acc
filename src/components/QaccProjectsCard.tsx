import Image from 'next/image';
import React from 'react';
import { ProjectsSection } from './Projects/ProjectsSection';

export const QaccProjectsCard = () => {
  return (
    <div className='bg-white relative pt-8 pb-5 mt-5'>
      <div className='absolute right-0 top-10'>
        <Image
          src={'/images/particles/trazado3.svg'}
          width={150}
          height={100}
          alt='Trazado'
        />
      </div>
      <div className='container  '>
        <h1 className='text-4xl  text-gray-900 font-bold mt-4 mb-16'>
          Projects in the next round
        </h1>
        <div className=''>
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
};
