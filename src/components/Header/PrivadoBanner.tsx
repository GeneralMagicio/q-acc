import Image from 'next/image';
import { usePrivado } from '@/hooks/usePrivado';
import { IconExternalLink } from '../Icons/IconExternalLink';
import { useFetchUser } from '@/hooks/useFetchUser';
import { usePrivadoUrl } from '@/hooks/usePrivadoUrl';

export const PrivadoBanner = () => {
  const { isVerified, isLoading } = usePrivado();
  const { url } = usePrivadoUrl();
  const { data: user } = useFetchUser();
  const isUserProfileCreated = user?.fullName != null && user?.email != null;
  const showPrivadoBanner = !isVerified && !isLoading && isUserProfileCreated;

  return (
    showPrivadoBanner && (
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
          onClick={() => url && window.open(url, '_blank')}
        >
          <p className='text-giv-500'>Check status with Privado ID</p>
          <IconExternalLink size={12} />
        </div>
      </div>
    )
  );
};
