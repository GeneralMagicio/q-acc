'use client';
import React from 'react';
import { ProjectsSection } from './ProjectsSection';
import { Banner } from '../Banner';

export const ProjectsView = () => {
  return (
    <>
      <Banner />
      <div className='container'>
        <div className='my-[60px]'></div>
        <ProjectsSection />
      </div>
    </>
  );
};
