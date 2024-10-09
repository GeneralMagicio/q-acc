import React from 'react';
import { redirect } from 'next/navigation';
import CreateTeamForm from '@/components/Create/CreateTeamForm';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

export default function AddTeamPage() {
  return isProductReleased ? (
    <div>
      <CreateTeamForm />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
}
