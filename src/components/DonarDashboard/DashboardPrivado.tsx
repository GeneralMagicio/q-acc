import { useState } from 'react';
import { usePrivado } from '@/hooks/usePrivado';
import { IconError } from '../Icons/IconError';
import { IconInfo } from '../Icons/IconInfo';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import links from '@/lib/constants/links';
import { PrivadoModal } from '../Modals/PrivadoModal';

const DashboardPrivado = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
  const { isLoading, isVerified, error } = usePrivado();

  return (
    <>
      {!isVerified && (
        <div className='container'>
          <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl mt-6'>
            <div className='flex flex-col gap-8'>
              <div className='font-redHatText'>
                <p className='text-[#1D1E1F] text-xl'>
                  Privado Zero-knowledge ID (zkID) system is used by the q/acc
                  protocol to comply with AML and restrict the US and UK for
                  regulatory reasons. It also mitigates Sybil attacks during the
                  q/acc rounds and protects the projects and their supporters.
                  Refer to the{' '}
                  <a
                    className='text-[#E1458D] font-bold'
                    href={links.PRIVADO_GUIDE_LINK}
                    target='_blank'
                  >
                    Complete zkID guide
                  </a>{' '}
                  and contact{' '}
                  <a
                    href={links.TELEGRAM_SUPPORT}
                    target='_blank'
                    className='font-bold text-pink-500'
                  >
                    q/acc Support Telegram channel
                  </a>{' '}
                  if you run into any issues during this process. There is a
                  team waiting to help you!
                </p>
                <p className='text-[#1D1E1F] text-xl'>
                  If you’ve already completed the zkID verification process, be
                  aware that verification can take UP TO 24 HOURS. For privacy
                  reasons, you will not be notified by email. After a couple of
                  hours, just come back here and click on “Check status with
                  Privado ID.” If your verification has passed, you can then
                  claim your credential!
                </p>
                <p className='text-[#1D1E1F] text-xl'>
                  If more than 24 hours have passed and you’re unable to claim
                  your credentials, reach out to us at{' '}
                  <a
                    href={links.TELEGRAM_SUPPORT}
                    target='_blank'
                    className='font-bold text-pink-500'
                  >
                    q/acc Support
                  </a>
                  .
                </p>
              </div>
              <div className='flex flex-col gap-10 lg:flex-row justify-between'>
                {!isLoading && !isVerified ? (
                  <div
                    className={`flex p-4 border  rounded-lg gap-4 ${
                      !!error
                        ? 'bg-[#FFD6D0] border-[#C71D06] '
                        : isVerified
                          ? 'bg-[#D2FFFB] border-[#1B8C82] '
                          : 'bg-[#F6F3FF] border-[#8668FC] '
                    }`}
                  >
                    {!!error ? (
                      <>
                        <IconError />
                        <span className='text-[#C71D06] font-redHatText text-sm'>
                          We can&apos;t verify your account, please contact Qacc
                          support team <b>qacc@giveth.io</b>
                        </span>
                      </>
                    ) : (
                      <>
                        <IconInfo size={17} color='#8668FC' />
                        <span className='text-[#8668FC] font-redHatText text-sm'>
                          Please note: You cannot proceed on q/acc until your
                          identity is verified by Privado ID
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className='font-redHatText font-bold'>
                  {!!error ? (
                    <Button
                      type='button'
                      onClick={() => {
                        setShowPrivadoModal(true);
                      }}
                      className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                    >
                      Retry
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      loading={isLoading}
                      onClick={() => {
                        setShowPrivadoModal(true);
                      }}
                      className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                    >
                      {isLoading ? (
                        'Loading'
                      ) : (
                        <>
                          Go to Privado ID
                          <IconArrowRight size={16} />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPrivadoModal && (
        <PrivadoModal
          isOpen={showPrivadoModal}
          onClose={() => {
            setShowPrivadoModal(false);
          }}
        />
      )}
    </>
  );
};

export default DashboardPrivado;
