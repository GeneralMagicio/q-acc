import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';

interface PrivadoModalProps extends BaseModalProps {}

export const PrivadoModal: FC<PrivadoModalProps> = props => {
  return (
    <Modal {...props} title='🛂 Hold Up!' showCloseButton>
      <p className='mt-4 mb-4'>
        Before proceeding, make sure you’ve read and understand the following:
      </p>
      <div className='max-h-[40vh] overflow-y-auto'>
        <ul className='flex flex-col gap-4 list-disc px-10'>
          <li>
            The q/acc protocol prohibits persons from the{' '}
            <span className='text-gray-800 font-bold'>
              United States and the United Kingdom
            </span>{' '}
            from participating due to regulatory restrictions.
          </li>
          <li>
            Additionally, to comply with AML requirements, the q/acc protocol
            restricts participation from individuals in the following countries:
            <span className='text-gray-800 font-bold'>
              Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
              Belarus, Bosnia Herzegovina, Central African Republic, Cuba, DR
              Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
              Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North Korea,
              North Macedonia, Palau, Panama, Russia, Samoa, Serbia, Somalia,
              South Sudan, Sudan, Syria, Ukraine, US Virgin Islands, Vanuatu,
              Venezuela, Yemen. 
            </span>{' '}
          </li>
          <li>
            These are the four document types accepted:{' '}
            <span className='text-gray-800 font-bold'>
              Passport, National ID, Driver’s License, or Resident Permit
            </span>
            . Documents must include your date of birth or verification will
            fail. Have your document ready!
          </li>
          <li>
            <span className='text-gray-800 font-bold'>
              We strongly encourage you to use MetaMask at this time.
            </span>{' '}
            We have had issues reported from those using WalletConnect. 
          </li>
          <li>
            We encourage you not to use the{' '}
            <span className='text-gray-800 font-bold'>Privado mobile app</span>{' '}
            at this time. You will see an option to  “Continue via app” during
            verification. Do not select that.
          </li>
        </ul>
      </div>
    </Modal>
  );
};
