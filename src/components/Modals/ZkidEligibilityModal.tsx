import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface ZkidEligibilityModal extends BaseModalProps {}

export const ZkidEligibilityModal: FC<ZkidEligibilityModal> = props => {
  return (
    <Modal {...props} title='Privado zkID' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          The amount you want to submit requires Privado zkID credentials.
        </p>
        <Button
          className='mx-auto'
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Pink}
        >
          Go to Privado
        </Button>
      </div>
    </Modal>
  );
};
