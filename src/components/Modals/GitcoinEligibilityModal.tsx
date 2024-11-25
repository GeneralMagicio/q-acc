import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface GitcoinEligibilityModalProps extends BaseModalProps {}

export const GitcoinEligibilityModal: FC<
  GitcoinEligibilityModalProps
> = props => {
  return (
    <Modal {...props} title='Eligibility Check' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10'>
          Verify your eligibility to contribute up to $1,000 to this project by
          completing a quick on-chain activity check.
        </p>
        <Button
          className='mx-auto'
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Pink}
        >
          Check Eligibility
        </Button>
      </div>
    </Modal>
  );
};
