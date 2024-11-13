import { redirect } from 'next/navigation';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';
import { fetchProjectBySlug } from '@/services/project.service';
import { ProjectView } from '@/components/ProjectDetail/ProjectView';

interface ProjectPageProps {
  params: {
    projectSlug: string | string[];
  };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const slug = Array.isArray(params.projectSlug)
    ? params.projectSlug[0]
    : params.projectSlug;

  if (!isProductReleased) {
    redirect(Routes.KycLanding);
  }

  const initialData = await fetchProjectBySlug(slug);

  if (!initialData) {
    // Handle the case where the project is not found
    redirect('/404');
  }

  return <ProjectView slug={slug} />;
};

export default ProjectPage;
