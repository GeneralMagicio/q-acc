import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { formatAmount } from '@/helpers/donation';

interface UserCapUpdateModal extends BaseModalProps {
  userDonationCap: number;
  selectedTokenSymbol: string;
}

export const UserCapUpdateModal: FC<UserCapUpdateModal> = props => {
  return (
    <Modal {...props} title='Individual Cap Updated' showCloseButton>
      <div className=' flex flex-col gap-6'>
        <p className=' text-xl'>
          Due to DAI price changes, your individual cap has been adjusted.
          Please review the updated criteria before proceeding with your
          purchase.
        </p>
        <div className='flex justify-between items-center px-4 py-2 bg-[#EBECF2] rounded-xl'>
          <span>Your updated cap for this project is</span>

          <span className='text-[#1D1E1F] font-semibold font-redHatText'>
            {formatAmount(props.userDonationCap)} {props?.selectedTokenSymbol}
          </span>
        </div>
        <Button
          className='mx-auto shadow-tabShadow font-bold rounded-xl font-redHatText'
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Base}
          onClick={props.onClose}
        >
          Go Update the Amount
        </Button>
      </div>
    </Modal>
  );
};
