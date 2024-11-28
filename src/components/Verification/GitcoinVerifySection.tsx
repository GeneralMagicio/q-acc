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
import { usePrivado } from '@/hooks/usePrivado';

export const GitcoinVerifySection = () => {
  const {
    status,
    userGitcoinScore,
    onCheckScore,
    isUserLoading,
    isScoreFetching,
  } = useGitcoinScore();
  const { isVerified } = usePrivado();

  return status === GitcoinVerificationStatus.ANALYSIS_PASS ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      {!isVerified && (
        <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
      )}
    </section>
  ) : (
    <section className='relative overflow-hidden bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <p>
        Verify your uniqueness with Gitcoin Passport to support each project
        with up to $1000 USD denominated in POL.
      </p>
      {!isVerified &&
        (status === GitcoinVerificationStatus.NOT_CHECKED ? (
          <Button
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
            className='ml-auto px-16'
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
        ) : null)}
      {isVerified && (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-gray-50 opacity-60'></div>
      )}
    </section>
  );
};
