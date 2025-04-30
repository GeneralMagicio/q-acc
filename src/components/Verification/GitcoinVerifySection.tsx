import { Button, ButtonColor, ButtonStyle } from '@/components/Button';

import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { usePrivado } from '@/hooks/usePrivado';
import config from '@/config/configuration';
import { GitcoinLow } from '../GitcoinVerifcationElements/GitcoinLow';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { IQfRound } from '@/types/round.type';
import { formatAmount } from '@/helpers/donation';

export const GitcoinVerifySection = () => {
  const {
    status,
    userGitcoinScore,
    onCheckScore,
    isUserLoading,
    isScoreFetching,
  } = useGitcoinScore();
  const { isVerified } = usePrivado();
  const { data: allRounds } = useFetchAllRound();

  const qaccRound: IQfRound | undefined = allRounds?.filter(
    round => round.__typename === 'QfRound',
  )[0];

  let low_cap;

  if (qaccRound) {
    if ('roundPOLCapPerUserPerProjectWithGitcoinScoreOnly' in qaccRound) {
      low_cap =
        qaccRound?.roundPOLCapPerUserPerProjectWithGitcoinScoreOnly || 1000;
    }
  }

  return isVerified ? (
    <section className='relative overflow-hidden bg-gray-50 rounded-2xl p-6'>
      <div>
        <h1 className='text-lg font-bold'>Human Passport</h1>
        <p>
          Verify your uniqueness with Human Passport to support each project
          with up to &nbsp;
          {formatAmount(low_cap)} POL.
        </p>
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-gray-50 opacity-60'></div>
    </section>
  ) : status === GitcoinVerificationStatus.ANALYSIS_PASS ||
    status === GitcoinVerificationStatus.SCORER_PASS ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Human Passport</h1>
        <p>Your verification allows you to spend up to approximately $1,000.</p>
      </div>
      <div>
        {!isVerified && (
          <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
        )}
      </div>
    </section>
  ) : status === GitcoinVerificationStatus.NOT_CHECKED ? (
    <section className='relative overflow-hidden bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Human Passport</h1>
      <p>
        This verification would allow you to spend up to approximately $1,000
        and you will influence the matching distribution.
      </p>
      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Pink}
        className='mr-auto px-20'
        loading={isUserLoading || isScoreFetching}
        onClick={onCheckScore}
      >
        Check eligibility
      </Button>
    </section>
  ) : status === GitcoinVerificationStatus.LOW_SCORE ? (
    <section className='relative overflow-hidden bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Human Passport</h1>
      <p>
        To support each project with up to $,1000, you must
        <b className='font-bold'>
          &nbsp;increase your Human Passport score to&nbsp;
          {config.GP_SCORER_SCORE_THRESHOLD}
        </b>
        . Once you increase your score, return here and click “Refresh Score”.
      </p>
      <GitcoinLow
        onCheckScore={onCheckScore}
        userGitcoinScore={userGitcoinScore}
        isScoreFetching={isScoreFetching}
      />
    </section>
  ) : null;

  // {!isVerified &&
  //   (status === GitcoinVerificationStatus.NOT_CHECKED ? (
  //     <Button
  //       styleType={ButtonStyle.Solid}
  //       color={ButtonColor.Pink}
  //       className='mr-auto px-20'
  //       loading={isUserLoading || isScoreFetching}
  //       onClick={onCheckScore}
  //     >
  //       Check eligibility
  //     </Button>
  //   ) : status === GitcoinVerificationStatus.LOW_SCORE ? (
  //     <GitcoinLow
  //       onCheckScore={onCheckScore}
  //       userGitcoinScore={userGitcoinScore}
  //       isScoreFetching={isScoreFetching}
  //     />
  //   ) : null)}
  // {isVerified && (
  //   <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-gray-50 opacity-60'></div>
  // )}
  // </section>
  // );
};
