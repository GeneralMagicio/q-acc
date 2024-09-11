'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import EditTeamForm from '@/components/EditForm/EditTeam';

export default function EditTeamPage() {
  const params = useParams();
  const projectId: number = Array.isArray(params.projectId)
    ? parseInt(params.projectId[0])
    : parseInt(params.projectId);
  return (
    <div>
      <EditTeamForm projectId={projectId} />
    </div>
  );
}
