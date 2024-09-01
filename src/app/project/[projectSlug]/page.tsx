'use client';
import { useParams } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail/ProjectDetail';
import { ProjectProvider } from '@/context/project.context';

const ProjectRoute = () => {
  const params = useParams();
  const slug = Array.isArray(params.projectSlug)
    ? params.projectSlug[0]
    : params.projectSlug;

  return (
    <ProjectProvider slug={slug}>
      <ProjectDetail />
    </ProjectProvider>
  );
};

export default ProjectRoute;
