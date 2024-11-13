'use client';

import { FC } from 'react';
import { ProjectProvider } from '@/context/project.context';
import ProjectDetail from './ProjectDetail';

interface IProjectViewProps {
  slug: string;
}

export const ProjectView: FC<IProjectViewProps> = ({ slug }) => {
  return (
    <ProjectProvider slug={slug}>
      <ProjectDetail />
    </ProjectProvider>
  );
};
