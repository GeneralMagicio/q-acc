import Image from 'next/image';
import { usePrivado } from '@/hooks/usePrivado';
import { IconExternalLink } from '../Icons/IconExternalLink';

export const PrivadoBanner = () => {
  const { isVerified, isLoading, verifyAccount } = usePrivado();
  const showPrivadoBanner = !isVerified && !isLoading;

  return (
    <>
      {showPrivadoBanner && (
        <div
          className='w-full h-14 bg-[#FFEAB5] px-8 py-4 flex flex-row justify-center gap-2 items-center relative'
          hidden={!showPrivadoBanner}
        >
          <div className='w-1/2 flex justify-end gap-2'>
            <Image
              src='/images/icons/info.svg'
              alt='info'
              height={24}
              width={24}
            />
            <p className='text-gray-900 font-normal font-redHatText'>
              You don’t have identity credentials setup.
            </p>
          </div>
          <div
            className='flex flex-row gap-2 w-1/2 justify-start cursor-pointer center items-center'
            onClick={verifyAccount}
          >
            <p className='text-giv-500'>Check status with PrivadoID</p>
            <IconExternalLink size={12} />
          </div>
        </div>
      )}
    </>
  );
};
