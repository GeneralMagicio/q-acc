'use client';

import { redirect } from 'next/navigation';
import CreateProjectForm from '@/components/Create/CreateProjectForm';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';
export default function CreateProjectPage() {
  return isProductReleased ? (
    <div className='container'>
      <CreateProjectForm />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
}
