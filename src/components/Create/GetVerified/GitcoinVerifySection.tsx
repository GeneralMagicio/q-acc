import React, { useEffect, useState } from 'react';
import links from '@/lib/constants/links';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchUserGitcoinPassportScore } from '@/hooks/userFetchUserGitcoinPassportScore';
import config from '@/config/configuration';
import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';

enum GitcoinVerificationStatus {
  NOT_CHECKED,
  ANALYSIS_PASS,
  SCORER_PASS,
  LOW_SCORE,
}

export const GitcoinVerifySection = () => {
  const [status, setStatus] = useState(GitcoinVerificationStatus.NOT_CHECKED);
  const { data: user, isLoading: isUserLoading, isSuccess } = useFetchUser();
  const { refetch: refetchScore, isLoading: isLoadingScore } =
    useFetchUserGitcoinPassportScore();

  useEffect(() => {
    if (!isSuccess) return;
    if ((user?.analysisScore || 0) > config.GP_ANALYSIS_SCORE_THRESHOLD) {
      setStatus(GitcoinVerificationStatus.ANALYSIS_PASS);
    }
  }, [isSuccess, user?.analysisScore, user?.passportScore]);

  return status === GitcoinVerificationStatus.ANALYSIS_PASS ? (
    <section className='bg-gray-100 rounded-2xl p-6 flex gap-4 justify-between'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
    </section>
  ) : (
    <section className='bg-gray-100 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <p>
        Check and improve your <b>Gitcoin Passport score</b> at{' '}
        <a
          href={links.PASSPORT}
          target='_blank'
          className='font-bold text-pink-500'
          referrerPolicy='no-referrer'
        >
          &nbsp;app.passport.xyz
        </a>
      </p>
      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Pink}
        className='mr-auto px-16'
        loading={isUserLoading}
      >
        Check Score
      </Button>
    </section>
  );
};
