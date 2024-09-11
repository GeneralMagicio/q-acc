'use client';
import { useParams } from 'next/navigation';

import EditProjectForm from '@/components/EditForm/EditProjectForm';

export default function CreateProjectPage() {
  const params = useParams();
  const projectId: number = Array.isArray(params.projectId)
    ? parseInt(params.projectId[0])
    : parseInt(params.projectId);

  return <EditProjectForm projectId={projectId} />;
}
