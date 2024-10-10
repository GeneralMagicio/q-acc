import { redirect } from 'next/navigation';
import { ProjectsView } from '@/components/Projects';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

const ProjectsRoute = () => {
  return isProductReleased ? <ProjectsView /> : redirect(Routes.KycLanding);
};

export default ProjectsRoute;
