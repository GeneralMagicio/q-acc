import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';
import { fetchProjectBySlug } from '@/services/project.service';
import { ProjectView } from '@/components/ProjectDetail/ProjectView';

interface ProjectPageProps {
  params: {
    projectSlug: string | string[];
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.projectSlug)
    ? params.projectSlug[0]
    : params.projectSlug;

  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: project.title || 'Default Title',
    description: project.teaser || 'Default Description',
    openGraph: {
      title: project.title,
      description: project.teaser,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.teaser,
      images: [project.image],
    },
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
