import React from 'react';
import { IconGitcoinPassport } from '../Icons/IconGitcoinPassport';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';

export const GitcoinVerificationBadge = () => {
  const { status } = useGitcoinScore();
  const isVerified =
    status === GitcoinVerificationStatus.ANALYSIS_PASS ||
    status === GitcoinVerificationStatus.SCORER_PASS;

  return (
    <div
      className={`flex gap-1 ${isVerified ? 'bg-teal-500' : 'bg-amber-500'} text-white py-1 px-2 rounded-lg`}
    >
      <IconGitcoinPassport size={24} />
      <span>Gitcoin Passport {isVerified ? 'Verified' : 'Not Verified'}</span>
    </div>
  );
};
