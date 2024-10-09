'use client';

import { redirect } from 'next/navigation';
import ProjectDetailPreview from '@/components/ProjectPreview/ProjectDetailPreview';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

const ProjectPreview = () => {
  return isProductReleased ? (
    <ProjectDetailPreview />
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default ProjectPreview;
