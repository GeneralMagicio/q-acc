'use client';
import { redirect, useParams } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail/ProjectDetail';
import { ProjectProvider } from '@/context/project.context';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

const ProjectRoute = () => {
  const params = useParams();
  const slug = Array.isArray(params.projectSlug)
    ? params.projectSlug[0]
    : params.projectSlug;

  return isProductReleased ? (
    <ProjectProvider slug={slug}>
      <ProjectDetail />
    </ProjectProvider>
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default ProjectRoute;
