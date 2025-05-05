import { useState, type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';

import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { GitcoinLow } from '../GitcoinVerifcationElements/GitcoinLow';
import { useUpdateSkipVerification } from '@/hooks/useUpdateSkipVerification';
import { useFetchUser } from '@/hooks/useFetchUser';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  const {
    status,
    userGitcoinScore,
    onCheckScore,
    isScoreFetching: isScoreFetchingPending,
  } = useGitcoinScore();

  const {
    mutate: updateSkipVerification,
    isPending: isSkipVerificationPending,
  } = useUpdateSkipVerification(() => {
    console.log('Skip verification updated successfully!');
    props.onClose();
  });
  const { data: user } = useFetchUser();

  const [isCheckingScore, setIsCheckingScore] = useState(false);

  const handleCheckScore = async () => {
    setIsCheckingScore(true);
    await onCheckScore();
    setIsCheckingScore(false);
  };

  return (
    <Modal {...props} title='Verification' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          {status === GitcoinVerificationStatus.LOW_SCORE
            ? 'Your Human Passport score is below the 15 threshold.'
            : "Skip verification means your buy won't infulence the matching pool allocation. Verify with Human Passport score > 15 for infulence."}
        </p>
        {status === GitcoinVerificationStatus.NOT_CHECKED && (
          <div className='flex gap-4 justify-center'>
            <div>
              <Button
                styleType={ButtonStyle.Solid}
                color={ButtonColor.Base}
                className='px-16 shadow-baseShadow'
                loading={isSkipVerificationPending}
                disabled={user?.skipVerification}
                onClick={() => updateSkipVerification(true)}
              >
                {user?.skipVerification
                  ? 'Verification Skipped '
                  : 'Skip Verification'}
              </Button>
            </div>
            <div>
              <Button
                className=''
                styleType={ButtonStyle.Solid}
                color={ButtonColor.Pink}
                loading={isCheckingScore}
                onClick={handleCheckScore}
              >
                Check Score
              </Button>
            </div>
          </div>
        )}
        {(status === GitcoinVerificationStatus.ANALYSIS_PASS ||
          status === GitcoinVerificationStatus.SCORER_PASS) && (
          <EligibilityBadge
            className='ml-auto w-fit'
            status={EligibilityBadgeStatus.ELIGIBLE}
          />
        )}
        {status === GitcoinVerificationStatus.LOW_SCORE && (
          <GitcoinLow
            onCheckScore={onCheckScore}
            userGitcoinScore={userGitcoinScore}
            isScoreFetching={isScoreFetchingPending}
            onClose={props.onClose}
          />
        )}
      </div>
    </Modal>
  );
};
