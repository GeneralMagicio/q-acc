import { usePrivado } from '@/hooks/usePrivado';
import { IconError } from '../Icons/IconError';
import { IconInfo } from '../Icons/IconInfo';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';

const DashboardPrivado = () => {
  const { isLoading, isVerified, error, verifyAccount } = usePrivado();

  return (
    !isVerified && (
      <div className='container'>
        <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl mt-6'>
          <div className='flex flex-col gap-8'>
            <div className='font-redHatText'>
              <p className='text-[#1D1E1F] text-xl'>
                We use Privado ID zero knowledge identity system to maintain the
                integrity of quadratic acceleration while ensuring privacy. All
                participants are required to complete verification in order to
                receive a KYC credential from the Synaps identity provider.
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
                        identity is verified by PrivadoID
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
                    onClick={verifyAccount}
                    className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                  >
                    Retry
                  </Button>
                ) : (
                  <Button
                    type='button'
                    loading={isLoading}
                    onClick={verifyAccount}
                    className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                  >
                    {isLoading ? (
                      'Loading'
                    ) : (
                      <>
                        Go to PrivadoID
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
    )
  );
};

export default DashboardPrivado;
