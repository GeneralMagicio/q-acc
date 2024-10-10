'use client';
import { redirect, useParams } from 'next/navigation';

import EditProjectForm from '@/components/EditForm/EditProjectForm';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

export default function CreateProjectPage() {
  const params = useParams();
  const projectId: number = Array.isArray(params.projectId)
    ? parseInt(params.projectId[0])
    : parseInt(params.projectId);

  return isProductReleased ? (
    <EditProjectForm projectId={projectId} />
  ) : (
    redirect(Routes.KycLanding)
  );
}
