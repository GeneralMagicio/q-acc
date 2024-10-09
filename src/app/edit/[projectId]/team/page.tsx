'use client';
import React from 'react';

import { redirect, useParams } from 'next/navigation';
import EditTeamForm from '@/components/EditForm/EditTeam';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

export default function EditTeamPage() {
  const params = useParams();
  const projectId: number = Array.isArray(params.projectId)
    ? parseInt(params.projectId[0])
    : parseInt(params.projectId);
  return isProductReleased ? (
    <div>
      <EditTeamForm projectId={projectId} />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
}
