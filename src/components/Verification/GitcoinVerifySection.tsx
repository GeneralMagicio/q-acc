import links from '@/lib/constants/links';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';

import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { GitcoinPassLow } from '@/components/GitcoinVerifcationElements/GitcoinPassLow';

export const GitcoinVerifySection = () => {
  const {
    status,
    userGitcoinScore,
    onCheckScore,
    isUserLoading,
    isScoreFetching,
  } = useGitcoinScore();

  return status === GitcoinVerificationStatus.ANALYSIS_PASS ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
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
      {status === GitcoinVerificationStatus.NOT_CHECKED ? (
        <Button
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Pink}
          className='mr-auto px-16'
          loading={isUserLoading || isScoreFetching}
          onClick={onCheckScore}
        >
          Check Score
        </Button>
      ) : status === GitcoinVerificationStatus.SCORER_PASS ||
        status === GitcoinVerificationStatus.LOW_SCORE ? (
        <GitcoinPassLow
          onCheckScore={onCheckScore}
          userGitcoinScore={userGitcoinScore}
          isScoreFetching={isScoreFetching}
        />
      ) : null}
    </section>
  );
};
