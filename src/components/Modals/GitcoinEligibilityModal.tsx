import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { EligibilityBadge, EligibilityBadgeStatus } from '../EligibilityBadge';

import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { GitcoinPassLow } from '../GitcoinVerifcationElements/GitcoinPassLow';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  const { status, userGitcoinScore, onCheckScore, isScoreFetching } =
    useGitcoinScore();

  return (
    <Modal {...props} title='Eligibility Check' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          Verify your eligibility to contribute up to $1,000 to this project by
          completing a quick on-chain activity check.
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
            Check Score
          </Button>
        )}
        {status === GitcoinVerificationStatus.ANALYSIS_PASS && (
          <EligibilityBadge
            className='ml-auto w-fit'
            status={EligibilityBadgeStatus.ELIGIBLE}
          />
        )}
        {(status === GitcoinVerificationStatus.SCORER_PASS ||
          status === GitcoinVerificationStatus.LOW_SCORE) && (
          <GitcoinPassLow
            onCheckScore={onCheckScore}
            userGitcoinScore={userGitcoinScore}
            isScoreFetching={isScoreFetching}
          />
        )}
      </div>
    </Modal>
  );
};
