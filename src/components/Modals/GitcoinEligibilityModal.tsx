import { useState, type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

enum GitcoinEligibilityModalState {
  CHECK,
  NOT_CONNECTED,
  ELIGIBLE,
  NOT_ELIGIBLE,
}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  const [state, setState] = useState(GitcoinEligibilityModalState.CHECK);
  return (
    <Modal {...props} title='Eligibility Check' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10'>
          Verify your eligibility to contribute up to $1,000 to this project by
          completing a quick on-chain activity check.
        </p>
        {state === GitcoinEligibilityModalState.CHECK && (
          <Button
            className='mx-auto'
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
          >
            Check Eligibility
          </Button>
        )}
      </div>
    </Modal>
  );
};
