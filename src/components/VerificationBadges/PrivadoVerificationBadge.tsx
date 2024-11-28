import React from 'react';
import Link from 'next/link';
import { usePrivado } from '@/hooks/usePrivado';
import { IconPrivado } from '../Icons/IconPrivado';
import Routes from '@/lib/constants/Routes';

export const PrivadoVerificationBadge = () => {
  const { isVerified } = usePrivado();

  return (
    <Link href={Routes.DashBoard + '?tab=verification'}>
      <div
        className={`flex gap-1 ${isVerified ? 'bg-teal-500' : 'bg-amber-500'} text-white py-1 px-2 rounded-lg`}
      >
        <IconPrivado size={24} />
        <span>Privado zkID {isVerified ? 'Verified' : 'Not Verified'}</span>
      </div>
    </Link>
  );
};
