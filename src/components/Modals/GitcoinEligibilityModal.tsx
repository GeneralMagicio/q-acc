import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';

import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { GitcoinLow } from '../GitcoinVerifcationElements/GitcoinLow';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  const { status, userGitcoinScore, onCheckScore, isScoreFetching } =
    useGitcoinScore();

  return (
    <Modal {...props} title='Human Passport' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          The amount you want to submit requires Human Passport verification.
        </p>
        {status === GitcoinVerificationStatus.NOT_CHECKED && (
          <Button
            className='mx-auto'
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
            loading={isScoreFetching}
            onClick={async () => {
              await onCheckScore();
            }}
          >
            Check Eligibility
          </Button>
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
            isScoreFetching={isScoreFetching}
          />
        )}
      </div>
    </Modal>
  );
};
