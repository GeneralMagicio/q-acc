import React from 'react';
import Link from 'next/link';
import { usePrivado } from '@/hooks/usePrivado';
import { IconPrivado } from '../Icons/IconPrivado';
import Routes from '@/lib/constants/Routes';
import { getBadgeClasses } from './common';

export const PrivadoVerificationBadge = () => {
  const { isVerified } = usePrivado();

  return (
    <Link href={Routes.DashBoard + '?tab=verification'}>
      <div className={getBadgeClasses(isVerified)}>
        <IconPrivado size={24} />
        <span>Privado zkID {isVerified ? 'Verified' : 'Not Verified'}</span>
      </div>
    </Link>
  );
};
