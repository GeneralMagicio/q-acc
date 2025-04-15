import React from 'react';
import Link from 'next/link';
import { IconGitcoinPassport } from '../Icons/IconGitcoinPassport';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import Routes from '@/lib/constants/Routes';
import { getBadgeClasses } from './common';

export const GitcoinVerificationBadge = () => {
  const { status } = useGitcoinScore();
  const isVerified =
    status === GitcoinVerificationStatus.ANALYSIS_PASS ||
    status === GitcoinVerificationStatus.SCORER_PASS;

  return (
    <Link href={Routes.DashBoard + '?tab=verification'}>
      <div className={getBadgeClasses(isVerified)}>
        <IconGitcoinPassport size={24} />
        <span>Human Passport {isVerified ? 'Verified' : 'Not Verified'}</span>
      </div>
    </Link>
  );
};
