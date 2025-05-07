import { useState, type FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Modal, { BaseModalProps } from '../Modal';
import { useFetchUser } from '@/hooks/useFetchUser';
import { Button, ButtonColor } from '../Button';
import { useUpdateAcceptedTerms } from '@/hooks/useUpdateAcceptedTerms';
import Routes from '@/lib/constants/Routes';

interface ConnectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
  onClose: () => void;
  // onContinue: () => void;
  // setTerms?: React.Dispatch<React.SetStateAction<boolean>>;
  // terms?: boolean;
}

export const TermsConditionModal: FC<ConnectModalProps> = ({
  onClose,
  // onContinue,
  // setTerms,
  // terms,
  ...props
}) => {
  const { data: user } = useFetchUser();
  const router = useRouter();
  const { mutate: updateAcceptedTerms } = useUpdateAcceptedTerms(() => {
    if (!user?.fullName) router.push(Routes.CreateProfile);
  });

  const [isUsUkChecked, setIsUsUkChecked] = useState<boolean>(false);
  const [isProhibitedCountriesChecked, setIsProhibitedCountriesChecked] =
    useState<boolean>(false);

  const [istermsChecked, setIstermsChecked] = useState<boolean>(
    user?.acceptedToS || false,
  );

  useEffect(() => {
    if (user?.acceptedToS) {
      // onContinue();
      onClose();
    }
  }, [onClose, user?.acceptedToS]);

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
    setIstermsChecked(isChecked);
  };

  const handleSaveTerms = () => {
    // Save that user accepted terms and conditions - ONLY ONCE
    if (!user?.acceptedToS) {
      updateAcceptedTerms(true);
    }
  };

  return (
    <Modal
      {...props}
      onClose={onClose}
      title='Welcome to q/acc!'
      showCloseButton={false}
      closeable={false}
    >
      <div className='flex flex-col gap-5 text-lg  font-redHatText'>
        {/* <p className=''>
          Access to the protocol is prohibited for citizens and residents of the
          United States and individuals from other jurisdictions outlined in the
          Terms of Service, as well as companies, entities, and other
          organizations based in the United States or those operating from
          jurisdictions specified in the Terms of Service.
        </p> */}

        {/* Terms of Service */}
        <div className='flex flex-col gap-4'>
          <p>By proceeding, you confirm:</p>

          {/* <label className='flex gap-2 items-center   rounded-2xl w-full cursor-pointer'>
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
          </label> */}

          {/* <label className='flex gap-2 items-top   rounded-2xl w-full cursor-pointer'>
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
          </label> */}

          <label className='flex gap-2 items-center   rounded-2xl w-full cursor-pointer'>
            <div>
              <input
                type='checkbox'
                checked={istermsChecked}
                onChange={event => handleAcceptTerms(event)}
              />
            </div>
            <div className='flex flex-col text-[#1D1E1F] '>
              <h2 className='text-base'>
                I have read and agree to the{' '}
                <Link
                  href='/tos'
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
            disabled={
              // !isUsUkChecked ||
              //  !isProhibitedCountriesChecked ||
              !istermsChecked
            }
            color={ButtonColor.Pink}
            className='w-[200px] flex justify-center '
            onClick={handleSaveTerms}
          >
            Create Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};
