import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';

interface ZkidEligibilityModal extends BaseModalProps {}

export const ZkidEligibilityModal: FC<ZkidEligibilityModal> = props => {
  return (
    <Modal {...props} title='zkID Verification Required' showCloseButton>
      <div className=''>
        <p className='mt-4 mb-10 text-xl'>
          To contribute more than $1,000 to this project, you need to complete
          KYC verification through Privado.
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
