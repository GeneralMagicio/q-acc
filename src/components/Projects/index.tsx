'use client';
import React from 'react';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner';

export const ProjectsView = () => {
  return (
    <>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='container'>
        <div className='my-[60px]'></div>
        <ProjectsSection />
      </div>
    </>
  );
};
