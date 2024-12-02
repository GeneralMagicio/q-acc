import { useState, type FC } from 'react';
import Link from 'next/link';
import Modal, { BaseModalProps } from '../Modal';
import { useFetchUser } from '@/hooks/useFetchUser';
import { Button, ButtonColor } from '../Button';
import { useUpdateAcceptedTerms } from '@/hooks/useUpdateAcceptedTerms';

interface ConnectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
  onClose: () => void;
}

export const TermsConditionModal: FC<ConnectModalProps> = ({
  onClose,
  ...props
}) => {
  const { data: user } = useFetchUser();
  const { mutate: updateAcceptedTerms } = useUpdateAcceptedTerms();

  const [isUsUkChecked, setIsUsUkChecked] = useState<boolean>(false);
  const [isProhibitedCountriesChecked, setIsProhibitedCountriesChecked] =
    useState<boolean>(false);

  const [terms, setTerms] = useState<boolean>(user?.acceptedToS || false);

  const handleUsUkTermsChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = _event.target.checked;
    setIsUsUkChecked(isChecked);
  };

  const handleProhibitedCountriesChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = _event.target.checked;
    setIsProhibitedCountriesChecked(isChecked);
  };

  const handleAcceptTerms = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = _event.target.checked;
    setTerms(isChecked);
  };

  const handleSaveTerms = () => {
    // Save that user accepted terms and conditions - ONLY ONCE
    if (!user?.acceptedToS) {
      updateAcceptedTerms(true, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      {...props}
      onClose={onClose}
      title='Attestation'
      showCloseButton={true}
    >
      <div className='flex flex-col gap-5 text-lg  font-redHatText'>
        <p className=''>
          The q/acc protocol prohibits citizens of the{' '}
          <span className='font-bold'>United States and United Kingdom</span>{' '}
          from participating due to regulatory reasons.
        </p>
        <div className=''>
          The q/acc protocol prohibits citizens from the{' '}
          <span className='font-bold'>
            internationally recognized list of prohibited countries
          </span>{' '}
          from participating due to AML compliance.
        </div>

        {/* Terms of Service */}
        <div className='flex flex-col gap-4'>
          <p>By proceeding, you confirm:</p>

          <label className='flex gap-2 items-center   rounded-2xl w-full cursor-pointer'>
            <div>
              <input
                type='checkbox'
                checked={isUsUkChecked}
                onChange={handleUsUkTermsChange}
              />
            </div>
            <div className='flex flex-col text-[#1D1E1F] '>
              <h2 className='text-base'>
                I am not a citizen of the{' '}
                <span className='font-bold'>
                  United States or United Kingdom
                </span>
              </h2>
            </div>
          </label>

          <label className='flex gap-2 items-top   rounded-2xl w-full cursor-pointer'>
            <div>
              <input
                type='checkbox'
                checked={isProhibitedCountriesChecked}
                onChange={handleProhibitedCountriesChange}
              />
            </div>
            <div className='flex flex-col text-[#1D1E1F] '>
              <h2 className='text-base'>
                I am not a citizen of{' '}
                <span className='font-bold'>
                  Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
                  Belarus, Bosnia Herzegovina, Central African Republic, Cuba,
                  DR Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
                  Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North
                  Korea, North Macedonia, Palau, Panama, Russia, Samoa, Serbia,
                  Somalia, South Sudan, Sudan, Syria, Ukraine, US Virgin
                  Islands, Vanuatu, Venezuela or Yemen.
                </span>
              </h2>
            </div>
          </label>

          <label className='flex gap-2 items-center   rounded-2xl w-full cursor-pointer'>
            <div>
              <input
                type='checkbox'
                checked={terms}
                onChange={event => handleAcceptTerms(event)}
              />
            </div>
            <div className='flex flex-col text-[#1D1E1F] '>
              <h2 className='text-base'>
                I have read and agree to the{' '}
                <Link
                  href='https://giveth.notion.site/Terms-and-Conditions-10a3ab28d48c8058af3cd37455b591c5'
                  className='text-pink-500 font-semibold'
                  target='_blank'
                >
                  Terms of Service.
                </Link>
              </h2>
            </div>
          </label>
        </div>
        <div className='flex justify-center items-center'>
          <Button
            disabled={!isUsUkChecked || !isProhibitedCountriesChecked || !terms}
            color={ButtonColor.Pink}
            className='w-[200px] flex justify-center '
            onClick={handleSaveTerms}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
